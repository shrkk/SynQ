from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db, duckdb_conn
from app.services.etl_pipeline import ETLService
from app.services.llm_agent import get_agent_executor
from app.schemas.schemas import IngestResponse, DashboardKPIs, ChatRequest, ChatResponse
from app.models.sql_models import Inventory_Item

router = APIRouter()

@router.post("/ingest", response_model=IngestResponse)
def trigger_ingestion(db: Session = Depends(get_db)):
    service = ETLService(db)
    result = service.sync_data()
    return result

@router.get("/dashboard/summary", response_model=DashboardKPIs)
def get_dashboard_summary(db: Session = Depends(get_db)):
    # 1. Sales metrics from DuckDB
    try:
        sales_data = duckdb_conn.execute("""
            SELECT SUM(price), COUNT(*) 
            FROM pos_transactions
        """).fetchone()
        total_sales = sales_data[0] if sales_data[0] else 0.0
        count_txns = sales_data[1] if sales_data[1] else 0
        
        # Top selling
        top_item = duckdb_conn.execute("""
            SELECT item_name 
            FROM pos_transactions 
            GROUP BY item_name 
            ORDER BY COUNT(*) DESC 
            LIMIT 1
        """).fetchone()
        top_seller = top_item[0] if top_item else None
        
    except Exception:
        total_sales = 0.0
        count_txns = 0
        top_seller = None

    # 2. Inventory metrics from Postgres
    low_stock_count = db.query(Inventory_Item).filter(Inventory_Item.current_stock < Inventory_Item.par_level).count()

    return DashboardKPIs(
        total_sales=total_sales,
        total_transactions=count_txns,
        low_stock_item_count=low_stock_count,
        top_selling_item=top_seller
    )

@router.post("/agent/chat", response_model=ChatResponse)
def chat_with_agent(request: ChatRequest):
    try:
        executor = get_agent_executor()
        result = executor.invoke({"messages": [("user", request.message)]})
        # Last message in the state is the AI response
        response_content = result["messages"][-1].content
        return ChatResponse(response=response_content)
    except Exception as e:
        # Graceful fallback if OpenAI key is missing or other error
        return ChatResponse(response=f"I'm having trouble connecting to my brain right now. Error: {str(e)}")

@router.get("/monitor/pipeline")
def get_pipeline_status(db: Session = Depends(get_db)):
    """Check recent ETL logs for failures."""
    from app.models.sql_models import PipelineLog
    logs = db.query(PipelineLog).order_by(PipelineLog.timestamp.desc()).limit(10).all()
    return logs

