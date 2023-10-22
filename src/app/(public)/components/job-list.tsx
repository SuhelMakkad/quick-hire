"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useJobsQuery } from "./use-jobs-query";
import Card, { LoadingCard } from "./card";

const loadingCardArr = new Array(12).fill(0);
const waterLoadingCardArr = new Array(2).fill(0);

const JobList = () => {
  const [loaderEleRef, inView, entry] = useInView({});
  const { data, isLoading, isFetched, fetchNextPage, hasNextPage } = useJobsQuery();

  useEffect(() => {
    fetchNextPage();
  }, [inView]);

  return (
    <div className="space-y-2 md:space-y-3 mb-8">
      <ul className="flex flex-col gap-2 md:gap-3">
        {isLoading &&
          loadingCardArr.map((card, index) => (
            <li key={index}>
              <LoadingCard />
            </li>
          ))}

        {data?.pages.map((page) =>
          page.map((job) => (
            <li key={job.id}>
              <Card job={job} />
            </li>
          ))
        )}
      </ul>

      {hasNextPage ? (
        <ul ref={loaderEleRef} className="flex flex-col gap-2 md:gap-3">
          {waterLoadingCardArr.map((card, index) => (
            <li key={index}>
              <LoadingCard />
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center test-xs md:text-sm py-2 italic">No more job :&lt;</div>
      )}
    </div>
  );
};

export default JobList;
