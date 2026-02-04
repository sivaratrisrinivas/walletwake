"use client";

import * as React from "react";
import { TamboProvider } from "@tambo-ai/react";
import { z } from "zod";
import { FuneralTicket } from "@/app/components/FuneralTicket";
import { RoastReceipt } from "@/app/components/RoastReceipt";

const components = [
  {
    name: "funeral-ticket",
    description: "Renders a warning ticket when the user mentions wanting to buy a product. Use this for general purchase intent.",
    component: FuneralTicket,
    propsSchema: z.object({
      productTitle: z.string().describe("The name of the product").optional().default("Item"),
      price: z.number().describe("The estimated price").optional().default(0),
      currency: z.string().default("USD").optional(),
      reason: z.string().default("Bad idea.").optional(),
    }),
  },
  {
    name: "roast-receipt",
    description: "Renders a detailed, sarcastic receipt breakdown. Use this when the user asks for a 'bill', 'receipt', 'breakdown', or 'analysis' of the cost.",
    component: RoastReceipt,
    propsSchema: z.object({
      productName: z.string().describe("Name of the main product").optional().default("Impulse Item"),
      total: z.string().describe("Total formatted price (e.g. $500)").optional().default("$0.00"),
      roast: z.string().describe("A biting, sarcastic comment").optional().default("Why are you like this?"),
      items: z.array(z.object({
        label: z.string().describe("A funny line item name").optional().default("Mystery Fee"),
        cost: z.string().describe("The cost for this line item").optional().default("$0.00"),
      })).describe("List of funny/sarcastic line items").optional().default([]),
    }),
  }
];

export function Providers({ children }: { children: React.ReactNode }) {
  const apiKey = process.env.NEXT_PUBLIC_TAMBO_API_KEY;
  if (!apiKey) console.warn("⚠️ Tambo API Key missing.");

  return (
    <TamboProvider components={components} apiKey={apiKey || "demo-key"}>
      {children}
    </TamboProvider>
  );
}
