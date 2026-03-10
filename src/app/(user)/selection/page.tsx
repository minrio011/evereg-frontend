'use client';
import { useRouter } from "next/navigation";
import Image from "next/image";

const BUTTONS = [
    { id: "1", src: "/images/btn_winny_satang.png",    alt: "Winny-Satang", width: 170, height: 231 },
    { id: "2", src: "/images/btn_almond_progress.png", alt: "Almond-Progress", width: 199, height: 231 },
    { id: "3", src: "/images/btn_daou.png",            alt: "Daou", width: 170, height: 231 },
];

export default function SelectionPage() {
    const router = useRouter();

    const handleSelect = (id: string) => {
        router.push(`/register?event=${id}`);
    };
    return (
        <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/*Blurred Background Layer*/}
            <div className="absolute inset-0 z-0" aria-hidden="true">
                <Image 
                    src="/images/bg.png" 
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
                        src="/images/p3_bg.png" 
                        alt="Maybelline Boba Boost"
                        fill
                        priority
                        className="object-contain object-top"
                    />
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/*Selection*/}
                <div className="flex flex-wrap justify-center w-full gap-y-[1.05vh] gap-x-[1.82%] pb-[21.33vh]">
                    {BUTTONS.map((btn) => (
                        <button
                            key={btn.id}
                            onClick={() => handleSelect(btn.id)}
                            aria-label={`เลือก ${btn.alt}`}
                            className="transition-transform duration-200 ease-out hover:scale-105 active:scale-95"
                        >
                            <Image 
                                src={btn.src} 
                                alt={btn.alt}
                                width={btn.width}
                                height={btn.height}
                                className="h-[24.16vh] w-auto object-contain"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </main>
    );
}