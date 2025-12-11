import Image from "next/image";

export default function FAQ() {
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans bg-[linear-gradient(to_bottom,white_0%,#C7E4FF_25%,#C7E4FF_75%,white_100%)] ">
      <main className="drop-shadow-xl">
        <div className="flex flex-col items-center">
          <div className="w-full flex items-center justify-center pt-5 mb-5">
            <Image
              src="/img/skyway-logo-with-text.svg"
              alt="Skyway logo"
              width={200}
              height={100}
              className="size-20"
            />
          </div>

          <h1 className="text-center text-black text-4xl font-bold mb-5">
            FAQ
          </h1>

          <h1 className="text-center text-black text-md italic">
            Få svar på dine spørgsmål her!
          </h1>
        </div>

        <div className="mt-10 max-w-80">
          <h1 className="text-left text-black text-xl font-bold">
            Hvordan ændrer jeg rækkefølgen på dashboardet?
          </h1>

          <div className="bg-white w-80 h-26 rounded-2xl flex flex-col items-center justify-center mt-2">
            <h1 className="text-black text-left text-lg mt-4 max-w-65">
              Omplacer Widget lorem ipsum text is simply dummy text
            </h1>

            <Image
              className="mt-[-10]"
              src="/UiIcons/MoveDown.png"
              alt="Next.js logo"
              width={50}
              height={20}
              priority
            />
          </div>

          <h1 className="text-left text-black text-xl font-bold mt-7">
            Hvordan bruger i data?
          </h1>

          <div className="bg-white w-80 h-26 rounded-2xl flex flex-col items-center justify-center mt-2">
            <h1 className="text-black text-left text-lg mt-4 max-w-65">
              Omplacer Widget lorem ipsum text is simply dummy text
            </h1>

            <Image
              className="mt-[-10]"
              src="/UiIcons/MoveDown.png"
              alt="Next.js logo"
              width={50}
              height={20}
              priority
            />
          </div>

          <h1 className="text-left text-black text-xl font-bold mt-7">
            Hvordan kan jeg give feedback?
          </h1>

          <div className="bg-white w-80 h-26 rounded-2xl flex flex-col items-center justify-center mt-2">
            <h1 className="text-black text-left text-lg mt-4 max-w-65">
              Omplacer Widget lorem ipsum text is simply dummy text
            </h1>

            <Image
              className="mt-[-10]"
              src="/UiIcons/MoveDown.png"
              alt="Next.js logo"
              width={50}
              height={20}
              priority
            />
          </div>
        </div>
      </main>

      <div className="fixed bottom-[-120px] left-[-130px] w-[400px] h-[400px] pointer-events-none">
        <Image
          src="/WeatherTransIcons/CloudyDay.png"
          alt="Cloudy"
          width={400}
          height={400}
          className="w-[400px] h-[400px]"
          priority
        />
      </div>
    </div>
  );
}
