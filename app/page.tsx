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
  const { funeralState, startFuneral, clearFuneral, isResurrected, isLoaded, fastForward } = useImpulseStore();

  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch(`/api/ebay/search?q=${encodeURIComponent(query)}`);
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
        {/* DEV ONLY: Visible Demo Button */}
        <button
          onClick={fastForward}
          className="fixed bottom-6 right-6 z-[100] bg-red-900/50 border border-red-500 text-red-200 text-xs font-mono px-3 py-2 rounded-md backdrop-blur-sm hover:bg-red-600 hover:text-white transition-all cursor-pointer shadow-lg"
        >
          ⏩ DEMO: SKIP 48H
        </button>
      </>
    );
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center py-20 px-4 transition-colors duration-500">
      <div className="z-10 w-full max-w-5xl flex flex-col items-center gap-10">
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-6xl font-extrabold tracking-tighter text-black dark:text-white">WalletWake</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-md mx-auto">The impulse buy funeral service.</p>
        </div>
        <div className="w-full flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
          <SearchInput onSearch={handleSearch} isLoading={isLoading} />
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {results.map((item, idx) => (
            <div key={item.itemId} className="animate-in fade-in zoom-in duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
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
        {hasSearched && results.length === 0 && !isLoading && (
          <div className="text-zinc-400 mt-12 text-center">No products found.<br />The universe is telling you to save money.</div>
        )}
      </div>

      {/* AI Chat Overlay */}
      <ChatOverlay />
    </main>
  );
}
