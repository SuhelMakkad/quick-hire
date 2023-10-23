"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getApplications } from "@/utils/api";

const jobsPerReq = 12;

export const useApplicationsQuery = () => {
  return useInfiniteQuery({
    queryKey: ["admin-applications"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getApplications(jobsPerReq, pageParam * jobsPerReq),
    getNextPageParam: (lastPage, page) => {
      if (!lastPage || lastPage.length < jobsPerReq) {
        return;
      }

      return page.length + 1;
    },
  });
};
