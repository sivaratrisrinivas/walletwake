import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { text } = await request.json();

        if (!text) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }

        const apiKey = process.env.ELEVENLABS_API_KEY;
        // Default to a known sad voice if yours fails.
        // "pNInz6obpgDQGcFmaJgB" is "Adam" (Deep/Narrative) which works well if you don't have a custom sad one.
        const voiceId = process.env.ELEVENLABS_VOICE_ID || "pNInz6obpgDQGcFmaJgB";

        if (!apiKey) {
            console.error("Missing ELEVENLABS_API_KEY");
            return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
        }

        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': apiKey, // Correct Header
            },
            body: JSON.stringify({
                text: text,
                model_id: "eleven_multilingual_v2", // MUST use this for emotion
                voice_settings: {
                    stability: 0.35,       // verified range 0.0-1.0
                    similarity_boost: 0.75,
                    style: 0.20,           // verified parameter
                    use_speaker_boost: true
                }
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail?.message || "ElevenLabs API Failed");
        }

        // Stream the audio back to the frontend
        return new NextResponse(response.body, {
            headers: {
                'Content-Type': 'audio/mpeg',
                // 'Transfer-Encoding': 'chunked' is handled automatically by Next.js/Browser
            },
        });

    } catch (error: any) {
        console.error("Eulogy Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}