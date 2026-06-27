"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import type { Testimonial } from "./portfolio-data";
import Image from "next/image";

export function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonial = testimonials[activeTestimonial] ?? testimonials[0];

  function cycleTestimonial(direction: number) {
    setActiveTestimonial(
      (current) => (current + direction + testimonials.length) % testimonials.length,
    );
  }

  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-18 sm:px-6 sm:py-20 md:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:py-24">
      <div className="relative mx-auto w-full max-w-md">
        <div className="aspect-[0.86] overflow-hidden rounded-bl-[9rem] rounded-br-2xl rounded-tl-2xl rounded-tr-[9rem] bg-sky-200">
          <Image src={testimonial.photo} alt={testimonial.name} width={550} height={550} className="h-full w-full object-cover" priority/>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            What Our Clients Say
          </h2>
          <div className="flex shrink-0 gap-7 md:gap-3 sm:gap-4 mx-auto">
            <IconButton label="Previous testimonial" onClick={() => cycleTestimonial(-1)}>
              <ChevronLeft />
            </IconButton>
            <IconButton label="Next testimonial" onClick={() => cycleTestimonial(1)}>
              <ChevronRight />
            </IconButton>
          </div>
        </div>
        <p className="mt-8 text-lg leading-8 text-slate-400 sm:text-xl sm:leading-9">
          {testimonial.quote}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
          <Image src={testimonial.avatar} width={80} height={80} alt={testimonial.name} className="h-16 w-16 rounded-full object-cover sm:h-20 sm:w-20" loading="lazy"/>
          <div>
            <p className="text-xl font-black sm:text-2xl">{testimonial.name}</p>
            <p className="text-sm text-slate-400 sm:text-base">
              {testimonial.role}, {testimonial.company}
            </p>
            <div className="mt-2 flex gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={18} fill="currentColor" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="grid h-11 w-11 place-items-center rounded-full bg-slate-200 text-slate-950 transition hover:bg-emerald-300 sm:h-12 sm:w-12"
      aria-label={label}
      suppressHydrationWarning
    >
      {children}
    </button>
  );
}
