import { v4 as uuid } from "uuid";
import { getDb } from "./db";
import { uploadFile } from "./s3";
import { getResumeS3Path, s3BaseUrl } from "@/utils/routes";
import type { ProfileSchemaServer } from "@/utils/schema";

export const submitApplication = async (profile: ProfileSchemaServer) => {
  const db = await getDb();
  const collection = db.collection("applications");

  // check if already applied
  const count = await collection.countDocuments({ jobId: profile.jobId, email: profile.email });
  if (count > 0) {
    throw Error("applied");
  }

  const id = uuid();
  const filePath = getResumeS3Path({
    jobId: profile.jobId,
    applicationId: id,
    email: profile.email,
    fileName: profile.resume.name,
  });

  const profileDetails: Record<string, string | boolean> = {
    id,
    timestamp: new Date().toISOString(),
    status: "new",
  };

  Object.entries(profile).forEach(([key, value]) => {
    if (key !== "resume") {
      profileDetails[key] = value as string | boolean;
    }
  });

  const isUploaded = await uploadFile(profile.resume, filePath);
  if (isUploaded) {
    profileDetails.resume = `${s3BaseUrl}/${filePath}`;
  }

  const res = await collection.insertOne(profileDetails);

  return id;
};
