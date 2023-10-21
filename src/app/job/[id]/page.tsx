export type JobDetailsPageProps = {
  params: {
    id: string;
  };
};

const JobDetailsPage = ({ params }: JobDetailsPageProps) => {
  const { id: jobId } = params;
  return <main className="container">JobDetailsPage :{jobId}</main>;
};

export default JobDetailsPage;
