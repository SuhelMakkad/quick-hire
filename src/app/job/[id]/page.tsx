import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getJobApplyRoute } from "@/utils/routes";
import type { Job } from "@/utils/type";
import ApplicationForm from "./components/application-form";

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
    <main className="container space-y-4 md:space-y-5">
      <header>
        <h1 className="font-medium text-xl md:text-2xl">{job.title}</h1>
        <span className="text-xs md:text-sm flex items-center gap-1 capitalize">
          {job.shortDescription}
        </span>
      </header>

      <section>
        <div
          className="md:prose-base prose prose-sm max-w-full prose-a:underline"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />

        <p className="md:prose-base prose prose-sm max-w-full mt-5">
          *Accommodations may be available based on religious and/or medical conditions, or as
          required by applicable law. To request an accommodation, please reach out to{" "}
          <Link className="underline" href={"mailto:accommodations@quick-hire.suhelmakkad.com"}>
            accommodations@quick-hire.com
          </Link>
          .
        </p>
      </section>

      <section>
        <ApplicationForm jobId={job.id} />
      </section>
    </main>
  );
};

export default JobDetailsPage;
