import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { v4 as uuid } from "uuid";

import { getDb } from "@/lib/db";
import { jobSchema, type JobWithId } from "@/utils/schema";
import type { ErrorResponse, PostJobResponse } from "@/utils/api";
import { revalidatePath } from "next/cache";
import { getJobDetailsRoute } from "@/utils/routes";
import createUpdateJob from "@/lib/create-update-job";

export async function POST(req: Request): Promise<NextResponse<PostJobResponse | ErrorResponse>> {
  try {
    const reqJson = await req.json();
    const jobId = req.headers.get("x-job-id");

    console.log({ jobId });

    const data = jobSchema.parse(reqJson);
    const newJobId = await createUpdateJob(data, jobId);

    revalidatePath(getJobDetailsRoute(newJobId));

    return NextResponse.json({ status: "success", jobId: newJobId }, { status: 200 });
  } catch (e) {
    let err = e;
    let message = "";

    console.error(e);

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

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const jobId = url.searchParams.get("jobId")?.toString();

  if (!jobId) {
    return NextResponse.json({ status: "failed", message: "job id not provided" }, { status: 409 });
  }

  const db = await getDb();
  const collection = db.collection<JobWithId>("jobs");
  const res = await collection.deleteOne({ id: jobId });

  revalidatePath(getJobDetailsRoute(jobId));

  return NextResponse.json({ status: "success" }, { status: 200 });
}
