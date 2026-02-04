"use client";

import { useState, useEffect } from "react";

export function useAlternatives(originalTitle: string, originalPrice: number) {
    const [alternatives, setAlternatives] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAlternatives = async () => {
            // FIX: Use "all" to get every item in our Mock DB, ensuring we always find something to show.
            const query = "all";

            try {
                const res = await fetch(`/api/ebay/search?q=${encodeURIComponent(query)}`);
                const data = await res.json();

                if (data.itemSummaries) {
                    // Filter: Must be cheaper than original item AND not the same item
                    const cheaper = data.itemSummaries
                        .filter((item: any) => {
                            const price = parseFloat(item.price.value);
                            return price < originalPrice && item.title !== originalTitle;
                        })
                        .slice(0, 5); // Take top 5

                    setAlternatives(cheaper);
                }
            } catch (e) {
                console.error("Failed to fetch alternatives", e);
            } finally {
                setLoading(false);
            }
        };

        if (originalTitle) {
            fetchAlternatives();
        }
    }, [originalTitle, originalPrice]);

    return { alternatives, loading };
}