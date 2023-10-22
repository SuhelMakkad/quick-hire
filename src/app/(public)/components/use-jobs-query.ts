"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getJobs } from "@/utils/api";

const jobsPerReq = 12;

export const useJobsQuery = () => {
  return useInfiniteQuery({
    queryKey: ["jobs"],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => {
      return getJobs(jobsPerReq, (pageParam - 1) * jobsPerReq);
    },
    getNextPageParam: (lastPage, page) => {
      if (!lastPage || lastPage.length < jobsPerReq) {
        return;
      }

      return page.length + 1;
    },
  });
};
