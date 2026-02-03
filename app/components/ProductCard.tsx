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
            className="group cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col"
        >
            <div className="aspect-square relative overflow-hidden bg-zinc-50 dark:bg-zinc-950 p-6 flex items-center justify-center">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                />
            </div>
            <div className="p-5 flex flex-col gap-2">
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100 text-sm line-clamp-2 leading-relaxed">
                    {title}
                </h3>
                <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-xl font-bold tracking-tight text-black dark:text-white">
                        {currency === "USD" ? "$" : currency}{price}
                    </span>
                    <button className="text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-3 py-1.5 rounded-full transition-colors">
                        Select
                    </button>
                </div>
            </div>
        </div>
    );
}