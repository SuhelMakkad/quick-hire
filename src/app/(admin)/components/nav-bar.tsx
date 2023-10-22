import { Logo } from "@/components/nav-bar";
import ThemeToggle from "@/components/theme-toggle";

const Navbar = () => {
  return (
    <nav className="container py-2 md:py-3 flex justify-between items-center">
      <Logo />

      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
