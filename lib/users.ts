import { openDB } from "./db";
import bcrypt from "bcryptjs";

export async function createUser(name: string, email: string, password: string) {
  const db = await openDB();
  const hash = await bcrypt.hash(password, 10);

  await db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hash]
  );
}

export async function findUserByEmail(email: string) {
  const db = await openDB();
  return db.get("SELECT * FROM users WHERE email = ?", [email]);
}

export async function incrementAttempts(email: string) {
  const db = await openDB();
  await db.run("UPDATE users SET attempts = attempts + 1 WHERE email = ?", [
    email,
  ]);
}

export async function resetAttempts(email: string) {
  const db = await openDB();
  await db.run("UPDATE users SET attempts = 0 WHERE email = ?", [email]);
}
