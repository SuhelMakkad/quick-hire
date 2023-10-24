import Navbar, { type NavLink } from "@/components/nav-bar";
import { adminRoutes } from "@/utils/routes";

const navLink: NavLink[] = [
  {
    href: adminRoutes.home,
    label: "Jobs",
  },
  {
    href: adminRoutes.applications,
    label: "Applications",
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
