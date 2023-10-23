"use client";

import { useQuery } from "@tanstack/react-query";
import { getApplications } from "@/utils/api";

export const useApplicationsQuery = () => {
  return useQuery({
    queryKey: ["admin", "applications"],
    queryFn: () => getApplications(),
  });
};
