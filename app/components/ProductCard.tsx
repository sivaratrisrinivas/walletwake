"use client";

/* eslint-disable @next/next/no-img-element */

interface ProductProps {
  title: string;
  price: string;
  currency: string;
  imageUrl: string;
  onClick: () => void;
}

export function ProductCard({ title, price, currency, imageUrl, onClick }: ProductProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-card border border-border rounded-[var(--radius-lg)] overflow-hidden hover:shadow-lg hover:border-accent/30 transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="aspect-square relative overflow-hidden bg-surface p-8 flex items-center justify-center">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-[1.04] transition-transform duration-500 ease-out"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-medium text-card-foreground text-sm line-clamp-2 leading-snug">
          {title}
        </h3>
        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="text-lg font-semibold tracking-tight text-foreground">
            {currency === "USD" ? "$" : currency}
            {price}
          </span>
          <span className="text-[11px] font-medium text-accent bg-accent/10 px-2.5 py-1 rounded-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-200">
            Select
          </span>
        </div>
      </div>
    </div>
  );
}
