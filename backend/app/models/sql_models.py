from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime

class Business(Base):
    __tablename__ = "businesses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    api_key_square = Column(String, nullable=True)
    api_key_toast = Column(String, nullable=True)

class POS_Transaction(Base):
    __tablename__ = "pos_transactions"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(String, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    item_id = Column(String, index=True) # ID from the POS system
    item_name = Column(String)
    price = Column(Float)
    quantity = Column(Integer)

class Inventory_Item(Base):
    __tablename__ = "inventory_items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    unit = Column(String) # e.g., 'lb', 'oz', 'count'
    current_stock = Column(Float, default=0.0)
    par_level = Column(Float, default=0.0)
    supplier = Column(String, nullable=True)
    cost_per_unit = Column(Float, default=0.0)

class Recipe_Mapping(Base):
    __tablename__ = "recipe_mappings"

    id = Column(Integer, primary_key=True, index=True)
    pos_item_id = Column(String, index=True) # Links to POS_Transaction.item_id setup
    inventory_item_id = Column(Integer, ForeignKey("inventory_items.id"))
    quantity_required = Column(Float) # How much inventory is used per 1 POS item

    inventory_item = relationship("Inventory_Item")

class Supply_Chain_Log(Base):
    __tablename__ = "supply_chain_logs"

    id = Column(Integer, primary_key=True, index=True)
    inventory_item_id = Column(Integer, ForeignKey("inventory_items.id"))
    price = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)

class PipelineLog(Base):
    __tablename__ = "pipeline_logs"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    status = Column(String) # 'SUCCESS', 'FAILED'
    details = Column(String, nullable=True)

