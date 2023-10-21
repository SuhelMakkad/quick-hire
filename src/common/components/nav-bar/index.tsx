import Link from "next/link";
import { Zap } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

const Navbar = () => {
  return (
    <nav className="container py-2 md:py-3 flex justify-between items-center">
      <Link href={"/"} className="flex items-center gap-1 md:gap-1.5 w-max">
        <Zap className="w-4 md:w-5" strokeWidth={1.25} />
        <span className="md:text-lg">Quick Hire</span>
      </Link>

      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
