import Image from "next/image";
import Link from "next/link";

export default function Menu() {
  return (
    <main className="justify-items-center w-full min-h-screen bg-cover bg-center bg-[url('/img/sunny-bg-with-sunicon.svg')]">
      <div className="w-1/2 flex items-center justify-center mt-5 mx-auto">
        <Image
          src="/img/skyway-logo-with-text.svg"
          alt="Skyway logo"
          width={400}
          height={100}
          className="size-20"
        />
      </div>

      <section className="grid grid-cols-1 gap-5 mt-50">
        <Link
          href={"/app/FAQ#databehandling"}
          className="w-80 h-36 bg-white/95 rounded-2xl flex items-center justify-center drop-shadow-lg"
        >
          <p className="font-semibold text-3xl">Databehandling</p>
        </Link>
        <Link
          href={"/app/FAQ#feedback"}
          className="w-80 h-36 bg-white/95 rounded-2xl flex items-center justify-center drop-shadow-lg"
        >
          <p className="font-semibold text-3xl">Giv feedback</p>
        </Link>
        <Link
          href={"/app/FAQ"}
          className="w-80 h-36 bg-white/95 rounded-2xl flex items-center justify-center drop-shadow-lg"
        >
          <p className="font-semibold text-3xl">FAQ</p>
        </Link>
      </section>
    </main>
  );
}
