import axios from "axios";
import type { JobSchema, JobWithId } from "./schema";

export type PostJobResponse = {
  status: "success";
  jobId: string;
};
export type PostErrorJobResponse = {
  status: "failed";
  error: unknown;
  message: string;
};

export const addJobPost = async (job: JobSchema) => {
  const reqUrl = "/admin/api/job";
  try {
    const res = await axios.post<PostJobResponse>(reqUrl, job);
    return res.data;
  } catch (e) {
    const error = e as PostErrorJobResponse;
    return error;
  }
};

export type GetJobsResponse = {
  total: number;
  jobs: Omit<JobWithId, "description">[];
};

export const getJobs = async (limit: number, offset: number) => {
  const reqUrl = "/api/jobs";
  const res = await axios.get<GetJobsResponse>(reqUrl, {
    params: {
      limit,
      offset,
    },
  });
  return res.data.jobs;
};
