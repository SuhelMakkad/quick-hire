import { getDb } from "./db";
import type { JobWithId } from "@/utils/schema";

export const getJobDetails = async (jobId: string) => {
  const db = await getDb();
  const collection = db.collection<JobWithId>("jobs");

  const res = await collection.findOne({ id: jobId });
  return res;
};
