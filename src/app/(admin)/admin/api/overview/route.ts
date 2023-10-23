import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import type { OverviewResponse } from "@/utils/api";

export const dynamic = "force-dynamic";

export async function GET(req: Request): Promise<NextResponse<OverviewResponse>> {
  const db = await getDb();

  const [totalJobs, totalApplication, newApplications, shortlistedApplications] = await Promise.all(
    [
      db.collection("jobs").countDocuments(),
      db.collection("applications").countDocuments(),
      db.collection("applications").countDocuments({ status: "new" }),
      db.collection("applications").countDocuments({ status: "shortlisted" }),
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
