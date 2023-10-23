import { useState } from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { ChevronDown, ChevronUp, ExternalLink, Loader2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { getApplicationRoute, getEditJobPostRoute, getJobDetailsRoute } from "@/utils/routes";
import { deleteJob } from "@/utils/api";
import { type JobWithId } from "@/utils/schema";
import { queryClient } from "@/app/components/query-client";

export const sortIcons = {
  asc: <ChevronDown className="h-4 w-4" />,
  desc: <ChevronUp className="h-4 w-4" />,
};

export const columns: ColumnDef<Omit<JobWithId, "description">>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      const sortedBy = column.getIsSorted();
      return (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(sortedBy === "asc")}
        >
          Created At
          {sortedBy ? sortIcons[sortedBy] : <div className="w-4 h-4" />}
        </button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">
        {new Date(row.getValue("createdAt") as string).toLocaleString("en-us")}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      const sortedBy = column.getIsSorted();
      return (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          {sortedBy ? sortIcons[sortedBy] : <div className="w-4 h-4" />}
        </button>
      );
    },
    cell: ({ row }) => (
      <Link
        target="_blank"
        className="flex items-center gap-2 capitalize hover:underline"
        href={getJobDetailsRoute(row.original.id)}
      >
        {row.getValue("title")}
        <ExternalLink className="w-3.5" />
      </Link>
    ),
  },
  {
    accessorKey: "shortDescription",
    header: ({ column }) => {
      const sortedBy = column.getIsSorted();
      return (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Experience
          {sortedBy ? sortIcons[sortedBy] : <div className="w-4 h-4" />}
        </button>
      );
    },
    cell: ({ row }) => <div className="max-w-xs truncate">{row.getValue("shortDescription")}</div>,
  },
  {
    accessorKey: "minExperience",
    header: ({ column }) => {
      const sortedBy = column.getIsSorted();
      return (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Experience
          {sortedBy ? sortIcons[sortedBy] : <div className="w-4 h-4" />}
        </button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2 capitalize">
        {row.original.minExperience} - {row.original.maxExperience} Years
      </div>
    ),
  },
  {
    header: "",
    accessorKey: "id",
    cell: ({ row }) => {
      const { id } = row.original;
      const [isLoading, setIsLoading] = useState(false);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              disabled={isLoading}
              className="flex items-center gap-2"
              onClick={async () => {
                setIsLoading(true);

                await deleteJob(id);
                queryClient.refetchQueries({
                  queryKey: ["admin", "jobs"],
                });
                setIsLoading(false);
              }}
            >
              Delete
              {isLoading && <Loader2 className="w-3.5 animate-spin" />}
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href={getEditJobPostRoute(id)}>Edit</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
