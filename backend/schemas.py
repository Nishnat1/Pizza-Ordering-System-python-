from typing import List, Optional
from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str = "USER"


class UserLogin(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    _id: str
    name: str
    email: str
    role: str


class OrderItem(BaseModel):
    name: str
    price: float
    quantity: int
    size: Optional[str] = None
    crust: Optional[str] = None
    category: Optional[str] = None
    image: Optional[str] = None
    isVeg: Optional[bool] = None


class Address(BaseModel):
    line1: str
    city: str
    pincode: str


class UserInfo(BaseModel):
    name: str
    phone: str
    address: Address


class OrderCreate(BaseModel):
    name: str
    phone: str
    address: str
    city: str
    pincode: str
    paymentMethod: str
    items: List[OrderItem]
    quantity: int
    totalAmount: float


class AdminCreate(BaseModel):
    name: str
    email: str
    password: str


class OrderStatusUpdate(BaseModel):
    status: str
