from pymongo import MongoClient
from config import MONGODB_URI

client = MongoClient(MONGODB_URI)
db = client.get_default_database()

users_collection = db["users"]
orders_collection = db["orders"]
