import CreateJobForm from "./components/create-job-form";

export type JobEditPageProps = {
  params: {
    id: string;
  };
};

const JobEditPage = ({ params }: JobEditPageProps) => {
  const { id: jobId } = params;

  return (
    <main className="container max-w-2xl mx-auto">
      <h1 className="font-medium text-lg md:text-xl mb-4">Add a New Job</h1>

      <div>
        <CreateJobForm jobId={jobId} />
      </div>
    </main>
  );
};

export default JobEditPage;
