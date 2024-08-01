// lib/auth.js
import jwt from "jsonwebtoken";
import { parse } from "cookie";

const JWT_SECRET = "test"; // Asegúrate de usar la misma clave secreta que usaste para firmar el JWT

export function verifySessionCookie(cookie) {
  try {
    const { session } = parse(cookie || "");
    if (!session) {
      return null;
    }

    const payload = jwt.verify(session, JWT_SECRET);
    return payload;
  } catch (error) {
    console.error("Failed to verify session cookie:", error);
    return null;
  }
}
