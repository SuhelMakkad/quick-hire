import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

import { safeCastNumber } from "@/utils/index";
import type { Application } from "@/utils/schema";
import type { ApplicationsResponse } from "@/utils/api";

export async function GET(req: Request): Promise<NextResponse<ApplicationsResponse>> {
  const url = new URL(req.url);
  const limit = safeCastNumber(url.searchParams.get("limit"), 12);
  const offset = safeCastNumber(url.searchParams.get("offset"));

  const db = await getDb();
  const collection = db.collection<Application>("applications");
  const applications = await collection.find().skip(offset).limit(limit).toArray();

  return NextResponse.json({ applications }, { status: 200 });
}
