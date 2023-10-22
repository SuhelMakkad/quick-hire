import { buttonVariants } from "@/components/ui/button";
import { getEditJobPostRoute } from "@/utils/routes";
import { Plus } from "lucide-react";
import Link from "next/link";

const JobsPage = () => {
  return (
    <main className="container mt-2">
      <header className="mb-4 md:mb-5 flex items-center gap-2">
        <h1 className="font-medium text-lg md:text-xl">Posted Jobs</h1>

        <Link
          className={buttonVariants({ size: "icon", class: "gap-2", variant: "outline" })}
          href={getEditJobPostRoute("new")}
          title="Post a new job"
        >
          <Plus className="w-4" />
        </Link>
      </header>
    </main>
  );
};

export default JobsPage;
