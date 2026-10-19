// lib/jwt.ts
import jwt from "jsonwebtoken";

type authPayload = {
  id: string;
  role: "USER" | "ADMIN";
};

const SECRET = process.env.JWT_SECRET!;

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET) as authPayload;
};
