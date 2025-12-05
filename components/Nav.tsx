import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="flex flex-row justify-center gap-20">
      <Link href="/app/widgets">
        <Image
          src="/img/widgets-icon.svg"
          alt="Widget"
          width={50}
          height={50}
          className="drop-shadow-lg"
        />
      </Link>

      <Link href="/app/menu">
        <Image
          src="/img/move-widget-icon.svg"
          alt="Widget"
          width={50}
          height={50}
          className="drop-shadow-lg"
        />
      </Link>

      <Link href="/app/menu">
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
