import Navbar, { type NavLink } from "@/components/nav-bar";
import { adminRoutes } from "@/utils/routes";

const navLink: NavLink[] = [
  {
    href: adminRoutes.home,
    label: "Applications",
  },
  {
    href: adminRoutes.jobs,
    label: "Jobs",
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
