import Image from "next/image";
import Link from "next/link";

export default function Onboarding() {

    return(


            <div className="flex min-h-screen justify-center bg-zinc-50 font-sans bg-[linear-gradient(to_bottom,_white_0%,_#FFE8C8_25%,_#FFE8C8_75%,_white_100%)] ">


                <main className="drop-shadow-xl">

                <div className="flex flex-col items-center">
                <Image className="mt-5"
                src="/SkywayLogo.png"
                alt="Next.js logo"
                width={70}
                 height={20}
                 priority
                />

                <h1 className="text-center text-black text-xl "> 
                    SkyWay
                </h1>

                </div>


                    <div className="flex flex-row mt-20 items-center">

                 <Image
                    src="/UiIcons/Menu.png"
                    alt=""
                     width={120}
                     height={20}
                     priority
                    />

                        <div className="bg-white w-58 h-18 rounded-2xl flex flex-col items-center justify-center">
                            <h1 className="text-black text-center text-xl font-bold" >Menu</h1>
                            <h1 className="text-black text-center text-xl font-bold" >(med mere info)</h1>
                        </div>

                    </div>

                
                <div className="flex flex-row mt-0 items-center">

                 <Image
                    src="/UiIcons/Movewidget.png"
                    alt=""
                     width={120}
                     height={20}
                     priority
                    />

                        <div className="bg-white w-60 h-18 rounded-2xl flex flex-col items-center justify-center">
                            <h1 className="text-black text-center text-xl font-bold " >Omplacer Widget-</h1>
                            <h1 className="text-black text-center text-xl font-bold" >visning på dashboard</h1>
                        </div>

                    </div>



                <div className="flex flex-row mt-0 items-center">

                 <Image
                    src="/UiIcons/Favorite2.png"
                    alt=""
                     width={120}
                     height={20}
                     priority
                    />

                        <div className="bg-white w-60 h-18 rounded-2xl flex flex-col items-center justify-center">
                            <h1 className="text-black text-center text-lg font-bold " >Din favorit widget bliver</h1>
                            <h1 className="text-black text-center text-md font-bold" >vist øverst på dit dashboard</h1>
                        </div>

                    </div>





                 <div className="flex flex-row mt-0 items-center">

                 <Image
                    src="/UiIcons/WidgetAdd.png"
                    alt=""
                     width={120}
                     height={20}
                     priority
                    />

                        <div className="bg-white w-60 h-18 rounded-2xl flex flex-col items-center justify-center">
                            <h1 className="text-black text-center text-xl font-bold " >Importér</h1>
                            <h1 className="text-black text-center text-xl font-bold" >Widgets</h1>
                        </div>

                    </div>

                        <h2 className="text-black text-xl italic text-center">Tilpas Appen så meget <br></br> som du vil! </h2>



                        <div className="flex mt-10 justify-center">
                        <Link href="/dashboard" className="bg-black w-45 h-13 rounded-2xl flex items-center justify-center">
                            <h1 className="text-white text-center text-xl font-bold "> Forstået </h1>
                        </Link>
                        </div>

                </main>

            </div>
    )

}