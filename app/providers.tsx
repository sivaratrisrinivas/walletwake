"use client";

import * as React from "react";
import { TamboProvider } from "@tambo-ai/react";

// Fix: Explicitly type this as any[] to satisfy TypeScript for now
// In the next few steps, we will actually put items in here.
const components: any[] = [];

export function Providers({ children }: { children: React.ReactNode }) {
    // Use a dummy key if env is missing to prevent crash during dev
    const apiKey = process.env.NEXT_PUBLIC_TAMBO_API_KEY || "demo-key";

    return (
        <TamboProvider components={components} apiKey={apiKey}>
            {children}
        </TamboProvider>
    );
}