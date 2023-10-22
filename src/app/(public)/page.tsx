import JobList from "./components/job-list";

export default function Home() {
  return (
    <main className="container">
      <header className="mb-4 md:mb-5">
        <h1 className="font-medium text-lg md:text-xl">Best jobs around the world</h1>
        <span className="text-xs md:text-sm">365 Open roles</span>
      </header>

      <JobList />
    </main>
  );
}
