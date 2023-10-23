import { NextResponse } from "next/server";

import { generateHash, validateHash } from "@/lib/auth/bcrypt";
import { getAuthToken } from "@/lib/auth";
import { getDb } from "@/lib/db";
import type { User } from "@/utils/schema";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const username = url.searchParams.get("username") ?? "";
  const password = url.searchParams.get("password") ?? "";

  const db = await getDb();
  const users = db.collection<User>("users");

  const user = await users.findOne({ username });
  if (!user) {
    return NextResponse.json({ message: "Invalid credentials!" }, { status: 401 });
  }

  const isPassValid = await validateHash(password, user.passwordHash);
  if (!isPassValid) {
    return NextResponse.json({ message: "Invalid credentials!" }, { status: 401 });
  }

  const token = await getAuthToken(username, user.role);
  return NextResponse.json({ status: "success" }, { headers: { "Set-Cookie": token } });
}
