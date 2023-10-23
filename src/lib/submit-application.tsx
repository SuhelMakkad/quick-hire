import { v4 as uuid } from "uuid";
import { getDb } from "./db";
import type { Application, ProfileSchemaServer } from "@/utils/schema";
import { uploadFile } from "./s3";

export const submitApplication = async (profile: ProfileSchemaServer) => {
  const db = await getDb();
  const collection = db.collection("application");

  // check if already applied
  const count = await collection.countDocuments({ jobId: profile.jobId, email: profile.email });
  if (count > 0) {
    throw Error("applied");
  }

  const id = uuid();
  const filePath = `${profile.jobId}/${profile.email}/${id}__${profile.resume.name}`;

  const profileDetails: Record<string, string | boolean> = {
    id,
    timestamp: new Date().toISOString(),
  };

  Object.entries(profile).forEach(([key, value]) => {
    if (key !== "resume") {
      profileDetails[key] = value as string | boolean;
    }
  });

  const isUploaded = await uploadFile(profile.resume, filePath);
  if (isUploaded) {
    profileDetails.resume = filePath;
  }

  const res = await collection.insertOne(profileDetails);

  return id;
};
