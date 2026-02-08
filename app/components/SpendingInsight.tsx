"use client";

interface InsightItem {
  emoji: string;
  label: string;
  count: number;
}

export interface SpendingInsightProps {
  productName: string;
  price: number;
  currency: string;
  insights: InsightItem[];
  savingsSuggestion: string;
  monthlyImpact: string;
  yearlyImpact: string;
}

export function SpendingInsight({
  productName,
  price,
  currency,
  insights,
  savingsSuggestion,
  monthlyImpact,
  yearlyImpact,
}: SpendingInsightProps) {
  const symbol = currency === "USD" ? "$" : currency;

  return (
    <div className="my-4 p-5 bg-[#1A1816] border border-[#332F2A] rounded-[var(--radius-lg)] shadow-xl animate-scale-in space-y-5">
      {/* Header */}
      <div className="space-y-1">
        <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#D4A574]">
          Spending Insight
        </div>
        <h3 className="text-[#EDE7DE] font-semibold text-base leading-snug">
          {productName}
        </h3>
        <div className="text-2xl font-semibold text-[#EDE7DE] font-mono">
          {symbol}
          {price}
        </div>
      </div>

      {/* Reality grid */}
      {insights.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {insights.map((item, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/[0.06] rounded-[var(--radius-md)] p-3 flex items-center gap-2.5"
            >
              <span className="text-lg">{item.emoji}</span>
              <div>
                <div className="text-lg font-semibold text-[#D4A574]">
                  {item.count}
                </div>
                <div className="text-[10px] text-[#6A6560] uppercase tracking-wide">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Impact section */}
      <div className="flex gap-3">
        <div className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-[var(--radius-md)] p-3 text-center">
          <div className="text-[10px] text-[#6A6560] uppercase tracking-wide mb-1">
            Monthly
          </div>
          <div className="text-sm font-semibold text-[#C87A5A]">
            {monthlyImpact}
          </div>
        </div>
        <div className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-[var(--radius-md)] p-3 text-center">
          <div className="text-[10px] text-[#6A6560] uppercase tracking-wide mb-1">
            Yearly
          </div>
          <div className="text-sm font-semibold text-[#C87A5A]">
            {yearlyImpact}
          </div>
        </div>
      </div>

      {/* Savings suggestion */}
      <div className="border-t border-[#252220] pt-4">
        <p className="text-[13px] text-[#8A8078] leading-relaxed italic">
          &ldquo;{savingsSuggestion}&rdquo;
        </p>
      </div>
    </div>
  );
}
