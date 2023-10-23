import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { getDb } from "@/lib/db";
import { deleteObject } from "@/lib/s3";

import { getApplicationRoute } from "@/utils/routes";
import type { Application } from "@/utils/schema";

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const applicationId = url.searchParams.get("applicationId")?.toString();

  if (!applicationId) {
    return NextResponse.json({ status: "failed" }, { status: 400 });
  }

  const db = await getDb();
  const collection = db.collection("applications");
  const application = await collection.findOne<Application>(
    { id: applicationId },
    {
      projection: {
        resume: 1,
      },
    }
  );

  if (!application) {
    return NextResponse.json({ status: "failed", message: "No application found with this Id" });
  }

  const res = await collection.deleteOne({
    id: applicationId,
  });

  const filePath = application.resume;
  await deleteObject(filePath);

  revalidatePath(getApplicationRoute(applicationId));

  return NextResponse.json({ status: "success" }, { status: 200 });
}
