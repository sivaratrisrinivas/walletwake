"use client";

/* eslint-disable @next/next/no-img-element */
import { FuneralState } from "@/app/hooks/useImpulseStore";
import { Check, ArrowRight } from "lucide-react";

export function ClarityView({
  state,
  onClear,
}: {
  state: FuneralState;
  onClear: () => void;
}) {
  const handlePurchase = () => {
    window.open(
      state.imageUrl.includes("ebay") ? state.imageUrl : "https://ebay.com",
      "_blank"
    );
    onClear();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="max-w-sm w-full text-center space-y-10">
        {/* Success indicator */}
        <div className="flex justify-center animate-scale-in">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center animate-gentle-pulse">
            <Check className="w-9 h-9 text-success" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: "150ms" }}>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            The impulse has passed.
          </h1>
          <p className="text-muted-foreground text-[15px] leading-relaxed max-w-xs mx-auto">
            You waited 48 hours. If you still want this, it&apos;s a deliberate
            choice — not a reflex.
          </p>
        </div>

        {/* Product recap */}
        <div
          className="flex items-center gap-4 bg-surface p-4 rounded-[var(--radius-lg)] border border-border text-left animate-slide-up"
          style={{ animationDelay: "250ms" }}
        >
          <div className="w-16 h-16 rounded-[var(--radius-md)] bg-surface-raised overflow-hidden flex items-center justify-center p-2 shrink-0">
            <img
              src={state.imageUrl}
              alt={state.productTitle}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <div className="font-medium text-sm line-clamp-1 text-foreground">
              {state.productTitle}
            </div>
            <div className="font-semibold text-foreground mt-0.5">
              ${state.productPrice}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: "350ms" }}>
          <button
            onClick={handlePurchase}
            className="w-full py-3.5 bg-accent text-accent-foreground rounded-full font-semibold text-[15px] hover:bg-accent-hover transition-colors flex items-center justify-center gap-2"
          >
            Purchase with clarity
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClear}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            I don&apos;t want it anymore
          </button>
        </div>
      </div>
    </div>
  );
}
