"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { FuneralState } from "@/app/hooks/useImpulseStore";
import { getConversions, Conversion } from "@/lib/currency-converter";
import { useAlternatives } from "@/app/hooks/useAlternatives";
import { EulogyPlayer } from "./EulogyPlayer";
import { AlternativesCarousel } from "./AlternativesCarousel";

export function FuneralView({ state }: { state: FuneralState }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [conversions, setConversions] = useState<Conversion[]>([]);

  const { alternatives } = useAlternatives(
    state.productTitle,
    parseFloat(state.productPrice)
  );

  useEffect(() => {
    const price = parseFloat(state.productPrice);
    if (!isNaN(price)) setConversions(getConversions(price));
  }, [state.productPrice]);

  useEffect(() => {
    const timer = setInterval(() => {
      const target = state.deathDate + 48 * 60 * 60 * 1000;
      const diff = target - Date.now();

      if (diff <= 0) {
        setTimeLeft("00:00:00");
        clearInterval(timer);
        return;
      }
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
      );
    }, 1000);
    return () => clearInterval(timer);
  }, [state.deathDate]);

  const handleBuyAnyway = () => {
    window.open("https://www.ebay.com", "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0D0C0A] text-[#EDE7DE] flex flex-col items-center overflow-y-auto">
      <EulogyPlayer productName={state.productTitle} price={state.productPrice} />

      <div className="w-full max-w-lg mx-auto px-6 py-16 space-y-10">
        {/* Header */}
        <header className="text-center space-y-2 animate-fade-in">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono tracking-widest text-[#8A8078] uppercase">
            impulse funeral
          </div>
          <p className="text-[#5A5550] text-sm">Processing grief for your wallet</p>
        </header>

        {/* Product Image — somber, desaturated */}
        <div className="flex justify-center animate-scale-in" style={{ animationDelay: "200ms" }}>
          <div className="relative w-44 h-44 rounded-[var(--radius-xl)] overflow-hidden bg-white/5 border border-white/10 p-6 flex items-center justify-center">
            <img
              src={state.imageUrl}
              alt="The deceased"
              className="w-full h-full object-contain grayscale opacity-70"
            />
            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0A]/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Price display */}
        <div className="text-center animate-slide-up" style={{ animationDelay: "300ms" }}>
          <div className="text-5xl font-semibold tracking-tight">
            {state.currency === "USD" ? "$" : state.currency}
            {state.productPrice}
          </div>
          <div className="text-sm text-[#5A5550] mt-2 line-clamp-1">{state.productTitle}</div>
        </div>

        {/* Reality check grid */}
        <div
          className="grid grid-cols-2 gap-3 animate-slide-up"
          style={{ animationDelay: "400ms" }}
        >
          {conversions.map((c, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/[0.06] rounded-[var(--radius-md)] p-4 flex items-center gap-3"
            >
              <span className="text-xl">{c.emoji}</span>
              <div>
                <div className="text-xl font-semibold text-[#D4A574]">{c.count}</div>
                <div className="text-[10px] text-[#6A6560] uppercase tracking-wide font-medium">
                  {c.item}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Countdown */}
        <div
          className="text-center p-8 rounded-[var(--radius-xl)] bg-white/[0.03] border border-white/[0.06] animate-slide-up"
          style={{ animationDelay: "500ms" }}
        >
          <div className="text-[10px] text-[#6A6560] uppercase tracking-[0.2em] font-medium mb-3">
            Resurrection in
          </div>
          <div className="text-4xl sm:text-5xl font-light tracking-[0.12em] tabular-nums font-mono text-[#EDE7DE]">
            {timeLeft}
          </div>
        </div>

        {/* Alternatives */}
        {alternatives.length > 0 && (
          <div className="animate-slide-up" style={{ animationDelay: "600ms" }}>
            <AlternativesCarousel alternatives={alternatives} />
          </div>
        )}

        {/* Buy anyway — shameful, de-emphasized */}
        <div className="pt-4 animate-fade-in" style={{ animationDelay: "700ms" }}>
          <button
            onClick={handleBuyAnyway}
            className="w-full py-3.5 rounded-full border border-white/[0.06] text-[#5A5550] hover:text-[#C87A5A] hover:border-[#C87A5A]/20 hover:bg-[#C87A5A]/5 transition-all text-sm font-medium"
          >
            I have no self control. Buy anyway.
          </button>
        </div>
      </div>
    </div>
  );
}
