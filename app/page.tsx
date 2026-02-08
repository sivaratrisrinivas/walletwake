"use client";

import { useState } from "react";
import { SearchInput } from "@/app/components/SearchInput";
import { ProductCard } from "@/app/components/ProductCard";
import { FuneralView } from "@/app/components/FuneralView";
import { ClarityView } from "@/app/components/ClarityView";
import { useImpulseStore } from "@/app/hooks/useImpulseStore";
import { ChatOverlay } from "@/app/components/ChatOverlay";

interface Product {
  itemId: string;
  title: string;
  price: { value: string; currency: string };
  image: { imageUrl: string };
  itemWebUrl: string;
}

export default function Home() {
  const {
    funeralState,
    startFuneral,
    clearFuneral,
    isResurrected,
    isLoaded,
    fastForward,
  } = useImpulseStore();

  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch(
        `/api/ebay/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      if (data.itemSummaries) setResults(data.itemSummaries);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
    <main className="min-h-screen flex flex-col items-center px-5 pt-32 pb-20 transition-colors duration-500">
      <div className="w-full max-w-3xl flex flex-col items-center gap-16">
        {/* Hero */}
        <header className="text-center space-y-4 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface text-muted-foreground text-xs font-medium tracking-wide border border-border-subtle mb-2">
            impulse intervention
          </div>
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight text-foreground leading-[1.05]">
            WalletWake
          </h1>
          <p className="text-muted-foreground text-base max-w-sm mx-auto leading-relaxed">
            Search for what you want. We&apos;ll show you what it really costs.
          </p>
        </header>

        {/* Search */}
        <div className="w-full flex justify-center animate-slide-up" style={{ animationDelay: "100ms" }}>
          <SearchInput onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {results.map((item) => (
              <div key={item.itemId} className="animate-scale-in">
                <ProductCard
                  title={item.title}
                  price={item.price.value}
                  currency={item.price.currency}
                  imageUrl={item.image.imageUrl}
                  onClick={() => startFuneral(item)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {hasSearched && results.length === 0 && !isLoading && (
          <div className="text-muted-foreground text-sm text-center animate-fade-in py-12">
            Nothing found. The universe agrees — save your money.
          </div>
        )}
      </div>

      <ChatOverlay />
    </main>
  );
}
