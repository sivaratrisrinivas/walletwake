"use client";

import * as React from "react";
import { TamboProvider, TamboTool } from "@tambo-ai/react";
import { z } from "zod";

// Generative Components
import { FuneralTicket } from "@/app/components/FuneralTicket";
import { RoastReceipt } from "@/app/components/RoastReceipt";
import { SpendingInsight } from "@/app/components/SpendingInsight";
import { ImpulseScore } from "@/app/components/ImpulseScore";
import { AlternativeSuggestion } from "@/app/components/AlternativeSuggestion";

// Lib
import { getConversions } from "@/lib/currency-converter";
import { searchMockProducts } from "@/lib/mock-db";

// ─── Generative Components ────────────────────────────────────────────

const components = [
  {
    name: "funeral-ticket",
    description:
      "Renders a warning ticket when the user mentions wanting to buy a product. Use this for general purchase intent like 'I want to buy X' or 'should I get X'.",
    component: FuneralTicket,
    propsSchema: z.object({
      productTitle: z
        .string()
        .describe("The name of the product")
        .optional()
        .default("Item"),
      price: z
        .number()
        .describe("The estimated price in dollars")
        .optional()
        .default(0),
      currency: z.string().default("USD").optional(),
      reason: z
        .string()
        .describe("A short, witty reason why this purchase is a bad idea")
        .default("Bad idea.")
        .optional(),
    }),
  },
  {
    name: "roast-receipt",
    description:
      "Renders a detailed, sarcastic receipt breakdown. Use this when the user asks for a 'bill', 'receipt', 'breakdown', 'analysis', or 'how much will X really cost me'.",
    component: RoastReceipt,
    propsSchema: z.object({
      productName: z
        .string()
        .describe("Name of the main product")
        .optional()
        .default("Impulse Item"),
      total: z
        .string()
        .describe("Total formatted price (e.g. $500)")
        .optional()
        .default("$0.00"),
      roast: z
        .string()
        .describe("A biting, sarcastic one-liner comment")
        .optional()
        .default("Why are you like this?"),
      items: z
        .array(
          z.object({
            label: z
              .string()
              .describe(
                "A funny/sarcastic line item name (e.g. 'Regret Tax', 'Dopamine Surcharge')"
              )
              .optional()
              .default("Mystery Fee"),
            cost: z
              .string()
              .describe("The cost for this line item")
              .optional()
              .default("$0.00"),
          })
        )
        .describe(
          "List of 4-6 funny/sarcastic line items that add up to the total"
        )
        .optional()
        .default([]),
    }),
  },
  {
    name: "spending-insight",
    description:
      "Renders a visual spending analysis card showing what a price means in real-world terms. ALWAYS use this component when you have price data from calculate_real_cost tool or when the user asks 'what could I buy instead', 'put this in perspective', 'what does X dollars mean', or 'show me what I could do with this money'. Map the tool's equivalents array to the insights array, monthlyIfRecurring to monthlyImpact, invested10yr to yearlyImpact, and verdict to savingsSuggestion.",
    component: SpendingInsight,
    propsSchema: z.object({
      productName: z
        .string()
        .describe("The product being analyzed")
        .optional()
        .default("Item"),
      price: z
        .number()
        .describe("The price in dollars")
        .optional()
        .default(0),
      currency: z.string().default("USD").optional(),
      insights: z
        .array(
          z.object({
            emoji: z.string().describe("A relevant emoji").default("💰"),
            label: z
              .string()
              .describe("What this converts to (e.g. 'Cups of Coffee')")
              .default("items"),
            count: z
              .number()
              .describe("How many of this item you could buy instead")
              .default(0),
          })
        )
        .describe("4 real-world price equivalents")
        .optional()
        .default([]),
      savingsSuggestion: z
        .string()
        .describe(
          "A practical suggestion for what to do with the money instead"
        )
        .optional()
        .default("Consider saving this amount."),
      monthlyImpact: z
        .string()
        .describe(
          "What this costs if spent monthly (e.g. '$6,000/year')"
        )
        .optional()
        .default("N/A"),
      yearlyImpact: z
        .string()
        .describe(
          "Impact if this was invested yearly for 10 years"
        )
        .optional()
        .default("N/A"),
    }),
  },
  {
    name: "impulse-score",
    description:
      "Renders an impulse danger score gauge from 1-10. Use this when the user asks 'how impulsive is this', 'rate this purchase', 'is this a bad idea', 'score this', or 'how dumb is this'.",
    component: ImpulseScore,
    propsSchema: z.object({
      productName: z
        .string()
        .describe("The product being scored")
        .optional()
        .default("Item"),
      score: z
        .number()
        .describe(
          "Impulse danger score from 1 (genuine need) to 10 (pure impulse regret). Be honest and harsh."
        )
        .optional()
        .default(5),
      verdict: z
        .string()
        .describe(
          "A short, punchy verdict headline (e.g. 'Your wallet is crying')"
        )
        .optional()
        .default("Hmm..."),
      reasons: z
        .array(z.string())
        .describe(
          "2-4 specific reasons supporting the score (e.g. 'You already own 3 pairs of headphones')"
        )
        .optional()
        .default([]),
      advice: z
        .string()
        .describe("One sentence of financial wisdom or a roast")
        .optional()
        .default("Sleep on it."),
    }),
  },
  {
    name: "alternative-suggestion",
    description:
      "Renders a list of cheaper or better alternatives. Use when the user asks 'what else could I get', 'cheaper alternatives', 'what should I buy instead', or 'compare options'.",
    component: AlternativeSuggestion,
    propsSchema: z.object({
      originalProduct: z
        .string()
        .describe("The product they originally want")
        .optional()
        .default("Item"),
      originalPrice: z
        .string()
        .describe("The original price formatted (e.g. '$500')")
        .optional()
        .default("$0"),
      alternatives: z
        .array(
          z.object({
            name: z
              .string()
              .describe("Alternative product name")
              .default("Alternative"),
            price: z
              .string()
              .describe("Price formatted (e.g. '$200')")
              .default("$0"),
            reason: z
              .string()
              .describe(
                "Why this is a better choice (e.g. 'Same specs, half the hype tax')"
              )
              .default("Worth considering."),
          })
        )
        .describe("2-4 alternative products with prices and reasons")
        .optional()
        .default([]),
      summary: z
        .string()
        .describe("A brief summary of why alternatives matter here")
        .optional()
        .default("There are better ways to spend your money."),
    }),
  },
];

// ─── Tambo Local Tools ────────────────────────────────────────────────

const calculateRealCost = (input: { price: number; productName: string }) => {
  const conversions = getConversions(input.price);
  const monthlyIfRecurring = `$${(input.price * 12).toLocaleString()}/year`;
  const invested10yr = `~$${Math.round(input.price * Math.pow(1.07, 10)).toLocaleString()} if invested`;

  return {
    product: input.productName,
    price: input.price,
    equivalents: conversions.map((c) => ({
      item: c.item,
      count: c.count,
      emoji: c.emoji,
    })),
    monthlyIfRecurring,
    invested10yr,
    verdict:
      input.price > 500
        ? "This is a significant purchase. Sleep on it."
        : input.price > 100
          ? "Not trivial. Ask yourself: will you care about this in a month?"
          : "Small but they add up. Death by a thousand cuts.",
  };
};

const calculateRealCostTool: TamboTool = {
  name: "calculate_real_cost",
  description:
    "Converts a product price into real-world equivalents (ramen packs, coffees, hours of work, Netflix months) and shows investment potential. After calling this tool, provide a brief conversational intro (1-2 sentences), then ALWAYS render a spending-insight component with the returned data. Never display raw tool output or JSON as text.",
  tool: calculateRealCost,
  inputSchema: z.object({
    price: z.number().describe("The price in USD"),
    productName: z.string().describe("Name of the product"),
  }),
  outputSchema: z.object({
    product: z.string(),
    price: z.number(),
    equivalents: z.array(
      z.object({
        item: z.string(),
        count: z.number(),
        emoji: z.string(),
      })
    ),
    monthlyIfRecurring: z.string(),
    invested10yr: z.string(),
    verdict: z.string(),
  }),
  transformToContent: (result) => [
    {
      type: "text",
      text: `Let me break down what $${result.price.toLocaleString()} for ${result.product} really means in your life.\n\nCheck the breakdown below 👇`,
    },
  ],
};

const searchProducts = async (input: { query: string }) => {
  const results = await searchMockProducts(input.query);
  return results.map((p) => ({
    name: p.title,
    price: p.price.value,
    currency: p.price.currency,
  }));
};

const searchProductsTool: TamboTool = {
  name: "search_products",
  description:
    "Search the product catalog for items by name or category. Returns matching products with prices. Use this when the user mentions a product and you need to look up its actual price.",
  tool: searchProducts,
  inputSchema: z.object({
    query: z
      .string()
      .describe(
        "Search query — product name, category, or 'all' for everything"
      ),
  }),
  outputSchema: z.array(
    z.object({
      name: z.string(),
      price: z.string(),
      currency: z.string(),
    })
  ),
};

const tools: TamboTool[] = [calculateRealCostTool, searchProductsTool];

// ─── Context Helpers ──────────────────────────────────────────────────

const contextHelpers = {
  app_context: () => ({
    appName: "WalletWake",
    purpose:
      "You are WalletWake, a witty financial intervention agent. Your personality: sarcastic but helpful, brutally honest but funny. You discourage impulse purchases using humor and hard truths. Your responses should be conversational, readable, and engaging - like talking to a friend who's trying to save you from yourself.",
    responseStyle: [
      "Write in a conversational, natural tone - like you're texting a friend",
      "Keep text responses brief (1-3 sentences) before or after components",
      "Use line breaks to separate ideas - make it scannable",
      "Be witty and sarcastic, but not mean-spirited",
      "Never display raw JSON, tool output, or technical data as text",
      "Always render components to visualize data - components handle the details",
      "When you call a tool, provide a brief human-readable summary, then render the component",
      "Use emojis sparingly (1-2 max per message) for emphasis",
      "Format numbers and prices naturally: '$999' not '999 USD'",
      "Ask follow-up questions to keep the conversation engaging",
    ],
    componentGuidelines: [
      "Show a funeral ticket (funeral-ticket) for purchase intent - add a witty comment before it",
      "Show a roast receipt (roast-receipt) for cost breakdowns - introduce it with humor",
      "Show spending insight (spending-insight) for price perspective - ALWAYS use this after calculate_real_cost tool",
      "Show impulse score (impulse-score) for purchase rating - add context about why the score",
      "Show alternatives (alternative-suggestion) for better options - frame it as helpful advice",
    ],
  }),
  current_time: () => ({
    time: new Date().toISOString(),
  }),
};

// ─── Provider ─────────────────────────────────────────────────────────

export function Providers({ children }: { children: React.ReactNode }) {
  const apiKey = process.env.NEXT_PUBLIC_TAMBO_API_KEY;
  if (!apiKey) console.warn("⚠️ Tambo API Key missing.");

  return (
    <TamboProvider
      components={components}
      tools={tools}
      contextHelpers={contextHelpers}
      apiKey={apiKey || "demo-key"}
    >
      {children}
    </TamboProvider>
  );
}
