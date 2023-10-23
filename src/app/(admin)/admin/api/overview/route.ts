import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import type { OverviewResponse } from "@/utils/api";

export async function GET(req: Request): Promise<NextResponse<OverviewResponse>> {
  const db = await getDb();

  const [totalJobs, totalApplication, newApplications, shortlistedApplications] = await Promise.all(
    [
      db.collection("jobs").countDocuments(),
      db.collection("application").countDocuments(),
      db.collection("application").countDocuments({ status: "new" }),
      db.collection("application").countDocuments({ status: "shortlisted" }),
    ]
  );

  return NextResponse.json(
    {
      jobs: {
        total: totalJobs,
      },
      applications: {
        total: totalApplication,
        new: newApplications,
        shortlisted: shortlistedApplications,
      },
    },
    { status: 200 }
  );
}
