"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function NavSecondary() {
  const router = useRouter();

  return (
    <nav className="flex flex-row w-100 justify-between px-5">
      <Link href="/widgets">
        <Image
          src="/img/widgets-icon.svg"
          alt="Widget"
          width={50}
          height={50}
          className="drop-shadow-lg"
        />
      </Link>

      <Link href="/menu">
        <Image
          src="/img/burger-menu-icon.svg"
          alt="Widget"
          width={50}
          height={50}
          className="drop-shadow-lg"
        />
      </Link>
    </nav>
  );
}
