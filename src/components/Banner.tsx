
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
    
    const today = new Date();

    const banglaDate = new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
    }).format(today);

    return (
        <section className="w-full bg-white py-6 sm:py-8 lg:py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

               
                <div className="relative overflow-hidden rounded-3xl bg-[#F7F7F3] px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:min-h-75 lg:px-12 lg:py-14">

                    <div className="flex flex-col items-center justify-between gap-8 md:flex-row">

                       
                        <div className="w-full md:w-[58%] lg:w-[60%]">

                            <div className="mb-4 inline-flex flex-col rounded-full bg-base-300 px-4 py-2">



                                <p className="mt-0.5 text-[11px] font-medium text-green-700 sm:text-xs">
                                    {banglaDate}
                                   
                                </p>

                            </div>

                            
                            <h1 className="max-w-2xl text-3xl font-bold leading-[1.15] tracking-tight text-[#202020] sm:text-4xl md:text-[42px] lg:text-[48px]">
                                আজকের বাজারের দাম এক নজরে
                            </h1>

                          
                            <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
                                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                            </p>

                            
                            <div className="mt-6">
                                <Link
                                    href="#সব-পণ্য"
                                    className="inline-flex items-center justify-center rounded-lg bg-[#05893E] px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-[#2fa56b] sm:px-6"
                                >
                                    সব পণ্য দেখুন

                                </Link>
                            </div>

                        </div>

                        
                        <div className="flex w-full items-center justify-center md:w-[42%] lg:w-[40%]">

                            <div className="relative h-45 w-55 sm:h-52 sm:w-67 md:h-55 md:w-72 lg:h-60 lg:w-[320px]">

                                <Image
                                    src="/bazar-hero.png"
                                    alt="বাজারের পণ্য"
                                    fill
                                    priority
                                    className="object-contain"
                                />

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;