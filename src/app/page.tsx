import Card from "./components/card";
import type { Job } from "@/utils/type";

const jobs: Job[] = [
  {
    id: "1",
    title: "Title 1",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis eaque doloremque at deleniti inventore modi ut vero odio? Blanditiis, cumque veniam laboriosam quidem totam quis dignissimos sed dolorem tempora harum.",
    shortDescription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    createdAt: new Date().toISOString(),
    minExperience: 2,
    maxExperience: 4,
    minSalary: 90_000,
    maxSalary: 150_000,
    categories: ["frontend", "react", "javascript"],
    locations: ["bangalore"],
  },
  {
    id: "2",
    title: "Title 2",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis eaque doloremque at deleniti inventore modi ut vero odio? Blanditiis, cumque veniam laboriosam quidem totam quis dignissimos sed dolorem tempora harum.",
    shortDescription: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    createdAt: new Date().toISOString(),
    minExperience: 2,
    maxExperience: 4,
    minSalary: 90_000,
    maxSalary: 150_000,
    categories: ["frontend"],
    locations: ["bangalore, chennai"],
  },
];

export default function Home() {
  return (
    <main className="container">
      <header className="mb-4 md:mb-5">
        <h1 className="font-medium">Best jobs around the world</h1>
        <span className="text-xs md:text-sm">365 Open roles</span>
      </header>

      <ul className="flex flex-col gap-2 md:gap-3">
        {jobs.map((job) => (
          <li key={job.id}>
            <Card job={job} />
          </li>
        ))}
      </ul>
    </main>
  );
}
