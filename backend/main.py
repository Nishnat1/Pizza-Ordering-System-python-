from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import db, users_collection, orders_collection
from routers.auth import router as auth_router
from routers.orders import router as orders_router
from routers.admin import router as admin_router

app = FastAPI(title="Pizza Order System API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(orders_router)
app.include_router(admin_router)


@app.get("/api/health")
def health_check():
    return {"success": True, "message": "Pizza Order System API is running"}


@app.get("/api/health/db")
def db_health_check():
    try:
        collections = db.list_collection_names()
        user_count = users_collection.count_documents({})
        order_count = orders_collection.count_documents({})
        return {
            "success": True,
            "database": db.name,
            "collections": collections,
            "users_count": user_count,
            "orders_count": order_count,
        }
    except Exception as e:
        return {"success": False, "message": str(e)}
