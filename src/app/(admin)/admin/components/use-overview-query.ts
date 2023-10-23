"use client";

import { getOverview } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const useOverviewQuery = () => {
  return useQuery({
    queryKey: ["admin", "overview"],
    queryFn: () => getOverview(),
  });
};
