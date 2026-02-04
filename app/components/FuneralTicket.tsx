"use client";

import { useImpulseStore } from "@/app/hooks/useImpulseStore";
import { Ticket, Skull } from "lucide-react";

export interface FuneralTicketProps {
    productTitle: string;
    price: number;
    currency: string;
    reason: string;
}

export function FuneralTicket({ productTitle, price, currency, reason }: FuneralTicketProps) {
    const { startFuneral } = useImpulseStore();

    const handleEnterFuneral = async () => {
        // 1. Generate a custom image first
        let finalImage = "https://placehold.co/400x400/000000/FFF?text=Impulse+Item";

        try {
            const res = await fetch("/api/generate-image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: `A cinematic, dramatic shot of ${productTitle}, gloomy lighting, hyperrealistic` }),
            });
            const data = await res.json();
            if (data.imageUrl) finalImage = data.imageUrl;
        } catch (e) {
            console.error("Image gen failed, using placeholder");
        }

        // 2. Save and Start Funeral
        startFuneral({
            title: productTitle,
            price: { value: price.toString(), currency: currency },
            image: { imageUrl: finalImage },
            itemWebUrl: "#"
        });

        setTimeout(() => window.location.reload(), 100);
    };

    return (
        <div className="my-4 p-4 bg-zinc-900 border border-red-900/50 rounded-xl shadow-2xl animate-in zoom-in duration-300">
            <div className="flex items-center gap-3 mb-3 border-b border-zinc-800 pb-2">
                <div className="bg-red-950/50 p-2 rounded-full">
                    <Skull className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-red-400 font-mono text-xs uppercase tracking-widest">
                    Financial Hazard Detected
                </span>
            </div>

            <div className="space-y-1 mb-4">
                <h3 className="text-white font-bold text-lg leading-tight">{productTitle}</h3>
                <div className="text-2xl font-mono text-zinc-400">
                    {currency === "USD" ? "$" : currency}{price}
                </div>
            </div>

            <p className="text-zinc-500 text-sm italic mb-4 border-l-2 border-zinc-700 pl-3">
                AI: "{reason}"
            </p>

            <button
                onClick={handleEnterFuneral}
                className="w-full flex items-center justify-center gap-2 bg-white text-black font-bold py-3 rounded-lg hover:bg-zinc-200 transition-colors"
            >
                <Ticket className="w-4 h-4" />
                Enter Funeral Mode
            </button>
        </div>
    );
}