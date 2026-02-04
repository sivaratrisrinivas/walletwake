import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Initialize the new SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
    // FIX 1: Define variables OUTSIDE the try block so 'catch' can see them
    let productName = "Impulse Item";
    let price = "0";

    try {
        // Parse the body
        const body = await request.json();

        // Update variables if body exists
        if (body.productName) productName = body.productName;
        if (body.price) price = body.price;

        const prompt = `Write a very short, somber but funny funeral eulogy for $${price} which is being spent on '${productName}'. 
    The tone should be tragic poverty. 
    Mention a specific downside of buying this item.
    Keep it under 30 words. Do not use hashtags.`;

        // FIX 2: Use the requested Gemini 3 Flash Preview model
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
        });

        // The new SDK exposes .text directly
        const generatedText = response.text || `Alas, the money is gone for ${productName}.`;

        return NextResponse.json({ text: generatedText });

    } catch (error) {
        console.error("Gemini SDK Error:", error);

        // FIX 1 (Result): Now 'productName' and 'price' are accessible here!
        return NextResponse.json({
            text: `We are gathered here to mourn the loss of $${price}, sacrificed for ${productName}.`
        });
    }
}