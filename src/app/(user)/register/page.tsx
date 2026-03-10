'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Image from "next/image";
import { submitRegistration } from "@/services/campaign.service";

const INPUT_CLASS = [
    "w-full bg-transparent border-none",
    "px-6 h-[4.7vh]",
    "text-black text-lg",
    "focus:outline-none placeholder:text-black/40",
].join(" ");

function RegisterPageInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const eventId = searchParams.get("event");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });

    const [isChecked, setIsChecked] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const handleNameChange = (field: 'firstName' | 'lastName', value: string) => {
        // Only allow English letters and spaces
        const englishOnly = value.replace(/[^a-zA-Z\s]/g, '');
        setFormData(prev => ({ ...prev, [field]: englishOnly }));
    };

    const handlePhoneChange = (value: string) => {
        // Only allow numbers and limit to 10 digits
        const numbersOnly = value.replace(/[^0-9]/g, '').slice(0, 10);
        setFormData(prev => ({ ...prev, phone: numbersOnly }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isChecked) {
            alert("Please agree to the terms and conditions.");
            return;
        };

        if (isLoading) return;
        
        // Final English-only check
        const englishRegex = /^[a-zA-Z\s]+$/;
        if (!englishRegex.test(formData.firstName) || !englishRegex.test(formData.lastName)) {
            alert("Please use English characters only for your name.");
            return;
        }

        // Phone number length check
        if (formData.phone.length !== 10) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }
        setIsLoading(true);

        const finalData = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone_number: formData.phone,
            event_id: Number(eventId)
        };

        try {
            await submitRegistration(finalData);
            router.push('/success');
        } catch (error) {
            alert("Something went wrong, please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const isDisabled = !isChecked || isLoading;
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
                        src="/images/p4_bg.webp" 
                        alt="Maybelline Boba Boost"
                        fill
                        priority
                        className="object-contain object-top"
                    />
                </div>

                {/*form*/}
                <form onSubmit={handleSubmit} className="relative w-full h-full flex flex-col">
                    {/*form inputs*/}
                    <div className="absolute top-[17.26%] w-[67%] flex flex-col items-center space-y-[19%] left-1/2 -translate-x-1/2">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={(e) => handleNameChange('firstName', e.target.value)}
                            className={INPUT_CLASS}
                            required
                        />

                        <input
                            type="text"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={(e) => handleNameChange('lastName', e.target.value)}
                            className={INPUT_CLASS}
                            required
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={INPUT_CLASS}
                            required
                        />

                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            maxLength={10}
                            className={INPUT_CLASS}
                            required
                        />
                    </div>

                    {/*checkbox*/}
                    <div
                        role="checkbox"
                        aria-checked={isChecked}
                        aria-label="Accept Terms and Conditions"
                        tabIndex={0}
                        onClick={() => setIsChecked(!isChecked)}
                        onKeyDown={(e) => e.key === " " && setIsChecked(!isChecked)}
                        className="absolute top-[71.25%] left-[27.74%] w-[5%] aspect-square cursor-pointer flex items-center justify-center z-30"
                    >
                        <div className={[
                            "w-[85%] h-[85%] rounded-sm bg-black",
                            "transition-all duration-200",
                            isChecked ? "opacity-100 scale-100" : "opacity-0 scale-50",
                        ].join(" ")} />
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/*submit button*/}
                    <div className="flex justify-center pb-[20%] px-[26%]">
                        <button
                            type="submit"
                            disabled={isDisabled}
                            aria-label="ส่งข้อมูลลงทะเบียน"
                            className={[
                                "block w-full focus:outline-none",
                                "transition-transform duration-150 ease-out",
                                isDisabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:scale-105 active:scale-95 cursor-pointer",
                            ].join(" ")}
                        >
                            {isLoading ? (
                                <div className="loading-spinner loading-spinner-inline" aria-label="Submitting registration" aria-busy="true" aria-live="polite">Loading...</div>
                            ) : (
                                <Image
                                    src="/images/btn_submit.webp"
                                    alt="Submit"
                                    width={232.69}
                                    height={63.68}
                                    className="w-full h-auto"
                                />
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="loading-spinner loading-spinner-fullscreen" aria-live="polite" aria-label="Loading registration form">Loading...</div>}>
            <RegisterPageInner />
        </Suspense>
    );
}
