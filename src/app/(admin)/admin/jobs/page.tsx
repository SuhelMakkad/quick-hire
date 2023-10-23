import OverviewCards from "./components/overview-cards";
import JobsTable from "./components/jobs-table";

const AdminPage = () => {
  return (
    <main className="container my-4">
      <section>
        <span className="block mb-2 text-xs md:text-sm font-medium">Jobs Overview</span>
        <OverviewCards />
      </section>

      <section className="mt-8">
        <span className="block mb-2 text-xs md:text-sm font-medium">Posted Jobs</span>
        <JobsTable />
      </section>
    </main>
  );
};

export default AdminPage;
