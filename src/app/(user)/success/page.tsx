'use client';
import Link from "next/link";
import Image from "next/image";

export default function SuccessPage() {
    return (
        <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/*Blurred Background Layer*/}
            <div className="absolute inset-0 z-0" aria-hidden="true">
                <Image 
                    src="/images/bg.png" 
                    alt="Maybelline Boba Boost Blurred BG"
                    fill
                    priority
                    className="object-cover blur-3xl opacity-100 scale-110"
                />
            </div>
            {/*Content*/}
            <div className="relative z-10 h-screen max-h-screen aspect-[9/16] flex flex-col">
                {/*bg*/}
                <div className="absolute inset-0 -z-10" aria-hidden="true">
                    <Image
                        src="/images/p5_bg.png" 
                        alt="Maybelline Boba Boost"
                        fill
                        priority
                        className="object-contain object-top"
                    />
                </div>

                {/* Spacer pushes button to bottom zone */}
                <div className="flex-1" />

                {/*home button*/}
                <div className="flex justify-center pb-[19%] px-[26%]">
                    <Link 
                        href="/"
                        className={[
                            "block w-full",
                            "transition-transform duration-150 ease-out",
                            "hover:scale-105 active:scale-95",
                        ].join(" ")}
                    >
                        <Image
                            src="/images/btn_home.png"
                            alt="Home Button"
                            width={232.69}
                            height={63.68}
                            className="w-full h-auto"
                        />
                    </Link>
                </div>
            </div>
        </main>
    );
}