import { buttonVariants } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const ThankYouPage = () => {
  return (
    <main className="container">
      <section className="min-h-[50vh] grid place-content-center text-center">
        <CheckCircle2 className="block mx-auto text-green-500 mb-4" width={82} height={82} />

        <h1 className="md:text-lg font-medium">We have received your application</h1>
        <span className="text-xs md:text-sm">
          If there is a match our team will reach out within a week
        </span>

        <Link href={"/"} className={buttonVariants({ class: "mt-4 w-max mx-auto" })}>
          Explore more roles
        </Link>
      </section>
    </main>
  );
};

export default ThankYouPage;
