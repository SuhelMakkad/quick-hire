import Link from "next/link";
import { Zap } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="container py-2 md:py-3">
      <Link href={"/"} className="flex items-center gap-1 md:gap-1.5 w-max">
        <Zap className="w-4 md:w-5" />
        <span className="md:text-lg">Quick Hire</span>
      </Link>
    </nav>
  );
};

export default Navbar;
