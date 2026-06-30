"use client";

import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { UIEvent, useState, useEffect } from "react";
import type { Project } from "./portfolio-data";
import Image from "next/image";
import Link from "next/link";

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [activeProject, setActiveProject] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const project = projects[activeProject] ?? projects[0];

  useEffect(() => {
    setIsMounted(true);
    setShowSwipeHint(true);
  }, []);

  function cycleProject(direction: number) {
    setActiveProject((current) => (current + direction + projects.length) % projects.length);
  }

  function onProjectMobileScroll(event: UIEvent<HTMLDivElement>) {
    setShowSwipeHint(false);
    const node = event.currentTarget;
    const nextIndex = Math.round(node.scrollLeft / Math.max(node.clientWidth * 0.88, 1));
    if (nextIndex !== activeProject && projects[nextIndex]) setActiveProject(nextIndex);
  }

  return (
    <>
      <div className="hidden gap-10 lg:grid lg:grid-cols-[0.82fr_1.18fr]">
        <aside className="sticky top-28 h-fit rounded-3xl border border-slate-700/70 bg-slate-900/40 p-6 sm:p-8 transition">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400 sm:text-sm">Case Study</p>
          <h3 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">{project.title}</h3>
          <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg">{project.description}</p>
          <div className="mt-8 space-y-5">
            <InfoBlock label="The Problem" value={project.problem} />
            <InfoBlock label="System Architecture" value={project.architecture} />
            <div>
              <p className="mb-3 text-sm text-slate-400">Key Technical Wins</p>
              <ul className="space-y-3">
                {project.wins?.map((win) => (
                  <li key={win} className="flex gap-3 text-slate-200">
                    <Check className="mt-0.5 text-emerald-300" size={18} />
                    {win}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-9 flex items-center justify-between">
            <div className="flex gap-3">
              <button
                onClick={() => cycleProject(-1)}
                className="grid size-12 place-items-center rounded-xl bg-slate-800 transition hover:bg-slate-700"
                aria-label="Previous project"
                suppressHydrationWarning
              >
                <ChevronLeft />
              </button>
              <button
                onClick={() => cycleProject(1)}
                className="grid size-12 place-items-center rounded-xl bg-slate-800 transition hover:bg-slate-700"
                aria-label="Next project"
                suppressHydrationWarning
              >
                <ChevronRight />
              </button>
            </div>
            <a
              href={project.url}
              className="rounded-xl bg-emerald-500 px-5 py-3 font-black text-slate-950 transition hover:bg-emerald-300"
            >
              View App
            </a>
          </div>
        </aside>

        <div>
          <div className="group relative aspect-[1.55] overflow-hidden rounded-3xl bg-slate-900">
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={675}
              className="h-full w-full object-cover opacity-75 transition duration-500 group-hover:scale-105"
              loading="eager"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <h3 className="max-w-2xl text-3xl font-black">{project.title}</h3>
              <p className="mt-3 max-w-2xl text-lg text-slate-200">{project.description}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            {projects.map((item, index) => (
              <button
                key={item._id}
                aria-label={item.title}
                onClick={() => setActiveProject(index)}
                className={`h-24 w-36 overflow-hidden rounded-lg border transition ${
                  index === activeProject
                    ? "border-emerald-300 ring-2 ring-emerald-300/40"
                    : "border-white/10 opacity-60 hover:opacity-100"
                } sm:h-28 sm:w-44`}
                suppressHydrationWarning
              >
              <Image src={item.image} alt={item.title} width={400} height={225} className="h-full w-full object-cover" loading="lazy" unoptimized/>
              </button>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            {projects.map((item, index) => (
              <button
                key={item._id}
                onClick={() => setActiveProject(index)}
                className={`size-3 rounded-full transition ${
                  index === activeProject ? "bg-emerald-400" : "bg-slate-700"
                }`}
                aria-label={`Open ${item.title}`}
                suppressHydrationWarning
              />
            ))}
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div
          onScroll={onProjectMobileScroll}
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((item) => (
            <article
              key={item._id}
              className="w-[88vw] shrink-0 snap-center overflow-hidden rounded-3xl border border-white/10 bg-slate-900"
            >
              <div className="relative">
              <Image src={item.image} width={800} height={400} alt={item.title} className="h-72 w-full object-cover" loading="lazy" unoptimized/>
              <Link
                href={project.url}
                target="_blank"
                className="rounded-xl bg-emerald-500 px-5 py-3 font-black text-slate-950 transition hover:bg-emerald-300"
              >
                View App
              </Link>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-3 text-slate-300">{item.description}</p>
                
              </div>
            </article>
          ))}
        </div>
        
        {isMounted && showSwipeHint && (
          <div className="mt-4 flex justify-center swipe-indicator">
            <div className="flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/5 px-4 py-2">
              <ChevronRight size={18} className="text-emerald-300" />
              <span className="text-xs font-semibold text-emerald-300 tracking-wide">SWIPE</span>
              <ChevronRight size={18} className="text-emerald-300" />
            </div>
          </div>
        )}
        
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 mt-6">
          <InfoBlock label="The Problem" value={project.problem} />
          <div className="mt-5">
            <InfoBlock label="System Architecture" value={project.architecture} />
          </div>
        </div>
      </div>
    </>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400 sm:text-sm">{label}</p>
      <p className="mt-2 font-semibold leading-7 text-slate-100 sm:text-base">{value}</p>
    </div>
  );
}
