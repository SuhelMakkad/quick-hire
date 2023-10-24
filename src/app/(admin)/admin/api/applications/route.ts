import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

import type { Application } from "@/utils/schema";
import type { ApplicationsResponse } from "@/utils/api";

export async function GET(req: Request): Promise<NextResponse<ApplicationsResponse>> {
  const url = new URL(req.url);

  const db = await getDb();
  const collection = db.collection<Application>("applications");
  const applications = await collection.find().sort({ timestamp: -1 }).toArray();

  return NextResponse.json({ applications }, { status: 200 });
}
