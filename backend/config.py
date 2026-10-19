import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/pizza-order-system")
JWT_SECRET = os.getenv("JWT_SECRET", "this is the secret don't share it with others")
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_DAYS = 7

COOKIE_SECURE = os.getenv("COOKIE_SECURE", "false").lower() in ("1", "true", "yes")
