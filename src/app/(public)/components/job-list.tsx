"use client";

import Card from "./card";
import { useJobsQuery } from "./use-jobs-query";

const JobList = () => {
  const { data, isLoading, isFetched } = useJobsQuery();

  return (
    <ul className="flex flex-col gap-2 md:gap-3">
      {data?.pages.map((page) =>
        page.map((job) => (
          <li key={job.id}>
            <Card job={job} />
          </li>
        ))
      )}
    </ul>
  );
};

export default JobList;
