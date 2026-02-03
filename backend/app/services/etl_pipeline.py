import csv
import random
import uuid
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.models.sql_models import POS_Transaction, Inventory_Item, Recipe_Mapping, Business, PipelineLog
from app.core.database import duckdb_conn
import pandas as pd

class ETLService:
    def __init__(self, db: Session):
        self.db = db

    def mock_fetch_pos_data(self):
        """Simulate fetching data from Square/Toast"""
        items = [
            {"item_id": "burger", "name": "Classic Burger", "price": 12.0},
            {"item_id": "fries", "name": "French Fries", "price": 5.0},
            {"item_id": "soda", "name": "Fountain Soda", "price": 3.0},
            {"item_id": "chicken_bowl", "name": "Chicken Rice Bowl", "price": 14.0},
        ]
        
        transactions = []
        # Generate 20 random transactions for today
        for _ in range(20):
            item = random.choice(items)
            transactions.append({
                "order_id": str(uuid.uuid4()),
                "timestamp": datetime.utcnow() - timedelta(minutes=random.randint(1, 480)),
                "item_id": item["item_id"],
                "item_name": item["name"],
                "price": item["price"],
                "quantity": random.randint(1, 3)
            })
        return transactions

    def load_inventory_csv(self, file_path: str):
        """Load initial inventory from CSV if empty"""
        if self.db.query(Inventory_Item).first():
            return # Already loaded

        with open(file_path, mode='r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                item = Inventory_Item(
                    name=row["name"],
                    unit=row["unit"],
                    current_stock=float(row["current_stock"]),
                    par_level=float(row["par_level"]),
                    supplier=row["supplier"],
                    cost_per_unit=float(row["cost_per_unit"])
                )
                self.db.add(item)
        self.db.commit()

    def seed_recipe_mappings(self):
        """Seed hardcoded recipes for the demo"""
        if self.db.query(Recipe_Mapping).first():
            return
            
        # Helper to get inventory ID by name
        def get_id(name):
            item = self.db.query(Inventory_Item).filter(Inventory_Item.name == name).first()
            return item.id if item else None

        recipes = [
            # Burger: 1 Bun, 0.25 Beef, 1 Cheese, 0.1 Lettuce, 0.1 Tomato
            ("burger", "Bun", 1.0),
            ("burger", "Beef Patty", 0.25),
            ("burger", "Cheese", 1.0),
            ("burger", "Lettuce", 0.1),
            ("burger", "Tomato", 0.1),
            # Fries: 0.5 lbs Fries
            ("fries", "Fries", 0.5),
            # Soda: 0.05 gal Syrup
            ("soda", "Soda Syrup", 0.05),
            # Chicken Bowl: 0.3 Chicken, 0.2 Rice, 0.1 Beans
            ("chicken_bowl", "Chicken Breast", 0.3),
            ("chicken_bowl", "Rice", 0.2),
            ("chicken_bowl", "Beans", 0.1),
        ]

        for pos_id, inv_name, qty in recipes:
            inv_id = get_id(inv_name)
            if inv_id:
                mapping = Recipe_Mapping(
                    pos_item_id=pos_id,
                    inventory_item_id=inv_id,
                    quantity_required=qty
                )
                self.db.add(mapping)
        self.db.commit()

    def sync_data(self):
        """Main ETL function"""
        # 1. Load Reference Data
        try:
            self.load_inventory_csv("app/data/inventory.csv")
            self.seed_recipe_mappings()
        except FileNotFoundError:
             # Fallback for running from different CWD
             self.load_inventory_csv("backend/app/data/inventory.csv")

        # 2. Fetch & Load POS Transactions
        raw_data = self.mock_fetch_pos_data()
        new_txns = []
        for row in raw_data:
            txn = POS_Transaction(**row)
            self.db.add(txn)
            new_txns.append(row)
        self.db.commit()

        # 3. Sync to DuckDB for Analytics (using Pandas as bridge)
        # In a real app we might attach Postgres to DuckDB or write parquet
        # For this mock, we'll just insert into a duckdb table from dataframe
        
        try:
            # Get all transactions from Postgres to verify sync
            all_txns = self.db.query(POS_Transaction).all()
            df = pd.DataFrame([t.__dict__ for t in all_txns])
            if "_sa_instance_state" in df.columns:
                df = df.drop(columns=["_sa_instance_state"])
                
            # Create/Replace DuckDB table
            duckdb_conn.execute("CREATE OR REPLACE TABLE pos_transactions AS SELECT * FROM df")
            
            # Log Success
            log = PipelineLog(status="SUCCESS", details=f"Synced {len(new_txns)} new transactions.")
            self.db.add(log)
            self.db.commit()
            
            return {"status": "success", "new_transactions": len(new_txns)}
        except Exception as e:
            # Log Failure
            log = PipelineLog(status="FAILED", details=str(e))
            self.db.add(log)
            self.db.commit()
            raise e

    def calculate_variance(self):
        """
        Compare Theoretical Usage (Sales * Recipe) vs Actual Inventory Updates.
        *Note: In this simplified mock, we don't have 'Actual Count' inputs from users yet,
        so we will calculate what the 'Theoretical Current Stock' should be.*
        """
        # 1. Get Sales Aggregates
        sales_query = """
        SELECT item_id, SUM(quantity) as total_sold
        FROM pos_transactions
        GROUP BY item_id
        """
        sales_data = duckdb_conn.execute(sales_query).fetchall() # List of (item_id, count)
        
        variance_report = []
        
        for pos_item_id, total_sold in sales_data:
            # Get recipe
            mappings = self.db.query(Recipe_Mapping).filter(Recipe_Mapping.pos_item_id == pos_item_id).all()
            for m in mappings:
                theoretical_usage = total_sold * m.quantity_required
                
                # Check current stock (In a real app, this would compare against a physical count)
                # For now, let's just log the usage
                item = m.inventory_item
                variance_report.append({
                    "inventory_item": item.name,
                    "sales_item": pos_item_id,
                    "total_sold": total_sold,
                    "theoretical_usage": theoretical_usage,
                    "unit": item.unit
                })
                
                # Update "Theoretical" Stock in DB for the demo (simulating usage)
                # In real life, we wouldn't update stock solely on sales without decrement logic, but this is fine.
                # Actually, let's NOT update persistent stock endlessly on every sync or we'll deplete it.
                # Let's just return the calculation.
                
        return variance_report
