"use client";

import { BarChart2, CheckCircle2, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOverviewQuery } from "./use-overview-query";
import { Skeleton } from "@/components/ui/skeleton";

export type OverviewSectionProps = {};

const OverviewSection = ({}: OverviewSectionProps) => {
  const { data, isLoading } = useOverviewQuery();

  if (isLoading) {
    return (
      <div className="flex lg:grid gap-4 grid-cols-4 overflow-auto hide-scroll">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    );
  }

  if (!data) {
    return;
  }

  const { applications } = data;

  return (
    <div className="flex lg:grid gap-4 grid-cols-4 overflow-auto hide-scroll">
      <Card className="min-w-[16rem]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl md:text-2xl font-medium">{applications.total}</div>
        </CardContent>
      </Card>

      <Card className="min-w-[16rem]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New</CardTitle>
          <BarChart2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl md:text-2xl font-medium">{applications.new}</div>
        </CardContent>
      </Card>

      <Card className="min-w-[16rem]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-xl md:text-2xl font-medium">{applications.shortlisted}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewSection;

export const LoadingCard = () => {
  return (
    <div className="h-28 w-full min-w-[16rem] p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
      <Skeleton className="h-3.5 w-24" />
      <Skeleton className="h-7 w-5 mt-4" />
    </div>
  );
};
