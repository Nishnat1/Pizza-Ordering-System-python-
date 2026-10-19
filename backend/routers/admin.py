from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId

from auth import hash_password, get_current_user
from database import users_collection
from schemas import AdminCreate

router = APIRouter(prefix="/api/admin", tags=["admin"])


def user_to_dict(user):
    return {
        "_id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "role": user["role"],
        "createdAt": user.get("createdAt"),
    }


@router.get("/admins")
def get_admins(current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "ADMIN":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    admins = list(users_collection.find({"role": "ADMIN"}).sort("createdAt", -1))
    return [user_to_dict(a) for a in admins]


@router.post("/admins")
def add_admin(payload: AdminCreate, current_user: dict = Depends(get_current_user)):
    if current_user["role"] != "ADMIN":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )

    if not payload.name or not payload.name.strip():
        return {"success": False, "message": "Name is required"}
    if not payload.email or not payload.email.strip():
        return {"success": False, "message": "Email is required"}
    if not payload.password or len(payload.password) < 8:
        return {"success": False, "message": "Password must be at least 8 characters long"}

    existing = users_collection.find_one({"email": payload.email.lower().strip()})
    if existing:
        return {
            "success": False,
            "message": f"An account with the email {payload.email} already exists",
        }

    now = datetime.now(timezone.utc)
    admin = {
        "name": payload.name.strip(),
        "email": payload.email.lower().strip(),
        "password": hash_password(payload.password),
        "role": "ADMIN",
        "createdAt": now,
        "updatedAt": now,
    }
    users_collection.insert_one(admin)
    return {"success": True, "message": "Administrator added successfully!"}
