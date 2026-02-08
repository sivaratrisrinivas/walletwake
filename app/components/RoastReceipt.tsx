"use client";

import { useImpulseStore } from "@/app/hooks/useImpulseStore";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";

interface ReceiptItem {
  label: string;
  cost: string;
}

export interface RoastReceiptProps {
  productName: string;
  items: ReceiptItem[];
  total: string;
  roast: string;
}

export function RoastReceipt({
  productName,
  items,
  total,
  roast,
}: RoastReceiptProps) {
  const { startFuneral } = useImpulseStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFuneral = async () => {
    setIsGenerating(true);
    let finalImage =
      "https://placehold.co/400x400/1D1B18/C49A6C?text=Receipt";

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `A cinematic, dramatic, high-quality product shot of ${productName}, dark moody lighting`,
        }),
      });
      const data = await res.json();
      if (data.imageUrl) finalImage = data.imageUrl;
    } catch (e) {
      console.error("Image Gen Failed:", e);
    }

    startFuneral({
      title: productName,
      price: { value: total.replace(/[^0-9.]/g, ""), currency: "USD" },
      image: { imageUrl: finalImage },
      itemWebUrl: "#",
    });

    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <div className="my-5 mx-auto w-full max-w-sm animate-scale-in">
      <div className="bg-[#FAF8F4] text-[#1D1B18] rounded-[var(--radius-lg)] p-6 shadow-xl relative overflow-hidden">
        {/* Decorative top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C49A6C] via-[#D4A574] to-[#C49A6C]" />

        {/* Header */}
        <div className="text-center border-b border-dashed border-[#E8E1D6] pb-4 mb-4 pt-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1D1B18]">
            WalletWake Inc.
          </h2>
          <p className="text-[11px] text-[#7A7468] mt-0.5">
            Official Bill of Bad Decisions
          </p>
          <p className="text-[10px] text-[#A69E93] mt-1 font-mono">
            {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
          </p>
        </div>

        {/* Line items */}
        <div className="space-y-2 text-sm mb-4 font-mono">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex justify-between text-[13px]"
            >
              <span className="text-[#7A7468]">{item.label}</span>
              <span className="font-semibold text-[#1D1B18]">{item.cost}</span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t border-b border-[#E8E1D6] py-3 mb-4 flex justify-between items-center">
          <span className="text-xs uppercase tracking-wide font-semibold text-[#7A7468]">
            Total Loss
          </span>
          <span className="text-xl font-bold text-[#A65D3F]">{total}</span>
        </div>

        {/* Roast */}
        <div className="text-center text-[12px] italic text-[#7A7468] mb-5 px-2 leading-relaxed">
          &ldquo;{roast}&rdquo;
        </div>

        {/* Barcode */}
        <div className="flex flex-col items-center gap-2 opacity-30 mb-5">
          <div
            className="h-6 w-full"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #1D1B18 50%, transparent 50%)",
              backgroundSize: "3px 100%",
            }}
          />
          <p className="text-[9px] uppercase tracking-widest">
            No Refunds on Dignity
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={handleFuneral}
          disabled={isGenerating}
          className="w-full bg-[#1D1B18] text-[#FAF8F4] py-3 rounded-full text-[12px] font-semibold uppercase tracking-wider hover:bg-[#332F2A] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              Accept Fate
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
