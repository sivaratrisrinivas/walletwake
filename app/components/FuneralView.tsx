"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { FuneralState } from "@/app/hooks/useImpulseStore";
import { getConversions, Conversion } from "@/lib/currency-converter";
import { useAlternatives } from "@/app/hooks/useAlternatives"; // Import Hook

export function FuneralView({ state }: { state: FuneralState }) {
    const [timeLeft, setTimeLeft] = useState("");
    const [conversions, setConversions] = useState<Conversion[]>([]);

    // New Hook Call
    const { alternatives, loading: altLoading } = useAlternatives(
        state.productTitle,
        parseFloat(state.productPrice)
    );

    // ... (Keep existing Conversion useEffect) ...
    useEffect(() => {
        const price = parseFloat(state.productPrice);
        if (!isNaN(price)) {
            setConversions(getConversions(price));
        }
    }, [state.productPrice]);

    // ... (Keep existing Timer useEffect) ...
    useEffect(() => {
        const timer = setInterval(() => {
            const now = Date.now();
            const target = state.deathDate + (48 * 60 * 60 * 1000);
            const diff = target - now;

            if (diff <= 0) {
                setTimeLeft("00:00:00");
                clearInterval(timer);
                return;
            }
            const hours = Math.floor((diff / (1000 * 60 * 60)));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        }, 1000);
        return () => clearInterval(timer);
    }, [state.deathDate]);

    // New Handler for "Buy Anyway"
    const handleBuyAnyway = () => {
        // Open eBay in new tab
        window.open("https://www.ebay.com/itm/123456", "_blank");
        // Ideally, here we would call 'commitSin()' to log it to the Graveyard
        alert("Shame recorded. Redirecting to eBay...");
    };

    return (
        <div className="fixed inset-0 z-50 bg-black text-white flex flex-col items-center p-6 animate-in fade-in duration-1000 overflow-y-auto">

            <div className="max-w-md w-full text-center space-y-8 py-10">

                {/* ... (Keep Header, Image, Price, Grid sections exactly as they were) ... */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-mono text-zinc-500 tracking-widest uppercase">Impulse Funeral</h1>
                    <p className="text-zinc-600 text-sm">Processing grief for your wallet...</p>
                </div>

                <div className="relative w-40 h-40 mx-auto grayscale opacity-80">
                    <img src={state.imageUrl} alt="The deceased" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                </div>

                <div className="bg-zinc-900/30 rounded-2xl p-6 border border-zinc-800">
                    <h2 className="text-5xl font-bold mb-6">{state.currency === "USD" ? "$" : state.currency}{state.productPrice}</h2>
                    <div className="grid grid-cols-2 gap-3 text-left">
                        {conversions.map((c, i) => (
                            <div key={i} className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 flex items-center gap-3">
                                <span className="text-2xl">{c.emoji}</span>
                                <div>
                                    <div className="text-xl font-bold text-red-400">{c.count}</div>
                                    <div className="text-[10px] text-zinc-500 uppercase font-medium">{c.item}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 border border-zinc-800 rounded-2xl bg-zinc-900/50">
                    <div className="text-xs text-zinc-400 uppercase tracking-widest mb-2">Resurrection In</div>
                    <div className="text-4xl sm:text-5xl font-mono font-light tracking-wider tabular-nums">{timeLeft}</div>
                </div>

                {/* --- NEW SECTION: ALTERNATIVES --- */}
                {alternatives.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-zinc-800">
                        <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest">Cheaper Alternatives</h3>
                        <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                            {alternatives.map((item) => (
                                <div key={item.itemId} className="snap-center shrink-0 w-32 bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-left">
                                    <div className="w-full h-24 bg-white rounded-lg mb-2 overflow-hidden">
                                        <img src={item.image.imageUrl} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="text-xs text-zinc-400 truncate">{item.title}</div>
                                    <div className="font-bold text-green-400">${item.price.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- NEW SECTION: BUY ANYWAY BUTTON --- */}
                <button
                    onClick={handleBuyAnyway}
                    className="w-full py-4 rounded-xl border border-red-900/50 text-red-700 hover:bg-red-950/20 hover:text-red-500 transition-colors flex items-center justify-center gap-2 font-mono text-sm"
                >
                    <span>🤡</span>
                    I have no self control. Buy Anyway.
                </button>

            </div>
        </div>
    );
}