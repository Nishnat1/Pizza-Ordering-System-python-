from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from bson import ObjectId

from auth import hash_password, verify_password, create_access_token, get_current_user
from config import COOKIE_SECURE
from database import users_collection
from schemas import UserCreate, UserLogin

router = APIRouter(prefix="/api/auth", tags=["auth"])


def user_to_dict(user):
    return {
        "_id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "role": user["role"],
    }


@router.post("/signin")
def signup(payload: UserCreate):
    existing = users_collection.find_one({"email": payload.email.lower().strip()})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists",
        )

    now = datetime.now(timezone.utc)
    user = {
        "name": payload.name.strip(),
        "email": payload.email.lower().strip(),
        "password": hash_password(payload.password),
        "role": payload.role if payload.role in ["USER", "ADMIN"] else "USER",
        "createdAt": now,
        "updatedAt": now,
    }
    result = users_collection.insert_one(user)
    user["_id"] = result.inserted_id
    return {"success": True, "message": "User Created Successfully"}


@router.post("/login")
def login(payload: UserLogin, response: Response):
    user = users_collection.find_one({"email": payload.email.lower().strip()})
    if not user:
        return {"success": False}

    if not verify_password(payload.password, user["password"]):
        return {"success": False}

    token = create_access_token({"id": str(user["_id"]), "role": user["role"]})

    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite="lax",
        path="/",
    )

    return {
        "success": True,
        "user": user_to_dict(user),
    }


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(key="token", path="/")
    return {"success": True}


@router.get("/me")
def me(current_user: dict = Depends(get_current_user)):
    try:
        user = users_collection.find_one({"_id": ObjectId(current_user["id"])})
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )
        return {"success": True, "user": user_to_dict(user)}
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized",
        )
