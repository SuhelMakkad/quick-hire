export const routes = {
  home: "/",
  thankYou: "/thank-you",
};

export const adminRoutes = {
  home: "/admin",
  jobs: "/admin/jobs",
  postJob: "/admin/post-job",
};

export const getJobDetailsRoute = (jobId: string) => `/job/${jobId}`;

export const getJobApplyRoute = (jobId: string) => `/job/${jobId}/apply`;

export const getEditJobPostRoute = (jobId: string) => `/admin/job/${jobId}`;

export const getApplicationRoute = (applicationId: string) => `/admin/application/${applicationId}`;
