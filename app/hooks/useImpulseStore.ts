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

    const isResurrected = () => {
        if (!state) return false;
        const now = Date.now();
        const resurrectionTime = state.deathDate + (48 * 60 * 60 * 1000);
        return now > resurrectionTime;
    };

    return {
        funeralState: state,
        startFuneral,
        clearFuneral,
        isResurrected: isResurrected(), // Export the result
        isLoaded,
        // Hack for Demo: Function to fast-forward time
        fastForward: () => {
            if (!state) return;
            const oldState = { ...state, deathDate: Date.now() - (49 * 60 * 60 * 1000) }; // Set to 49 hours ago
            setState(oldState);
            localStorage.setItem("walletwake_funeral", JSON.stringify(oldState));
            window.location.reload();
        }
    };

}