import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

import { safeCastNumber } from "@/utils/index";
import type { JobWithId } from "@/utils/schema";
import type { GetJobsResponse } from "@/utils/api";

export async function GET(req: Request): Promise<NextResponse<GetJobsResponse>> {
  const reqUrl = new URL(req.url);

  const limit = safeCastNumber(reqUrl.searchParams.get("limit"));
  const offset = safeCastNumber(reqUrl.searchParams.get("offset"));

  const db = await getDb();
  const jobsCollection = db.collection<JobWithId>("jobs");

  const total = await jobsCollection.countDocuments();
  const jobs = await jobsCollection
    .find()
    .project<Omit<JobWithId, "description">>({ description: 0 })
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .toArray();

  return NextResponse.json({
    total,
    jobs,
  });
}
