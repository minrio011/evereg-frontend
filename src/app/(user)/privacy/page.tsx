'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function PrivacyPage() {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/*Blurred Background Layer*/}
            <div className="absolute inset-0 z-0" aria-hidden="true">
                <Image
                    src="/images/bg.webp" 
                    alt="Maybelline Boba Boost Blurred BG"
                    fill
                    className="object-cover blur-3xl opacity-100 scale-110"
                />
            </div>
            {/*Content*/}
            <div className="relative z-10 h-screen max-h-screen aspect-[9/16] flex flex-col">
                {/*bg*/}
                <div className="absolute inset-0 -z-10" aria-hidden="true">
                    <Image
                        src="/images/p2_bg.webp" 
                        alt="Maybelline Boba Boost"
                        fill
                        priority
                        className="object-contain object-top"
                    />
                </div>

                {/*checkbox*/}
                <div
                    role="checkbox"
                    aria-checked={isChecked}
                    aria-label="Agree to terms and conditions"
                    tabIndex={0}
                    className="absolute top-[58.92%] left-[29.12%] w-[5%] aspect-square cursor-pointer flex items-center justify-center"
                    onClick={() => setIsChecked(!isChecked)}
                    onKeyDown={(e) => e.key === " " && setIsChecked(!isChecked)}
                >
                    <div
                        className={[
                            "w-[85%] h-[85%] rounded-sm bg-black",
                            "transition-all duration-200",
                            isChecked ? "opacity-100 scale-100" : "opacity-0 scale-50",
                        ].join(" ")}
                    />
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/*accept button*/}
                <div className="flex justify-center pb-[24%] px-[26%]">
                    {isChecked ? (
                        <Link
                            href="/selection"
                            className={[
                                "block w-full",
                                "transition-transform duration-150 ease-out",
                                "hover:scale-105 active:scale-95",
                            ].join(" ")}
                        >
                            <Image
                                src="/images/btn_accept.webp"
                                alt="ยอมรับและดำเนินการต่อ"
                                width={232.69}
                                height={63.68}
                                className="w-full h-auto"
                            />
                        </Link>
                    ) : (
                        <div
                            aria-disabled="true"
                            className="block w-full opacity-40 cursor-not-allowed"
                        >
                            <Image
                                src="/images/btn_accept.webp"
                                alt="ยอมรับและดำเนินการต่อ"
                                width={232.69}
                                height={63.68}
                                className="w-full h-auto"
                            />
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}