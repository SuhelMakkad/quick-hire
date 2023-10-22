import Link from "next/link";
import Chip from "@/components/ui/chip";

import { getJobDetailsRoute } from "@/utils/routes";
import { formateCurrency, formateDate } from "@/utils/index";
import { SewingPinIcon } from "@radix-ui/react-icons";
import type { JobWithId } from "@/utils/schema";

export type CardProps = {
  job: Omit<JobWithId, "description">;
};

const Card = ({ job }: CardProps) => {
  const locations = job.locations?.map((l) => l.label).join(", ");

  return (
    <Link href={getJobDetailsRoute(job.id)}>
      <article className="md:text-base text-sm border shadow-sm px-3.5 py-3 hover:shadow transition-shadow bg-card rounded-md">
        <div className="flex items-center justify-between">
          <span className="font-medium">{job.title}</span>
          <span className="text-xs md:text-sm">{formateDate(job.createdAt)}</span>
        </div>

        <div className="flex items-center md:gap-2 gap-1.5 text-xs md:text-sm mt-1">
          <span>
            $ {formateCurrency(job.minSalary)} - {formateCurrency(job.maxSalary)}
          </span>
          {!!locations && (
            <div className="flex items-center gap-0.5 capitalize">
              <SewingPinIcon />
              <span>{locations}</span>
            </div>
          )}
        </div>

        <ul className="flex items-center gap-2 text-xs capitalize mt-3 md:mt-2.5">
          {job.categories.map((category) => (
            <li key={category.label}>
              <Chip>{category.label}</Chip>
            </li>
          ))}
        </ul>

        <p className="mt-4 line-clamp-3 md:line-clamp-2">{job.shortDescription}</p>
      </article>
    </Link>
  );
};

export default Card;
