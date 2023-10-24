"use client";

import { useQuery } from "@tanstack/react-query";
import { getJobs } from "@/utils/api";

export const useJobsQuery = () => {
  return useQuery({
    queryKey: ["admin", "job"],
    queryFn: () => getJobs(0, 0),
  });
};
