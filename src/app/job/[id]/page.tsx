import Link from "next/link";
import { CommitIcon, SewingPinIcon, PersonIcon } from "@radix-ui/react-icons";
import ApplicationForm from "./components/application-form";

import type { Job } from "@/utils/type";
import { formateCurrency } from "@/utils/index";
import { Separator } from "@/components/ui/separator";

export type JobDetailsPageProps = {
  params: {
    id: string;
  };
};

const job: Job = {
  id: "2",
  title: "Title 2",
  description:
    "<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis eaque doloremque at deleniti inventore modi ut vero odio? Blanditiis, cumque veniam laboriosam quidem totam quis dignissimos sed dolorem tempora harum.</p> <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis eaque doloremque at deleniti inventore modi ut vero odio? Blanditiis, cumque veniam laboriosam quidem totam quis dignissimos sed dolorem tempora harum.</p>",
  shortDescription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  createdAt: new Date().toISOString(),
  minExperience: 2,
  maxExperience: 4,
  minSalary: 90_000,
  maxSalary: 150_000,
  categories: ["frontend"],
  locations: ["bangalore", "chennai"],
};

const JobDetailsPage = ({ params }: JobDetailsPageProps) => {
  const { id: jobId } = params;
  return (
    <main className="container space-y-4 md:space-y-5 max-w-4xl">
      <header>
        <h1 className="font-medium text-xl md:text-2xl">{job.title}</h1>
        <span className="text-xs md:text-sm flex items-center gap-1 capitalize">
          {job.shortDescription}
        </span>
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
          className="md:prose-base prose prose-sm max-w-full prose-a:underline"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />

        <p className="md:prose-base prose prose-sm max-w-full mt-5">
          *Accommodations may be available based on religious and/or medical conditions, or as
          required by applicable law. To request an accommodation, please reach out to{" "}
          <Link className="underline" href={"mailto:makadsuhel11@gmail.com"}>
            makadsuhel11@gmail.com
          </Link>
          .
        </p>
      </section>

      <Separator />

      <section className="max-w-lg mx-auto">
        <h2 className="font-medium md:mb-3 mb-4">Submit your application</h2>
        <ApplicationForm jobId={job.id} />
      </section>
    </main>
  );
};

export default JobDetailsPage;
