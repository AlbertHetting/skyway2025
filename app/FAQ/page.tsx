import Image from "next/image";

export default function FAQ() {
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans bg-[linear-gradient(to_bottom,white_0%,#C7E4FF_25%,#C7E4FF_75%,white_100%)]">
      <main className="drop-shadow-xl" aria-labelledby="faq-title">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="w-full flex items-center justify-center pt-5 mb-5">
            <Image
              src="/img/skyway-logo-with-text.svg"
              alt="Skyway logo"
              width={200}
              height={100}
            />
          </div>

          {/* Page title */}
          <h1
            id="faq-title"
            className="text-center text-black text-4xl font-bold mb-5"
          >
            FAQ
          </h1>

          <div className="text-center text-black text-md italic">
            Få svar på dine spørgsmål her!
          </div>
        </div>

        <div className="mt-10 max-w-80">
          {/* FAQ Item 1 */}
          <section role="region" aria-labelledby="faq-q1">
            <h2 id="faq-q1" className="text-left text-black text-xl font-bold">
              Hvordan ændrer jeg rækkefølgen på dashboardet?
            </h2>

            <div className="bg-white w-80 h-26 rounded-2xl flex flex-col items-center justify-center mt-2">
              <div className="text-black text-left text-lg mt-4 max-w-65">
                Omplacer Widget lorem ipsum text is simply dummy text
              </div>

              <Image
                className="mt-[-10]"
                src="/UiIcons/MoveDown.png"
                alt="Flyt widget ned"
                width={50}
                height={20}
              />
            </div>
          </section>

          {/* FAQ Item 2 */}
          <section role="region" aria-labelledby="faq-q2" className="mt-7">
            <h2 id="faq-q2" className="text-left text-black text-xl font-bold">
              Hvordan bruger I data?
            </h2>

            <div className="bg-white w-80 h-26 rounded-2xl flex flex-col items-center justify-center mt-2">
              <div className="text-black text-left text-lg mt-4 max-w-65">
                Omplacer Widget lorem ipsum text is simply dummy text
              </div>

              <Image
                className="mt-[-10]"
                src="/UiIcons/MoveDown.png"
                alt="Illustration af data brug"
                width={50}
                height={20}
              />
            </div>
          </section>

          {/* FAQ Item 3 */}
          <section role="region" aria-labelledby="faq-q3" className="mt-7">
            <h2 id="faq-q3" className="text-left text-black text-xl font-bold">
              Hvordan kan jeg give feedback?
            </h2>

            <div className="bg-white w-80 h-26 rounded-2xl flex flex-col items-center justify-center mt-2">
              <div className="text-black text-left text-lg mt-4 max-w-65">
                Omplacer Widget lorem ipsum text is simply dummy text
              </div>

              <Image
                className="mt-[-10]"
                src="/UiIcons/MoveDown.png"
                alt="Send feedback ikon"
                width={50}
                height={20}
              />
            </div>
          </section>
        </div>
      </main>

      {/* Decorative background image */}
      <div className="fixed bottom-[-120px] left-[-130px] w-[400px] h-[400px] pointer-events-none">
        <Image
          src="/WeatherTransIcons/CloudyDay.png"
          alt=""
          aria-hidden="true"
          width={400}
          height={400}
          className="w-[400px] h-[400px]"
        />
      </div>
    </div>
  );
}
