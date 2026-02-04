"use client";

import * as React from "react";
import { TamboProvider } from "@tambo-ai/react";
import { z } from "zod";
import { FuneralTicket } from "@/app/components/FuneralTicket"; // Import real component

const components = [
    {
        name: "funeral-ticket",
        description: "Renders a warning ticket when the user mentions wanting to buy a product. Use this whenever the user expresses purchase intent.",
        component: FuneralTicket,
        propsSchema: z.object({
            productTitle: z.string().describe("The name of the product").optional().default("Mystery Impulse Item"),
            price: z.number().describe("The estimated price").optional().default(0),
            currency: z.string().describe("Currency code").optional().default("USD"),
            reason: z.string().describe("Short reason why this is a bad idea").optional().default("Your wallet is trembling."),
        }),
    }
];

export function Providers({ children }: { children: React.ReactNode }) {
    const apiKey = process.env.NEXT_PUBLIC_TAMBO_API_KEY;

    // Safety check for the Hackathon judges running locally
    if (!apiKey) {
        console.warn("⚠️ Tambo API Key missing. Chat features will not work.");
    }

    return (
        <TamboProvider components={components} apiKey={apiKey || "demo-key"}>
            {children}
        </TamboProvider>
    );
}