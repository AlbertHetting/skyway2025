import Image from "next/image";
import Link from "next/link";

export default function Menu() {
  return (
    <main className="w-full h-screen mb-20 bg-fixed bg-fixred bg-center text-[#4D4D4D] bg-[url('/img/sunny-bg-with-sunicon.svg')]">
      {/* logo */}
      <div className="w-full flex items-center justify-center pt-5 mb-5">
        <Image
          src="/img/skyway-logo-with-text.svg"
          alt="Skyway logo"
          width={200}
          height={100}
          className="size-20"
        />
      </div>

      <h1 className="text-center text-black text-4xl font-bold">Menu</h1>

      {/* menu */}
      <section className="grid grid-cols-1 gap-5 mt-45 justify-items-center">
        <Link
          href="/FAQ#databehandling"
          className="w-80 h-36 bg-white/95 rounded-2xl flex items-center justify-center drop-shadow-lg"
        >
          <p className="font-semibold text-3xl">Databehandling</p>
        </Link>

        <Link
          href="/FAQ#feedback"
          className="w-80 h-36 bg-white/95 rounded-2xl flex items-center justify-center drop-shadow-lg"
        >
          <p className="font-semibold text-3xl">Giv feedback</p>
        </Link>

        <Link
          href="/FAQ"
          className="w-80 h-36 bg-white/95 rounded-2xl flex items-center justify-center drop-shadow-lg"
        >
          <p className="font-semibold text-3xl">FAQ</p>
        </Link>
      </section>
    </main>
  );
}
