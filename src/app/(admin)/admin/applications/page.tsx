import OverviewSection from "./components/overview-cards";
import ApplicationListTable from "./components/applications-table";

const ApplicationsPage = () => {
  return (
    <main className="container my-4">
      <section>
        <span className="block mb-4 text-xs md:text-sm font-medium">Applications Overview</span>
        <OverviewSection />
      </section>

      <section className="mt-8">
        <span className="block mb-4 text-xs md:text-sm font-medium">Application</span>
        <ApplicationListTable />
      </section>
    </main>
  );
};

export default ApplicationsPage;
