"use client";

/* eslint-disable @next/next/no-img-element */
import { FuneralState } from "@/app/hooks/useImpulseStore";
import { Check, ShoppingBag } from "lucide-react";

export function ClarityView({ state, onClear }: { state: FuneralState; onClear: () => void }) {

    const handlePurchase = () => {
        window.open(state.imageUrl.includes("ebay") ? state.imageUrl : "https://ebay.com", "_blank");
        onClear(); // Reset app
    };

    return (
        <div className="fixed inset-0 z-50 bg-white text-black flex flex-col items-center justify-center p-6 animate-in fade-in duration-1000">

            <div className="max-w-md w-full text-center space-y-10">

                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                        <Check className="w-10 h-10 text-green-600" />
                    </div>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
                    The impulse has passed.
                </h1>

                <p className="text-zinc-500 text-lg">
                    You waited 48 hours. If you still want this, it is a deliberate choice, not a mistake.
                </p>

                {/* Product Recap */}
                <div className="flex items-center gap-4 bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-left">
                    <img src={state.imageUrl} className="w-16 h-16 object-contain mix-blend-multiply" />
                    <div>
                        <div className="font-medium line-clamp-1">{state.productTitle}</div>
                        <div className="font-bold text-zinc-900">${state.productPrice}</div>
                    </div>
                </div>

                <button
                    onClick={handlePurchase}
                    className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                >
                    <ShoppingBag className="w-5 h-5" />
                    Purchase with Clarity
                </button>

                <button
                    onClick={onClear}
                    className="text-sm text-zinc-400 hover:text-black underline"
                >
                    I don't want it anymore (Close)
                </button>

            </div>
        </div>
    );
}