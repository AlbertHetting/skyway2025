import Image from "next/image";

export default function SplashPage() {
  return (
    <main className="flex flex-col items-center justify-between py-5 min-h-screen bg-[url('/img/splash-background.svg')]">
      <div className="w-1/2 flex relative mt-60">
        <Image
          src="/img/skyway-logo-with-text.svg"
          alt="Skyway logo"
          width={400}
          height={100}
        />
      </div>

      <div className="">
        <p className="font-bold">®SkyWay 2025</p>
      </div>
    </main>
  );
}
