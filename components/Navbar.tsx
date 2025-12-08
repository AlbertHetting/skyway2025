"use client";

import NavDash from "@/components/NavDash";
import NavMenu from "@/components/NavMenu";
import NavSecondary from "@/components/NavSecondary";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  /* Conditions */

  const isDashboard = pathname.startsWith("/dashboard");
  const isMenu = pathname.startsWith("/menu");
  const isSecondary =
    pathname.startsWith("/FAQ") || pathname.startsWith("/widgets");

  return (
    <>
      {isDashboard && <NavDash />}
      {isMenu && <NavMenu />}
      {!isDashboard && !isMenu && <NavSecondary />}
    </>
  );
}
