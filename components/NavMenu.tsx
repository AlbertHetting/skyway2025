"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function NavMenu() {
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

      <Image
        src="/img/exit-icon-black.svg"
        alt="Exit"
        width={50}
        height={50}
        className="drop-shadow-lg"
        onClick={() => router.back()}
      />
    </nav>
  );
}
