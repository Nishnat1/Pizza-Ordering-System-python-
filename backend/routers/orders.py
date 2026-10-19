import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId

from auth import get_current_user
from database import orders_collection
from schemas import OrderCreate, OrderStatusUpdate

router = APIRouter(prefix="/api/orders", tags=["orders"])


def order_to_dict(order):
    result = {k: v for k, v in order.items()}
    result["_id"] = str(order["_id"])
    result["user"] = str(order["user"])
    return result


@router.get("")
def get_all_orders(current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "ADMIN":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    try:
        orders = list(orders_collection.find().sort("createdAt", -1))
        return {"success": True, "orders": [order_to_dict(o) for o in orders]}
    except Exception:
        return {"success": False}


@router.post("")
def create_order(payload: OrderCreate, current_user: dict = Depends(get_current_user)):
    try:
        order_id = uuid.uuid4().hex[:8].upper()
        now = datetime.now(timezone.utc)
        order = {
            "orderId": order_id,
            "user": ObjectId(current_user["id"]),
            "items": [item.model_dump() for item in payload.items],
            "quantity": payload.quantity,
            "totalAmount": payload.totalAmount,
            "status": "PENDING",
            "userInfo": {
                "name": payload.name,
                "phone": payload.phone,
                "address": {
                    "line1": payload.address,
                    "city": payload.city,
                    "pincode": payload.pincode,
                },
            },
            "paymentMethod": payload.paymentMethod,
            "createdAt": now,
            "updatedAt": now,
        }
        orders_collection.insert_one(order)
        return {"success": True, "message": "Order Created Successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unable to place the order",
        )


@router.get("/user/{user_id}")
def get_user_orders(user_id: str, current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "ADMIN" and current_user["id"] != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only view your own orders",
        )
    try:
        orders = list(orders_collection.find({"user": ObjectId(user_id)}).sort("createdAt", -1))
        return {"success": True, "orders": [order_to_dict(o) for o in orders]}
    except Exception as e:
        print(e)
        return {"success": False}


@router.patch("/{order_id}/status")
def update_order_status(order_id: str, payload: OrderStatusUpdate, current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "ADMIN":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )

    valid_statuses = [
        "PENDING",
        "CONFIRMED",
        "PREPARING",
        "OUT-FOR-DELIVEREY",
        "DELIVERED",
        "CANCELLED",
    ]
    if payload.status not in valid_statuses:
        return {"success": False, "message": f"Invalid status: {payload.status}"}

    result = orders_collection.find_one_and_update(
        {"orderId": order_id},
        {"$set": {"status": payload.status, "updatedAt": datetime.now(timezone.utc)}},
        return_document=True,
    )
    if not result:
        return {"success": False, "message": "Order not found"}

    return {
        "success": True,
        "message": f"Order status updated to {payload.status}",
        "order": order_to_dict(result),
    }


@router.delete("/{order_id}")
def cancel_order(order_id: str, current_user: dict = Depends(get_current_user)):
    try:
        order = orders_collection.find_one({
            "_id": ObjectId(order_id),
            "user": ObjectId(current_user["id"]),
        })
        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order not found",
            )
        if order["status"] == "DELIVERED":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot cancel delivered order",
            )
        orders_collection.update_one(
            {"_id": ObjectId(order_id)},
            {"$set": {"status": "CANCELLED", "updatedAt": datetime.now(timezone.utc)}},
        )
        return {"success": True, "message": "Order cancelled"}
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unable to cancel order",
        )
