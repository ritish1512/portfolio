"use client";

import { Play, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function VideoLightbox() {
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (!videoOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setVideoOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [videoOpen]);

  return (
    <>
      <button
        onClick={() => setVideoOpen(true)}
        className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-slate-900 text-left transition hover:border-emerald-400 sm:shadow-xl"
        aria-label="Play technical walkthrough video"
        suppressHydrationWarning
      >
        <Image
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=75"
          alt="Developer tutorial preview"
          width={800}
          height={450}
          className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105"
          loading="eager"
          unoptimized
        />
        <span className="absolute inset-0 bg-slate-950/20" />
        <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-950 shadow-2xl transition group-hover:scale-110">
          <Play fill="currentColor" size={32} />
        </span>
      </button>
      {videoOpen && (
  <div onClick={() => setVideoOpen(false)} className="fixed inset-0 z-50 grid place-items-center bg-slate-950/80 p-4 backdrop-blur-sm" >
    <div onClick={(event) => event.stopPropagation()} className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#07111c] shadow-2xl sm:border-2" >
      <div className="flex items-center justify-between border-b border-white/10 p-2 md:p-5">
        <p className="font-bold">Video</p>
        <button onClick={() => setVideoOpen(false)} className="grid size-10 place-items-center rounded-full hover:bg-white/10" aria-label="Close video" >
          <X />
        </button>
      </div>
      <div className="aspect-video">
        {/* Updated src URL below with autoplay and mute parameters */}
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/qOTEK-VsYI0?si=aZ9UlsuDDA-aHVDj&autoplay=1" 
          title="Just a Place holder song" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  </div>
)}

    </>
  );
}
