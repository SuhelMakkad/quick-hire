import axios, { AxiosError } from "axios";
import type { JobSchema, JobWithId } from "./schema";

export type ErrorResponse = {
  status: "failed";
  error: unknown;
  message: string;
};

export type PostJobResponse = {
  status: "success";
  jobId: string;
};

export const addJobPost = async (job: JobSchema) => {
  const reqUrl = "/admin/api/job";
  try {
    const res = await axios.post<PostJobResponse>(reqUrl, job);
    return res.data;
  } catch (e) {
    const error = e as ErrorResponse;
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

export type ApplyResponse = {
  status: "success";
  applicationId: string;
};

export const submitProfile = async (profile: FormData) => {
  const reqUrl = "/api/apply";
  try {
    const res = await axios.post<ApplyResponse>(reqUrl, profile);
    return res.data;
  } catch (e) {
    const error = e as AxiosError;

    if (error?.response?.data) {
      console.log(error?.response?.data);
      return error?.response?.data as ErrorResponse;
    }
    return error;
  }
};
