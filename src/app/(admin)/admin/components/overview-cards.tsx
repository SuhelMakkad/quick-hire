"use client";

import { CreditCard, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOverviewQuery } from "./use-overview-query";
import { Skeleton } from "@/components/ui/skeleton";

export type OverviewSectionProps = {};

const OverviewSection = ({}: OverviewSectionProps) => {
  const { data, isLoading } = useOverviewQuery();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <LoadingCard />
        <LoadingCard />
      </div>
    );
  }

  if (!data) {
    return;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Posted Job</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl md:text-2xl font-medium">{data.totalJobs}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Application</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl md:text-2xl font-medium">{data.totalApplication}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewSection;

export const LoadingCard = () => {
  return (
    <div className="h-28 w-full p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
      <Skeleton className="h-3.5 w-24" />
      <Skeleton className="h-7 w-5 mt-4" />
    </div>
  );
};
