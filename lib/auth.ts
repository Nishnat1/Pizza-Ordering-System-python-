import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

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

    if (!decoded) return null;

    return {
      id: decoded.id,
      role: decoded.role as "ADMIN" | "USER",
    };
  } catch {
    return null;
  }
}
