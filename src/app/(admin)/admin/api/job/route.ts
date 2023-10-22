import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { v4 as uuid } from "uuid";

import { getDb } from "@/lib/db";
import { jobSchema, type JobWithId } from "@/utils/schema";
import type { PostErrorJobResponse, PostJobResponse } from "@/utils/api";

export async function POST(
  req: Request
): Promise<NextResponse<PostJobResponse | PostErrorJobResponse>> {
  try {
    const reqJson = await req.json();

    const data = jobSchema.parse(reqJson);
    const newJob: JobWithId = {
      ...data,
      id: uuid(),
      createdAt: new Date().toISOString(),
    };

    const db = await getDb();
    const jobsCollection = db.collection<JobWithId>("jobs");
    await jobsCollection.insertOne(newJob);

    return NextResponse.json({ status: "success", jobId: newJob.id }, { status: 200 });
  } catch (e) {
    let err = e;
    let message = "";

    if (err instanceof ZodError) {
      err = err.issues.map((e) => ({ path: e.path[0], message: e.message }));
      message = "Invalid fields";
    }

    return NextResponse.json(
      {
        status: "failed",
        error: err,
        message,
      },
      {
        status: 409,
      }
    );
  }
}
