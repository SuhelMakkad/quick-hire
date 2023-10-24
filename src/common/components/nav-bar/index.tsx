"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Zap } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import { cn } from "@/utils/ui";

export type NavLink = {
  href: string;
  label: string;
};

export type NavbarProps = {
  navLinks?: NavLink[];
};

const Navbar = ({ navLinks }: NavbarProps) => {
  const path = usePathname();

  return (
    <nav className="z-10 container py-2 md:py-3 flex justify-between items-center sticky top-0 bg-background/50 backdrop-blur">
      <Logo />

      <div className="flex items-center gap-4">
        {navLinks && navLinks.length > 0 && (
          <div className="flex items-center md:gap-4 gap-2 text-xs md:text-sm">
            {navLinks.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className={cn(link.href === path && "font-medium")}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;

export const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-1 md:gap-1.5 w-max">
      <Zap className="w-4 md:w-5" strokeWidth={1.25} />
      <span className="md:text-lg">Quick Hire</span>
    </Link>
  );
};
