import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav>
      <Link href={"/app/splash"}>
        <Image></Image>
        <h1>Nav test</h1>
      </Link>
    </nav>
  );
}
