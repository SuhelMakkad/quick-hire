import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import type { Application } from "@/utils/schema";
import { getPreSignedUrl } from "@/lib/s3";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const applicationId = url.searchParams.get("applicationId");

  if (!applicationId) {
    return NextResponse.json(
      { status: "failed", message: "application id is missing" },
      { status: 409 }
    );
  }

  const db = await getDb();
  const collection = db.collection<Application>("applications");
  const application = await collection.findOne(
    { id: applicationId },
    { projection: { resume: 1 } }
  );

  if (!application?.resume) {
    return NextResponse.json({ status: "failed", message: "not found" }, { status: 400 });
  }

  const preSignedUrl = await getPreSignedUrl(application.resume);
  if (!preSignedUrl) {
    return NextResponse.json({ status: "failed", message: "not found" }, { status: 400 });
  }

  return NextResponse.redirect(preSignedUrl, { status: 303 });
}
