import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { ChevronDown, ChevronUp, Dot, ExternalLink, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { APPLICATION_STATUS, type Application } from "@/utils/schema";
import { getApplicationRoute } from "@/utils/routes";

export const sortIcons = {
  asc: <ChevronDown className="h-4 w-4" />,
  desc: <ChevronUp className="h-4 w-4" />,
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
          email
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
    accessorKey: "resume",
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
      const resume = row.getValue("resume");
      if (!resume) return "Not Found";

      return (
        <Link href={resume} target="_blank" className="flex items-center gap-2 hover:underline">
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
      const { status, id } = row.original;

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
            <DropdownMenuItem onClick={() => {}}>Delete</DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="capitalize">{status}</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="capitalize">
                  {APPLICATION_STATUS.map((s) => (
                    <DropdownMenuItem
                      key={s}
                      className="flex items-center justify-between"
                      onClick={() => {}}
                    >
                      {status} {s === status && <Dot />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
