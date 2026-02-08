"use client";

interface Alternative {
  name: string;
  price: string;
  reason: string;
}

export interface AlternativeSuggestionProps {
  originalProduct: string;
  originalPrice: string;
  alternatives: Alternative[];
  summary: string;
}

export function AlternativeSuggestion({
  originalProduct,
  originalPrice,
  alternatives,
  summary,
}: AlternativeSuggestionProps) {
  return (
    <div className="my-4 p-5 bg-[#1A1816] border border-[#332F2A] rounded-[var(--radius-lg)] shadow-xl animate-scale-in space-y-5">
      {/* Header */}
      <div className="space-y-1">
        <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#8B9F7B]">
          Better Options
        </div>
        <div className="text-[12px] text-[#6A6560]">
          Instead of{" "}
          <span className="text-[#EDE7DE] font-medium">{originalProduct}</span>{" "}
          at{" "}
          <span className="text-[#C87A5A] font-mono font-semibold">
            {originalPrice}
          </span>
        </div>
      </div>

      {/* Alternatives list */}
      <div className="space-y-2">
        {alternatives.map((alt, i) => (
          <div
            key={i}
            className="bg-white/[0.03] border border-white/[0.06] rounded-[var(--radius-md)] p-4 flex items-start justify-between gap-3"
          >
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-[#EDE7DE] leading-snug">
                {alt.name}
              </div>
              <div className="text-[12px] text-[#6A6560] mt-1 leading-relaxed">
                {alt.reason}
              </div>
            </div>
            <div className="text-sm font-bold text-[#8B9F7B] font-mono shrink-0">
              {alt.price}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <p className="text-[13px] text-[#8A8078] italic border-t border-[#252220] pt-4">
        {summary}
      </p>
    </div>
  );
}
