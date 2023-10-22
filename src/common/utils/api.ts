import axios, { AxiosError } from "axios";
import { JobSchema } from "./schema";

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
