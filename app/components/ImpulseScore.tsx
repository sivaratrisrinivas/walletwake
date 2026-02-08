"use client";

export interface ImpulseScoreProps {
  productName: string;
  score: number;
  verdict: string;
  reasons: string[];
  advice: string;
}

export function ImpulseScore({
  productName,
  score,
  verdict,
  reasons,
  advice,
}: ImpulseScoreProps) {
  // Clamp 1-10
  const s = Math.max(1, Math.min(10, Math.round(score)));

  const getColor = (val: number) => {
    if (val <= 3) return { bar: "#8B9F7B", label: "Low Risk" };
    if (val <= 6) return { bar: "#D4A574", label: "Moderate" };
    if (val <= 8) return { bar: "#C87A5A", label: "High Risk" };
    return { bar: "#A65D3F", label: "Critical" };
  };

  const { bar, label } = getColor(s);

  return (
    <div className="my-4 p-5 bg-[#1A1816] border border-[#332F2A] rounded-[var(--radius-lg)] shadow-xl animate-scale-in space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#D4A574]">
            Impulse Score
          </div>
          <h3 className="text-[#EDE7DE] font-semibold text-sm mt-0.5 line-clamp-1">
            {productName}
          </h3>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold tabular-nums" style={{ color: bar }}>
            {s}
            <span className="text-base font-normal text-[#6A6560]">/10</span>
          </div>
          <div
            className="text-[10px] uppercase tracking-wider font-medium"
            style={{ color: bar }}
          >
            {label}
          </div>
        </div>
      </div>

      {/* Gauge bar */}
      <div className="space-y-1.5">
        <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${s * 10}%`,
              backgroundColor: bar,
            }}
          />
        </div>
        <div className="flex justify-between text-[9px] text-[#5A5550] font-mono uppercase">
          <span>Need</span>
          <span>Want</span>
          <span>Impulse</span>
          <span>Regret</span>
        </div>
      </div>

      {/* Verdict */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-[var(--radius-md)] p-4">
        <div className="text-sm font-semibold text-[#EDE7DE] mb-1">
          {verdict}
        </div>
        {reasons.length > 0 && (
          <ul className="space-y-1 mt-2">
            {reasons.map((r, i) => (
              <li
                key={i}
                className="text-[12px] text-[#8A8078] flex items-start gap-2"
              >
                <span className="text-[#5A5550] mt-0.5 shrink-0">—</span>
                {r}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Advice */}
      <p className="text-[13px] text-[#6A6560] italic border-l-2 border-[#332F2A] pl-3">
        {advice}
      </p>
    </div>
  );
}
