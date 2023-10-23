import Link from "next/link";
import { notFound } from "next/navigation";

import { Download, Github, Linkedin, Mail, Phone, Send } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

import { getJobDetailsRoute, getResumeServerPath } from "@/utils/routes";
import getApplicationDetails from "@/lib/get-application-details";
import getApplicationIds from "@/lib/get-application-ids";
import { getJobDetails } from "@/lib/get-Job-details";

export type ApplicationPageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  const applications = await getApplicationIds();

  return applications.map((application) => ({
    id: application.id,
  }));
}

export const dynamicParams = true;

const ApplicationPage = async ({ params }: ApplicationPageProps) => {
  const { id: applicationId } = params;
  const application = await getApplicationDetails(applicationId);

  if (!application) {
    notFound();
  }

  const job = await getJobDetails(application.jobId);

  return (
    <main className="container my-8 max-w-lg mx-auto">
      <div className="flex md:items-center justify-between">
        <div>
          <h1 className="font-medium md:text-2xl text-lg capitalize">
            {application.firstName} {application.lastName}
          </h1>

          <span className="text-xs md:text-sm text-muted-foreground">
            {new Date(application.timestamp).toLocaleString("en-US")}
          </span>
        </div>

        <Link
          target="_blank"
          href={getResumeServerPath(application.id)}
          className={buttonVariants({
            size: "sm",
            className: "flex items-center gap-2",
          })}
          download
        >
          <Download className="w-4" />
          Resume
        </Link>
      </div>

      <section className="flex flex-col mt-8 space-y-4">
        <h2 className="font-medium text-xs md:text-sm">Basic Details</h2>

        <div className="flex flex-col gap-2">
          {job ? (
            <Link
              target="_blank"
              href={getJobDetailsRoute(application.jobId)}
              className="hover:underline text-sm md:text-base flex items-center gap-2"
            >
              <Send className="w-4" />
              Applied for {job.title}
            </Link>
          ) : (
            <span className="text-sm md:text-base flex items-center gap-2">
              <Send className="w-4" />
              Job Not found!
            </span>
          )}

          <Link
            target="_blank"
            href={`mailto:${application.email}`}
            className="hover:underline text-sm md:text-base flex items-center gap-2"
          >
            <Mail className="w-4" />
            {application.email}
          </Link>

          <Link
            target="_blank"
            href={`tel:${application.phone}`}
            className="hover:underline text-sm md:text-base flex items-center gap-2"
          >
            <Phone className="w-4" />
            {application.phone}
          </Link>

          {application.linkedin && (
            <Link
              target="_blank"
              href={application.linkedin}
              className="hover:underline text-sm md:text-base flex items-center gap-2"
            >
              <Linkedin className="w-4" />
              {application.linkedin}
            </Link>
          )}

          {application.github && (
            <Link
              target="_blank"
              href={application.github}
              className="hover:underline text-sm md:text-base flex items-center gap-2"
            >
              <Github className="w-4" />
              {application.github}
            </Link>
          )}
        </div>
      </section>
    </main>
  );
};

export default ApplicationPage;
