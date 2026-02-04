import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();

        // Use the "Nano Banana" model (Gemini 2.5 Flash Image)
        // This model supports native image generation via generateContent
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-image",
            contents: prompt,
            config: {
                responseModalities: ["IMAGE"], // Force image output
            },
        });

        // Loop through parts to find the image
        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                // Extract base64 data directly
                const base64Data = part.inlineData.data;
                const mimeType = part.inlineData.mimeType || "image/png";

                // Return as a Data URL for immediate display
                return NextResponse.json({
                    imageUrl: `data:${mimeType};base64,${base64Data}`
                });
            }
        }

        throw new Error("No image data found in Gemini response");

    } catch (error) {
        console.error("Gemini Image Gen Error:", error);
        return NextResponse.json({
            imageUrl: "https://placehold.co/400x400/000000/FFF?text=Visual+Unavailable"
        });
    }
}