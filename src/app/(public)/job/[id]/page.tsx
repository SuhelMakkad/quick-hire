import Link from "next/link";
import { CommitIcon, SewingPinIcon, PersonIcon } from "@radix-ui/react-icons";
import ApplicationForm from "./components/application-form";

import { formateCurrency } from "@/utils/index";
import { Separator } from "@/components/ui/separator";
import { getJobDetails } from "@/lib/getJobDetails";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";

export type JobDetailsPageProps = {
  params: {
    id: string;
  };
};

const JobDetailsPage = async ({ params }: JobDetailsPageProps) => {
  const { id: jobId } = params;
  const job = await getJobDetails(jobId);

  if (!job) {
    notFound();
  }

  return (
    <main className="container space-y-4 md:space-y-5 max-w-4xl mb-8">
      <header className="flex items-center gap-2 justify-between">
        <div>
          <h1 className="font-medium text-xl md:text-2xl">{job.title}</h1>
          <span className="text-xs md:text-sm flex items-center gap-1 capitalize">
            {job.shortDescription}
          </span>
        </div>

        <Link href={"#apply"} className={buttonVariants({ variant: "secondary", size: "sm" })}>
          Apply Now
        </Link>
      </header>

      <section>
        <h2 className="text-sm md:text-base font-medium mb-1.5">Basic Details</h2>
        <ul className="text-xs md:text-sm capitalize flex flex-col gap-1">
          <li className="flex items-center gap-1">
            <SewingPinIcon />
            <span>Location: </span>
            <span className="font-medium">{job.locations.join(", ")}</span>
          </li>
          <li className="flex items-center gap-1">
            <CommitIcon />
            <span>Pay Range: </span>
            <span className="font-medium">
              {formateCurrency(job.minSalary)} to {formateCurrency(job.maxSalary)}
            </span>
          </li>
          <li className="flex items-center gap-1">
            <PersonIcon />
            <span>Required Experience: </span>
            <span className="font-medium">
              {job.minExperience} to {job.maxExperience} years
            </span>
          </li>
        </ul>
      </section>

      <section>
        <div
          className="prose prose-sm md:prose-base prose-headings:font-medium md:prose-headings:text-base prose-headings:text-sm prose-strong:font-medium max-w-full"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />
      </section>

      <Separator />

      <section id="apply" className="max-w-lg mx-auto scroll-mt-8">
        <h2 className="font-medium md:mb-3 mb-4">Submit your application</h2>
        <ApplicationForm jobId={job.id} />
      </section>
    </main>
  );
};

export default JobDetailsPage;
