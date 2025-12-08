import Image from "next/image";

export default function Dashboard() {
    return(
        <div className="flex min-h-screen justify-center bg-zinc-50 font-sans bg-[linear-gradient(to_bottom,_white_0%,_#FFE8C8_25%,_#FFE8C8_75%,_white_100%)]">
            <main>


                <div className="flex flex-col items-center">
                <Image className="mt-5"
                src="/SkywayLogo.png"
                alt="Next.js logo"
                width={70}
                 height={20}
                 priority
                />

                <h1 className="text-center text-black text-base "> 
                    SkyWay
                </h1>

                </div>



                <div className="text-black flex flex-col  justify-center text-center mt-3" >

                    <h1 className="text-xl">LOCATION</h1>
                    <h2 className="font-bold text-4xl">TEMP</h2>
                    <h3>DATE</h3>

                </div>


                <div className="flex flex-row justify-center">
                <Image className="mt-[-40]"
                src="/WeatherTransIcons/Sunny.png"
                alt="Next.js logo"
                width={285}
                 height={20}
                 priority
                />
                </div>




                <div className="flex flex-row mt-[-50]">

                    <div className="flex flex-col items-center justify-center text-center">
                        <h1 className="text-black font-bold">now</h1>

                        <Image className="mt-[-10]"
                            src="/WeatherTransIcons/CloudyDay.png"
                            alt="Cloudy"
                            width={50}
                            height={50}
                            priority
                        />

                        <h1 className="text-black font-bold mt-[-10]">
                            10<span>&#176;</span>
                        </h1>
                    </div>



                    <div className="flex flex-col items-center justify-center text-center">
                        <h1 className="text-black font-bold">12</h1>

                        <Image className="mt-[-10]"
                            src="/WeatherTransIcons/CloudyDay.png"
                            alt="Cloudy"
                            width={50}
                            height={50}
                            priority
                        />

                        <h1 className="text-black font-bold mt-[-10]">
                            11<span>&#176;</span>
                        </h1>
                    </div>


                    <div className="flex flex-col items-center justify-center text-center">
                        <h1 className="text-black font-bold">13</h1>

                        <Image className="mt-[-10]"
                            src="/WeatherTransIcons/Cloudy.png"
                            alt="Cloudy"
                            width={50}
                            height={50}
                            priority
                        />

                        <h1 className="text-black font-bold mt-[-10]">
                            13<span>&#176;</span>
                        </h1>
                    </div>


                                        <div className="flex flex-col items-center justify-center text-center">
                        <h1 className="text-black font-bold">14</h1>

                        <Image className="mt-[-10]"
                            src="/WeatherTransIcons/HeavyRain.png"
                            alt="Cloudy"
                            width={50}
                            height={50}
                            priority
                        />

                        <h1 className="text-black font-bold mt-[-10]">
                            13<span>&#176;</span>
                        </h1>
                    </div>


                                        <div className="flex flex-col items-center justify-center text-center">
                        <h1 className="text-black font-bold">15</h1>

                        <Image className="mt-[-10]"
                            src="/WeatherTransIcons/Thunder.png"
                            alt="Cloudy"
                            width={50}
                            height={50}
                            priority
                        />

                        <h1 className="text-black font-bold mt-[-10]">
                            13<span>&#176;</span>
                        </h1>
                    </div>


                                        <div className="flex flex-col items-center justify-center text-center">
                        <h1 className="text-black font-bold">16</h1>

                        <Image className="mt-[-10]"
                            src="/WeatherTransIcons/Rain.png"
                            alt="Cloudy"
                            width={50}
                            height={50}
                            priority
                        />

                        <h1 className="text-black font-bold mt-[-10]">
                            8<span>&#176;</span>
                        </h1>
                    </div>




                                                            <div className="flex flex-col items-center justify-center text-center">
                        <h1 className="text-black font-bold">16:23</h1>

                        <Image className="mt-[-10]"
                            src="/WeatherTransIcons/Sunset.png"
                            alt="Cloudy"
                            width={50}
                            height={50}
                            priority
                        />

                        <h1 className="text-black font-bold mt-[-10]">
                            8<span>&#176;</span>
                        </h1>
                    </div>

                </div>


                <div className="flex flex-row justify-center gap-5 mt-5 drop-shadow-xl">

                        <div className="w-40 h-40 bg-white rounded-3xl ">

                        </div>

                        <div className="w-40 h-40 bg-white rounded-3xl ">

                        </div>


                </div>

                <div className="flex flex-row justify-center drop-shadow-xl">
                <div className=" w-85 h-40 bg-white rounded-3xl mt-5"></div>
                </div>


            </main>
        </div>
    )
}