"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface Alternative {
  itemId: string;
  title: string;
  price: { value: string };
  image: { imageUrl: string };
}

interface AlternativesCarouselProps {
  alternatives: Alternative[];
}

export function AlternativesCarousel({ alternatives }: AlternativesCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const marqueeRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current || alternatives.length === 0) return;

    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    const cards = Array.from(wrapper.children) as HTMLElement[];

    if (cards.length === 0) return;

    // Entrance animation — stagger cards from below with opacity
    gsap.from(cards, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.2,
    });

    // Infinite marquee auto-scroll (only if content overflows)
    const containerWidth = container.clientWidth;
    const wrapperWidth = wrapper.scrollWidth;
    const scrollDistance = wrapperWidth - containerWidth;

    if (scrollDistance > 50) {
      // Only animate if there's meaningful overflow
      marqueeRef.current = gsap.to(wrapper, {
        x: -scrollDistance,
        duration: 40 + (alternatives.length * 2), // Slower for more items
        ease: "none",
        repeat: -1,
        paused: isHovered,
      });
    }

    return () => {
      marqueeRef.current?.kill();
      gsap.killTweensOf(wrapper);
      gsap.killTweensOf(cards);
    };
  }, [alternatives.length, isHovered]);

  // Pause/resume marquee on hover
  useEffect(() => {
    if (marqueeRef.current) {
      if (isHovered) {
        marqueeRef.current.pause();
      } else {
        marqueeRef.current.resume();
      }
    }
  }, [isHovered]);

  if (alternatives.length === 0) return null;

  return (
    <div className="space-y-4 pt-2">
      <h3 className="text-[11px] font-mono text-[#6A6560] uppercase tracking-widest text-center">
        Cheaper alternatives
      </h3>
      <div
        ref={containerRef}
        className="overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={wrapperRef}
          className="flex gap-3 pb-3"
          style={{ willChange: "transform" }}
        >
          {alternatives.map((item) => (
            <div
              key={item.itemId}
              className="snap-center shrink-0 w-32 bg-white/[0.03] border border-white/[0.06] rounded-[var(--radius-md)] p-3 cursor-pointer group hover:border-[#8B9F7B]/30 transition-all duration-300"
              style={{ willChange: "transform" }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.05,
                  duration: 0.3,
                  ease: "power2.out",
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out",
                });
              }}
            >
              <div className="w-full h-20 bg-white/5 rounded-lg mb-2 overflow-hidden flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <img
                  src={item.image.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="text-[11px] text-[#8A8078] truncate group-hover:text-[#EDE7DE] transition-colors">
                {item.title}
              </div>
              <div className="text-sm font-semibold text-[#8B9F7B] group-hover:text-[#9FAF8F] transition-colors">
                ${item.price.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
