import Image from "next/image";

export default function Widgets() {
  return (
    <main className="w-full h-screen bg-fixed bg-cover bg-center bg-[url('/img/bg-widgets-cloudy.svg')] flex flex-col items-center">
      {/* Header */}
      <section className="flex flex-col items-center">
        <div className="w-full flex items-center justify-center pt-5 mb-5">
          <Image
            src="/img/skyway-logo-with-text.svg"
            alt="Skyway logo"
            width={200}
            height={100}
            className="size-30"
          />
        </div>

        <div className="w-[80vw] text-center items-center text-black text-sm italic">
          Vælg de widgets du gerne <br /> vil have vist på dashboardet <br />
          Hjertet placerer widget'en øverst
        </div>
      </section>

      {/* Widget Grid */}
      <section className="max-w-100 grid grid-cols-2 gap-5 mt-10 justify-items-center">
        <div className="w-40 h-36 bg-white rounded-2xl p-2">
          <div className="flex justify-between">
            <Image
              src="/img/add-icon.svg"
              alt="favorit-ikon"
              width={50}
              height={50}
            />
            <Image
              src="/img/heart-icon.svg"
              alt="favorit-ikon"
              width={50}
              height={50}
            />
          </div>
        </div>

        <div className="w-40 h-36 bg-white rounded-2xl p-2">
          <div className="flex justify-between">
            <Image
              src="/img/add-icon.svg"
              alt="favorit-ikon"
              width={50}
              height={50}
            />
            <Image
              src="/img/heart-icon.svg"
              alt="favorit-ikon"
              width={50}
              height={50}
            />
          </div>
        </div>

        <div className="w-full h-36 bg-white rounded-2xl col-span-2 p-2">
          <div className="flex justify-between">
            <Image
              src="/img/add-icon.svg"
              alt="favorit-ikon"
              width={50}
              height={50}
            />
            <Image
              src="/img/heart-icon.svg"
              alt="favorit-ikon"
              width={50}
              height={50}
            />
          </div>
        </div>

        <div className="w-40 h-36 bg-white rounded-2xl p-2">
          <div className="flex justify-between">
            <Image
              src="/img/add-icon.svg"
              alt="favorit-ikon"
              width={50}
              height={50}
            />
            <Image
              src="/img/heart-icon.svg"
              alt="favorit-ikon"
              width={50}
              height={50}
            />
          </div>
        </div>

        <div className="w-40 h-36 bg-white rounded-2xl p-2">
          <div className="flex justify-between">
            <Image
              src="/img/add-icon.svg"
              alt="favorit-ikon"
              width={50}
              height={50}
            />
            <Image
              src="/img/heart-icon.svg"
              alt="favorit-ikon"
              width={50}
              height={50}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
