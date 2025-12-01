import { getNavbarData } from "@/lib/navbar-data";
import { NavbarClient } from "./navbar-client";

// Server component wrapper that fetches navbar data from Sanity
// and passes it into the client Navbar implementation.
export default async function Navbar() {
  const navbarData = await getNavbarData();

  return <NavbarClient data={navbarData} />;
}

 