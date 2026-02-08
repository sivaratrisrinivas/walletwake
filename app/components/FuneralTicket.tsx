"use client";

import { useImpulseStore } from "@/app/hooks/useImpulseStore";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { useState } from "react";

export interface FuneralTicketProps {
  productTitle: string;
  price: number;
  currency: string;
  reason: string;
}

export function FuneralTicket({
  productTitle,
  price,
  currency,
  reason,
}: FuneralTicketProps) {
  const { startFuneral } = useImpulseStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleEnterFuneral = async () => {
    setIsLoading(true);
    let finalImage =
      "https://placehold.co/400x400/1D1B18/C49A6C?text=Impulse+Item";

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `A cinematic, dramatic shot of ${productTitle}, gloomy lighting, hyperrealistic`,
        }),
      });
      const data = await res.json();
      if (data.imageUrl) finalImage = data.imageUrl;
    } catch {
      console.error("Image gen failed, using placeholder");
    }

    startFuneral({
      title: productTitle,
      price: { value: price.toString(), currency },
      image: { imageUrl: finalImage },
      itemWebUrl: "#",
    });

    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <div className="my-4 p-5 bg-[#1A1816] border border-[#332F2A] rounded-[var(--radius-lg)] shadow-xl animate-scale-in">
      {/* Badge */}
      <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[#252220]">
        <div className="bg-[#A65D3F]/10 p-2 rounded-full">
          <AlertTriangle className="w-4 h-4 text-[#C87A5A]" />
        </div>
        <span className="text-[#C87A5A] text-[11px] font-mono uppercase tracking-[0.15em]">
          Financial hazard detected
        </span>
      </div>

      {/* Product info */}
      <div className="space-y-1 mb-4">
        <h3 className="text-[#EDE7DE] font-semibold text-base leading-snug">
          {productTitle}
        </h3>
        <div className="text-2xl font-semibold text-[#D4A574] font-mono">
          {currency === "USD" ? "$" : currency}
          {price}
        </div>
      </div>

      {/* Reason */}
      <p className="text-[#6A6560] text-sm mb-5 border-l-2 border-[#332F2A] pl-3 italic">
        &ldquo;{reason}&rdquo;
      </p>

      {/* CTA */}
      <button
        onClick={handleEnterFuneral}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-[#D4A574] text-[#141210] font-semibold py-3 rounded-full hover:bg-[#E0B88A] transition-colors disabled:opacity-50"
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-[#141210]/30 border-t-[#141210] rounded-full animate-spin" />
        ) : (
          <>
            Enter Funeral Mode
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}
