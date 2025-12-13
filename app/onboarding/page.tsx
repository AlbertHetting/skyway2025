import Image from "next/image";
import Link from "next/link";

export default function Onboarding() {
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans bg-[linear-gradient(to_bottom,white_0%,#FFE8C8_25%,#FFE8C8_75%,white_100%)]">
      <main className="drop-shadow-xl">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <Image
            className="mt-5"
            src="/SkywayLogo.png"
            alt="SkyWay logo"
            width={70}
            height={20}
            priority
          />
          <h1 className="text-center text-black text-xl">SkyWay</h1>
        </div>

        {/* Instruction Blocks */}
        <div className="flex flex-col mt-20 gap-5">
          {/* Menu Instruction */}
          <div
            role="region" // ♿ accessibility
            aria-label="Menu oversigt og information" // ♿ accessibility
            className="flex flex-row items-center"
          >
            <Image
              src="/UiIcons/Menu.png"
              alt="Menu ikon" // ♿ accessibility
              width={120}
              height={20}
              priority
            />
            <div className="bg-white w-58 h-18 rounded-2xl flex flex-col items-center justify-center">
              <h2 className="text-black text-center text-xl font-bold">Menu</h2>
              <h3 className="text-black text-center text-xl font-bold">
                (med mere info)
              </h3>
            </div>
          </div>

          {/* Move Widget Instruction */}
          <div
            role="region"
            aria-label="Omplacering af widget på dashboard"
            className="flex flex-row items-center"
          >
            <Image
              src="/UiIcons/Movewidget.png"
              alt="Flyt widget ikon"
              width={120}
              height={20}
              priority
            />
            <div className="bg-white w-60 h-18 rounded-2xl flex flex-col items-center justify-center">
              <h2 className="text-black text-center text-xl font-bold">
                Omplacer Widget-
              </h2>
              <h3 className="text-black text-center text-xl font-bold">
                visning på dashboard
              </h3>
            </div>
          </div>

          {/* Favorite Widget Instruction */}
          <div
            role="region"
            aria-label="Favorit widget vises øverst på dashboard"
            className="flex flex-row items-center"
          >
            <Image
              src="/UiIcons/Favorite2.png"
              alt="Favorit widget ikon"
              width={120}
              height={20}
              priority
            />
            <div className="bg-white w-60 h-18 rounded-2xl flex flex-col items-center justify-center">
              <h2 className="text-black text-center text-lg font-bold">
                Din favorit widget bliver
              </h2>
              <h3 className="text-black text-center text-md font-bold">
                vist øverst på dit dashboard
              </h3>
            </div>
          </div>

          {/* Import Widgets Instruction */}
          <div
            role="region"
            aria-label="Importér widgets til appen"
            className="flex flex-row items-center"
          >
            <Image
              src="/UiIcons/WidgetAdd.png"
              alt="Importér widget ikon"
              width={120}
              height={20}
              priority
            />
            <div className="bg-white w-60 h-18 rounded-2xl flex flex-col items-center justify-center">
              <h2 className="text-black text-center text-xl font-bold">
                Importér
              </h2>
              <h3 className="text-black text-center text-xl font-bold">
                Widgets
              </h3>
            </div>
          </div>
        </div>

        <h2 className="text-black text-xl italic text-center mt-10">
          Tilpas Appen så meget <br /> som du vil!
        </h2>

        {/* CTA */}
        <div className="flex mt-10 justify-center">
          <Link
            href="/dashboard"
            className="bg-black w-45 h-13 rounded-2xl flex items-center justify-center"
          >
            <h2 className="text-white text-center text-xl font-bold">
              Forstået
            </h2>
          </Link>
        </div>
      </main>
    </div>
  );
}
