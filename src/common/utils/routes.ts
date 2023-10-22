export const routes = {
  home: "/",
};

export const adminRoutes = {
  home: "/admin",
  jobs: "/admin/jobs",
  postJob: "/admin/post-job",
};

export const getJobDetailsRoute = (jobId: string) => `/job/${jobId}`;

export const getJobApplyRoute = (jobId: string) => `/job/${jobId}/apply`;

export const getEditJobPostRoute = (jobId: string) => `/admin/job/${jobId}`;
