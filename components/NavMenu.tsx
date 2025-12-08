"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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

      <Link href="/.">
        <Image
          src="/img/exit-icon-black.svg"
          alt="Widget"
          width={50}
          height={50}
          className="drop-shadow-lg"
          onClick={() => router.back}
        />
      </Link>
    </nav>
  );
}
