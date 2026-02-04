"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function EulogyPlayer({ productName, price }: { productName: string; price: string }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const hasTriggered = useRef(false);

    useEffect(() => {
        if (hasTriggered.current) return;
        hasTriggered.current = true;

        const playInstantEulogy = async () => {
            try {
                // ONE REQUEST: Fetches text AND audio in a single stream
                const response = await fetch("/api/instant-eulogy", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ productName, price }),
                });

                if (!response.ok) throw new Error("Audio generation failed");

                const blob = await response.blob();
                const url = URL.createObjectURL(blob);

                if (audioRef.current) {
                    audioRef.current.src = url;
                    const playPromise = audioRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise
                            .then(() => setIsPlaying(true))
                            .catch(e => console.log("Autoplay blocked (user interaction needed):", e));
                    }
                }
            } catch (e) {
                console.error("Eulogy error:", e);
            }
        };

        playInstantEulogy();
    }, [productName, price]);

    const toggleAudio = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="absolute top-6 right-6 z-50">
            <audio ref={audioRef} onEnded={() => setIsPlaying(false)} className="hidden" />
            <button
                onClick={toggleAudio}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-2 rounded-full hover:bg-white/20 transition-all text-xs uppercase tracking-widest"
            >
                {isPlaying ? <Volume2 className="w-4 h-4 animate-pulse text-red-400" /> : <VolumeX className="w-4 h-4" />}
                {isPlaying ? "Eulogy Playing..." : "Muted"}
            </button>
        </div>
    );
}