"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/onboarding");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-between py-5 min-h-screen bg-[url('/img/splash-background.svg')]">
      <div className="w-1/2 flex relative mt-60">
        <Image
          src="/img/skyway-logo-with-text.svg"
          alt="Skyway splashscreen"
          width={400}
          height={100}
        />
      </div>

      <div className="">
        <p className="text-black font-bold">®SkyWay 2025</p>
      </div>
    </main>
  );
}
