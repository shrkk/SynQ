from pydantic import BaseModel
from typing import List, Optional, Any
from datetime import datetime

class IngestResponse(BaseModel):
    status: str
    new_transactions: int

class DashboardKPIs(BaseModel):
    total_sales: float
    total_transactions: int
    low_stock_item_count: int
    top_selling_item: Optional[str] = None

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
