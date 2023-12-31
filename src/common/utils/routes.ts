export const routes = {
  home: "/",
  login: "/auth/login",
  thankYou: "/thank-you",
};

export const adminRoutes = {
  home: "/admin",
  applications: "/admin/applications",
  postJob: "/admin/post-job",
};

export const getJobDetailsRoute = (jobId: string) => `/job/${jobId}`;

export const getJobApplyRoute = (jobId: string) => `/job/${jobId}/apply`;

export const getEditJobPostRoute = (jobId: string) => `/admin/job/${jobId}`;

export const getApplicationRoute = (applicationId: string) => `/admin/application/${applicationId}`;

export const s3BaseUrl = "https://quick-hire.s3.amazonaws.com";

export const getResumeS3Path = ({
  jobId,
  applicationId,
  email,
  fileName,
}: {
  jobId: string;
  applicationId: string;
  email: string;
  fileName: string;
}) => `${jobId}/${email}/${applicationId}__${fileName}`;

export const getResumeServerPath = (applicationId: string) =>
  `/admin/api/resume?applicationId=${applicationId}`;
