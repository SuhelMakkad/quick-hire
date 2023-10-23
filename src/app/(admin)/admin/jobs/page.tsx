import Link from "next/link";

import { Plus } from "lucide-react";
import OverviewCards from "./components/overview-cards";
import JobsTable from "./components/jobs-table";
import { buttonVariants } from "@/components/ui/button";

import { getEditJobPostRoute } from "@/utils/routes";
import { cn } from "@/utils/ui";

const AdminPage = () => {
  return (
    <main className="container my-4">
      <section>
        <span className="block mb-2 text-xs md:text-sm font-medium">Jobs Overview</span>
        <OverviewCards />
      </section>

      <section className="mt-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="block text-xs md:text-sm font-medium">Posted Jobs</span>
          <Link
            title="Add new job"
            href={getEditJobPostRoute("new")}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "icon",
              }),
              "w-6 h-6 px-0"
            )}
          >
            <Plus className="w-3.5 h-3.5" />
          </Link>
        </div>

        <JobsTable />
      </section>
    </main>
  );
};

export default AdminPage;
