import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import type { OverviewResponse } from "@/utils/api";

export async function GET(req: Request): Promise<NextResponse<OverviewResponse>> {
  const db = await getDb();

  const [totalJobs, totalApplication] = await Promise.all([
    db.collection("jobs").countDocuments(),
    db.collection("application").countDocuments(),
  ]);

  return NextResponse.json({ totalJobs, totalApplication }, { status: 200 });
}
