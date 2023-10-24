import { useState } from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { queryClient } from "@/app/components/query-client";
import { ChevronDown, ChevronUp, ExternalLink, Loader2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { getApplicationRoute, getResumeServerPath } from "@/utils/routes";
import { deleteApplication } from "@/utils/api";
import { type Application } from "@/utils/schema";

export const sortIcons = {
  desc: <ChevronDown className="h-4 w-4" />,
  asc: <ChevronUp className="h-4 w-4" />,
};

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "timestamp",
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
        {new Date(row.getValue("timestamp") as string).toLocaleString("en-us")}
      </div>
    ),
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      const sortedBy = column.getIsSorted();
      return (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          {sortedBy ? sortIcons[sortedBy] : <div className="w-4 h-4" />}
        </button>
      );
    },
    cell: ({ row }) => (
      <Link className="capitalize hover:underline" href={getApplicationRoute(row.original.id)}>
        {row.getValue("firstName")}
      </Link>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      const sortedBy = column.getIsSorted();
      return (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          {sortedBy ? sortIcons[sortedBy] : <div className="w-4 h-4" />}
        </button>
      );
    },
    cell: ({ row }) => (
      <Link className="hover:underline lowercase" href={getApplicationRoute(row.original.id)}>
        {row.getValue("email")}
      </Link>
    ),
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      const sortedBy = column.getIsSorted();
      return (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Resume
          {sortedBy ? sortIcons[sortedBy] : <div className="w-4 h-4" />}
        </button>
      );
    },
    cell: ({ row }) => {
      return (
        <Link
          href={getResumeServerPath(row.getValue("id"))}
          target="_blank"
          className="flex items-center gap-2 hover:underline"
        >
          Resume
          <ExternalLink className="w-3.5" />
        </Link>
      );
    },
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
                await Promise.allSettled([
                  deleteApplication(id),
                  queryClient.refetchQueries(),
                ]);
                setIsLoading(false);
              }}
            >
              Delete
              {isLoading && <Loader2 className="w-3.5 animate-spin" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
