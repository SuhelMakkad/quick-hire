import axios, { AxiosError } from "axios";
import type { Application, JobSchema, JobWithId } from "./schema";

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

export type OverviewResponse = {
  jobs: { total: number };
  applications: { total: number; new: number; shortlisted: number };
};

export const getOverview = async () => {
  const reqUrl = "/admin/api/overview";
  const res = await axios.get<OverviewResponse>(reqUrl);

  return res.data;
};

export type ApplicationsResponse = {
  applications: Application[];
};

export const getApplications = async () => {
  const reqUrl = "/admin/api/applications";
  const res = await axios.get<ApplicationsResponse>(reqUrl, {
    params: {},
  });

  return res.data.applications;
};

export const deleteApplication = async (applicationId: string) => {
  const reqUrl = "/admin/api/application";
  const res = await axios
    .delete(reqUrl, {
      params: { applicationId },
    })
    .catch(console.error);
};

export const deleteJob = async (jobId: string) => {
  const reqUrl = "/admin/api/job";
  await axios.delete(reqUrl, { params: { jobId } }).catch(console.error);
};
