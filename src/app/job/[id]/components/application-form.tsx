import { Button } from "@/components/ui/button";

export type ApplicationForm = { jobId: string };
const ApplicationForm = ({ jobId }: ApplicationForm) => {
  return (
    <form>
      <Button>Apply Now</Button>
    </form>
  );
};

export default ApplicationForm;
