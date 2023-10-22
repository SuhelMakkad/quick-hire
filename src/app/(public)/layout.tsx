import Navbar, { type NavLink } from "@/components/nav-bar";
import { routes } from "@/utils/routes";

const navLink: NavLink[] = [
  {
    href: routes.home,
    label: "Browse Jobs",
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar navLinks={navLink} />
      {children}
    </>
  );
}
