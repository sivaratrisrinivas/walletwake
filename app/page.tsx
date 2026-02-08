"use client";

import { FuneralView } from "@/app/components/FuneralView";
import { ClarityView } from "@/app/components/ClarityView";
import { useImpulseStore } from "@/app/hooks/useImpulseStore";
import { ChatOverlay, openChat } from "@/app/components/ChatOverlay";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function Home() {
  const {
    funeralState,
    clearFuneral,
    isResurrected,
    isLoaded,
    fastForward,
  } = useImpulseStore();

  if (!isLoaded) return null;

  if (funeralState?.isActive) {
    if (isResurrected) {
      return <ClarityView state={funeralState} onClear={clearFuneral} />;
    }
    return (
      <>
        <FuneralView state={funeralState} />
        <button
          onClick={fastForward}
          className="fixed bottom-5 right-5 z-[100] bg-danger/10 border border-danger/20 text-danger text-[11px] font-mono px-3 py-1.5 rounded-full backdrop-blur-sm hover:bg-danger/20 transition-all cursor-pointer"
        >
          Skip 48h
        </button>
      </>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5 transition-colors duration-500">
      <div className="w-full max-w-2xl flex flex-col items-center gap-12 text-center">
        {/* Hero */}
        <header className="space-y-6 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface text-muted-foreground text-xs font-medium tracking-wide border border-border-subtle">
            impulse intervention
          </div>
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight text-foreground leading-[1.05]">
            WalletWake
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
            Tell me what you want to buy. I&apos;ll show you what it really costs.
          </p>
        </header>

        {/* CTA */}
        <div className="animate-slide-up" style={{ animationDelay: "150ms" }}>
          <button
            onClick={() => openChat()}
            className="group inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3.5 rounded-full font-semibold text-[15px] hover:bg-accent-hover transition-all shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="w-5 h-5" />
            Start Chatting
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <ChatOverlay />
    </main>
  );
}
