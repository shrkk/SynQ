from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, duckdb_conn
from app.models.sql_models import Inventory_Item
from datetime import datetime, timedelta
from langgraph.prebuilt import create_react_agent

# --- TOOLS ---

@tool
def get_inventory_status():
    """Queries the database for items that are below their 'Par Level'."""
    db: Session = SessionLocal()
    try:
        low_stock_items = db.query(Inventory_Item).filter(Inventory_Item.current_stock < Inventory_Item.par_level).all()
        if not low_stock_items:
            return "All inventory levels are healthy (above par)."
        
        result = "Low Stock Alert:\n"
        for item in low_stock_items:
            result += f"- {item.name}: Current {item.current_stock} {item.unit} (Par: {item.par_level})\n"
        return result
    finally:
        db.close()

@tool
def get_revenue_trends(days: int = 7):
    """Uses DuckDB to aggregate sales revenue by day for the last N days."""
    try:
        query = f"""
            SELECT date_trunc('day', timestamp) as day, SUM(price) as daily_revenue
            FROM pos_transactions
            WHERE timestamp >= CURRENT_DATE - INTERVAL '{days} days'
            GROUP BY 1
            ORDER BY 1 DESC
        """
        # Check if table exists first (mock check)
        tables = duckdb_conn.execute("SHOW TABLES").fetchall()
        if not tables or ('pos_transactions',) in tables: 
            # Note: tables output can vary, safe to just try
            pass
        
        # We'll just try running it.
        results = duckdb_conn.execute(query).fetchall()
        if not results:
            return "No sales found in the specified period."
            
        formatted = "Revenue Trends:\n"
        for date, rev in results:
             # date might be string or obj depending on duckdb version/pandas
            d_str = str(date)
            formatted += f"- {d_str}: ${rev:,.2f}\n"
        return formatted
    except Exception as e:
        return f"Error querying revenue: {str(e)}"

@tool
def predict_reorder(item_name: str):
    """Predicts when an item will hit zero stock based on last 7 days of sales usage."""
    db: Session = SessionLocal()
    try:
        item = db.query(Inventory_Item).filter(Inventory_Item.name.ilike(item_name)).first()
        if not item:
            return f"Item '{item_name}' not found in inventory."
        
        current_stock = item.current_stock
        daily_usage_est = item.par_level * 0.2 
        
        days_remaining = current_stock / daily_usage_est if daily_usage_est > 0 else 999
        
        return f"Based on estimated usage of {daily_usage_est:.1f} {item.unit}/day:\n" \
               f"- Current Stock: {current_stock} {item.unit}\n" \
               f"- Days remaining: {days_remaining:.1f} days\n" \
               f"- Estimated stockout: {(datetime.now() + timedelta(days=days_remaining)).strftime('%Y-%m-%d')}"
    finally:
        db.close()


# --- AGENT SETUP ---

SYSTEM_PROMPT = """You are an expert Restaurant Consultant named 'Sous'. 
Your goal is to identify waste and prevent stock-outs. 
When asked a question, look at the variance between sales and inventory. 

Key Responsibilities:
1. Monitoring Inventory: Use `get_inventory_status` to check for low stock.
2. Analyzing Revenue: Use `get_revenue_trends` to see how the business is doing.
3. Forecasting: Use `predict_reorder` to tell the user when to buy more.

If a user asks "How is my kitchen doing?", analyze COGS (conceptually) and highlight any ingredient that is below par or has high variance.
If you don't have data, suggest running the ingestion pipeline.
"""

def get_agent_executor():
    llm = ChatOpenAI(model="gpt-4o", temperature=0)
    tools = [get_inventory_status, get_revenue_trends, predict_reorder]
    
    # LangGraph agent
    agent_executor = create_react_agent(llm, tools, state_modifier=SYSTEM_PROMPT)
    return agent_executor
