import { v4 as uuid } from "uuid";
import { getDb } from "./db";
import type { JobSchema, JobWithId } from "@/utils/schema";

const createUpdateJob = async (job: JobSchema, jobId?: string | null) => {
  if (!jobId || jobId == "new") {
    return createJob(job);
  }

  const newJob: Partial<JobWithId> = {
    ...job,
    updatedAt: new Date().toISOString(),
  };

  const db = await getDb();
  const jobsCollection = db.collection<JobWithId>("jobs");
  await jobsCollection.updateOne({ id: jobId }, newJob);

  return jobId;
};

export default createUpdateJob;

const createJob = async (job: JobSchema) => {
  const newJob: JobWithId = {
    ...job,
    id: uuid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const db = await getDb();
  const jobsCollection = db.collection<JobWithId>("jobs");
  await jobsCollection.insertOne(newJob);

  return newJob.id;
};
