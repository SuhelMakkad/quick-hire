import { notFound } from "next/navigation";
import CreateJobForm from "./components/create-job-form";
import { getJobDetails } from "@/lib/get-Job-details";

export type JobEditPageProps = {
  params: {
    id: string;
  };
};

const JobEditPage = async ({ params }: JobEditPageProps) => {
  const { id: jobId } = params;

  const jobDetails = jobId === "new" ? null : await getJobDetails(jobId);

  if (jobId !== "new" && !jobDetails) {
    notFound();
  }

  return (
    <main className="container max-w-2xl mx-auto">
      <h1 className="font-medium text-lg md:text-xl mb-4">Add a New Job</h1>

      <div>
        <CreateJobForm job={jobDetails} />
      </div>
    </main>
  );
};

export default JobEditPage;
