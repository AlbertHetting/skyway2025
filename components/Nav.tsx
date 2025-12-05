import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="flex flex-row justify-evenly gap-10 mb-2 fixed ">
      <Link href={"/app/widgets"}>
        <Image
          src="/UiIcons/WidgetAdd.png"
          alt="Skyway logo"
          width={400}
          height={100}
          className="size-20 drop-shadow-lg"
        />
      </Link>
      <Link href={"/app/widgets"}>
        <Image
          src="/UiIcons/WidgetAdd.png"
          alt="Skyway logo"
          width={400}
          height={100}
          className="size-20 drop-shadow-lg"
        />
      </Link>
      <Link href={"/app/widgets"}>
        <Image
          src="/UiIcons/WidgetAdd.png"
          alt="Skyway logo"
          width={400}
          height={100}
          className="size-20 drop-shadow-lg"
        />
      </Link>
    </nav>
  );
}
