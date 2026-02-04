import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
    try {
        const { productName, price } = await request.json();

        // 1. Keep the prompt VERY short for speed
        const prompt = `Write a roast for buying '${productName}' for $${price}. 
    Tone: Judgmental. Max 15 words.`;

        const geminiRes = await ai.models.generateContent({
            model: "gemini-3-flash-preview", // Flash is faster than Pro
            contents: prompt,
        });
        const text = geminiRes.text || `You spent $${price} on ${productName}? Really?`;

        const apiKey = process.env.ELEVENLABS_API_KEY;
        const voiceId = process.env.ELEVENLABS_VOICE_ID || "pNInz6obpgDQGcFmaJgB";

        // 2. Call ElevenLabs with the TURBO model
        const audioRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': apiKey!,
            },
            body: JSON.stringify({
                text: text,
                // FIX: Use the Turbo model for low latency
                model_id: "eleven_turbo_v2_5",
                voice_settings: {
                    stability: 0.5, // Turbo needs slightly higher stability to not sound glitchy
                    similarity_boost: 0.75,
                    style: 0.0,     // Turbo doesn't support style exaggeration as well
                    use_speaker_boost: true
                }
            }),
        });

        if (!audioRes.ok) throw new Error("ElevenLabs API Failed");

        return new NextResponse(audioRes.body, {
            headers: { 'Content-Type': 'audio/mpeg' },
        });

    } catch (error) {
        console.error("Instant Eulogy Error:", error);
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}