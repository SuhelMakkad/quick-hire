import Link from "next/link";
import { notFound } from "next/navigation";

import { Download, GitMergeIcon, Github, Linkedin, Mail, Phone, Send } from "lucide-react";

import { getJobDetailsRoute, getResumeServerPath } from "@/utils/routes";
import getApplicationDetails from "@/lib/get-application-details";
import getApplicationIds from "@/lib/get-application-ids";
import PdfViewer from "@/components/pdf-viewer";
import { buttonVariants } from "@/components/ui/button";

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

  return (
    <main className="container my-4">
      <h1 className="font-medium md:text-2xl text-lg capitalize">
        {application.firstName} {application.lastName}
      </h1>

      <span className="text-xs md:text-sm text-muted-foreground">
        {new Date(application.timestamp).toLocaleString("en-US")}
      </span>

      <section className="flex flex-col mt-8 space-y-4">
        <h2 className="font-medium text-xs md:text-sm">Basic Details</h2>

        <div className="flex flex-col gap-2">
          <Link
            target="_blank"
            href={getJobDetailsRoute(application.jobId)}
            className="hover:underline text-sm md:text-base flex items-center gap-2"
          >
            <Send className="w-4" />
            Applied for {application.jobId}
          </Link>

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

        <div className="space-y-2">
          <div className="flex justify-end">
            <Link
              target="_blank"
              href={getResumeServerPath(application.id)}
              className={buttonVariants({
                size: "sm",
                className: "flex items-center gap-2 justify-end ml-auto",
              })}
              download
            >
              <Download className="w-4" />
              Resume
            </Link>
          </div>

          <div className="h-[80vh]">
            <PdfViewer src={getResumeServerPath(application.id)} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ApplicationPage;
