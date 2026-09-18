import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import User from "@/db/models/user";

/**
 * Verifies the current user from cookie. Returns user info or null.
 * Does NOT redirect — call this from Server Actions and API routes.
 */
export async function verifyAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user) return null;

    return {
      id: user._id,
      role: user.role as "ADMIN" | "USER",
    };
  } catch {
    return null;
  }
}
