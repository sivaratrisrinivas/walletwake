"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function EulogyPlayer({
  productName,
  price,
}: {
  productName: string;
  price: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;

    const playInstantEulogy = async () => {
      try {
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
              .catch((e) =>
                console.log("Autoplay blocked:", e)
              );
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
    <div className="fixed top-5 right-5 z-[60]">
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
      <button
        onClick={toggleAudio}
        className="flex items-center gap-2 bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] text-[#EDE7DE] px-3.5 py-2 rounded-full hover:bg-white/[0.1] transition-all text-[11px] uppercase tracking-[0.15em] font-medium"
      >
        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 animate-breathe text-[#D4A574]" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-[#6A6560]" />
        )}
        {isPlaying ? "Eulogy" : "Muted"}
      </button>
    </div>
  );
}
