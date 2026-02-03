"use client";

import { useState, useEffect } from "react";

export interface FuneralState {
    isActive: boolean;
    productTitle: string;
    productPrice: string;
    currency: string;
    imageUrl: string;
    deathDate: number; // Timestamp when funeral started
}

export function useImpulseStore() {
    const [state, setState] = useState<FuneralState | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // 1. Load from LocalStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("walletwake_funeral");
        if (saved) {
            try {
                setState(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse funeral state");
            }
        }
        setIsLoaded(true);
    }, []);

    // 2. Start a new Funeral
    const startFuneral = (product: any) => {
        const newState: FuneralState = {
            isActive: true,
            productTitle: product.title,
            productPrice: product.price.value,
            currency: product.price.currency,
            imageUrl: product.image.imageUrl,
            deathDate: Date.now(),
        };

        setState(newState);
        localStorage.setItem("walletwake_funeral", JSON.stringify(newState));
    };

    // 3. End/Clear Funeral
    const clearFuneral = () => {
        setState(null);
        localStorage.removeItem("walletwake_funeral");
    };

    return {
        funeralState: state,
        startFuneral,
        clearFuneral,
        isLoaded
    };
}