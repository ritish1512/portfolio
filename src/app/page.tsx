import { ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaYoutubeSquare } from 'react-icons/fa'
import { GrContact } from 'react-icons/gr'
import Image from "next/image";
import { ProjectShowcase } from "@/components/project-showcase";
import {
  fallbackProjects,
  fallbackServices,
  testimonials,
  type Project,
  type SanityResponse,
  type Service,
} from "@/components/portfolio-data";
import { ServicesBooking } from "@/components/services-booking";
import { TestimonialsSlider } from "@/components/testimonials-slider";
import { VideoLightbox } from "@/components/video-lightbox";
import { TechnologyStack } from "@/components/technology-stack";
import { FAQ } from "@/components/faq";
import { Reviews } from "@/components/reviews";
import { HeroMetrics } from "@/components/hero-metrics";
import { ResponsiveNav } from "@/components/responsive-nav";
import { buildStructuredData, jsonLd } from "@/lib/seo";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-06-26';

export const revalidate = 60;

async function fetchSanity<T>(query: string): Promise<T | null> {
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(
    query,
  )}`;

  try {
    const response = await fetch(url, { next: { revalidate } });
    if (!response.ok) return null;
    const data = (await response.json()) as SanityResponse<T>;
    return data.result ?? null;
  } catch {
    return null;
  }
}

async function getProjects() {
  const query = `*[_type == "project"] | order(orderRank asc, _createdAt desc) {
    _id,
    title,
    description,
    problem,
    architecture,
    wins,
    "image": coalesce(image.asset->url + "?w=1000&h=563&fit=crop&auto=format&q=80", imageUrl),
    "url": coalesce(url, "#contact")
  }`;
  const data = await fetchSanity<Project[]>(query);
  const clean = data?.filter((item) => item.title && item.description && item.image);
  return clean?.length ? clean : fallbackProjects;
}

async function getServices() {
  const query = `*[_type == "service"] | order(orderRank asc, _createdAt desc) {
    _id,
    title,
    tag,
    price,
    description,
    deliverables,
    tools
  }`;
  const data = await fetchSanity<Service[]>(query);
  const clean = data?.filter((item) => item.title && item.price);
  return clean?.length ? clean : fallbackServices;
}

export default async function Home() {
  const [projects, services] = await Promise.all([getProjects(), getServices()]);
  const structuredData = buildStructuredData();

  return (
    <main className="min-h-screen overflow-hidden bg-[#0D1117] text-white selection:bg-emerald-400 selection:text-slate-950">
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(data)}
        />
      ))}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#0D1117]/80 backdrop-blur-xl">
        <ResponsiveNav />
      </header>

      <section
        id="hero"
        className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 md:px-8 lg:flex-row lg:items-center lg:gap-16 lg:px-12 xl:py-24"
      >
        <div className="absolute right-0 top-24 hidden h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl lg:block" />
        <div className="w-full lg:w-7/12">
          <p className="mb-5 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-emerald-300 sm:px-4 sm:py-2 sm:text-xs">
            Full-stack engineering portfolio
          </p>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
            Ritish Builds
          </h1>
          <p className="mt-5 max-w-2xl text-sm font-bold leading-7 text-slate-400 sm:text-base md:text-lg">
            I build custom full-stack web applications that automate business operations and scale seamlessly.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#projects"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-4 text-sm font-bold text-slate-950 transition hover:bg-emerald-300 sm:w-auto md:px-6 md:py-5 md:text-base"
            >
              View Projects <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 px-5 py-4 text-sm font-bold text-white transition hover:border-emerald-300 hover:text-emerald-300 sm:w-auto md:px-6 md:py-5 md:text-base"
            >
              Get In Touch
            </a>
          </div>

          <HeroMetrics />
        </div>

        <div className="mt-10 w-full lg:mt-0 lg:w-5/12">
          <div className="relative rounded-4xl border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-black/40 sm:p-6 md:p-8">
            <div className="aspect-4/5 w-full rounded-3xl overflow-hidden bg-slate-800">
              <Image
                src="/logo-square.png"
                alt="Ritish Logo"
                width={400}
                height={500}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-2xl border border-emerald-400/30 bg-slate-950/90 p-4 backdrop-blur w-max md:left-25 md:-bottom-10 md:p-5">
              <p className="text-2xl font-black text-emerald-300 sm:text-3xl md:text-4xl">Ritish</p>
              <p className="mt-1 text-sm text-slate-400 sm:text-base">Value-driven, versatile, pragmatic</p>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-4 py-18 sm:px-6 md:px-8 lg:px-10 lg:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300 sm:text-sm">
            Selected systems
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            Case studies synced to the build.
          </h2>
        </div>
        <ProjectShowcase projects={projects} />
      </section>

      <section
        id="videos"
        className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10 lg:py-24"
      >
        <div>
          <h2 className="max-w-xl text-3xl font-black tracking-tight sm:text-4xl md:text-5xl md:whitespace-nowrap">
            Technical Deep Dives
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-400 sm:text-lg md:text-xl">
            I write production-grade, highly maintainable full-stack applications with strict TypeScript typing,
             optimized MongoDB schemas, and scalable architecture designed for long-term business growth.
          </p>
          <p className="mt-4 max-w-xl text-base leading-8 text-slate-400 sm:text-lg md:text-xl">
            Writing Bug free code means I can focus on building features that matter to your business, and not waste time fixing issues that arise from poor code quality.
          </p>
          <div className="mt-10 flex flex-wrap gap-6 md:gap-8">
            <Metric value="10k+" label="Subscribers" />
            <Metric value="16" label="Tutorials" />
            <Metric value="150k+" label="Views" />
          </div>
        </div>
        <VideoLightbox />
      </section>

      <TestimonialsSlider testimonials={testimonials} />
      <TechnologyStack />
      <FAQ />
      <Reviews />
      <ServicesBooking services={services} />

      <footer className="border-t border-white/10 bg-slate-950 px-4 py-12 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <a href="#hero" className="text-xl font-black sm:text-2xl">
            Ritish Builds
          </a>
          <div className="flex flex-wrap gap-5 text-xs text-slate-400 sm:text-sm md:gap-6">
            <a href="#projects" className="hover:text-white">
              Projects
            </a>
            <a href="#videos" className="hover:text-white">
              Videos
            </a>
            <a href="#services" className="hover:text-white">
              Services
            </a>
            <a href="#tech-stack" className="hover:text-white">
              Tech Stack
            </a>
            <a href="#faq" className="hover:text-white">
              FAQ
            </a>
            <a href="#reviews" className="hover:text-white">
              Reviews
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:border-emerald-400 hover:text-white"
              href="https://github.com/ritish1512/"
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaGithub size={18} />
            </a>
            <a
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:border-emerald-400 hover:text-white"
              href="https://www.linkedin.com/in/ritish1907"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:border-emerald-400 hover:text-white"
              href="https://www.instagram.com/ritishbuilds/"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaInstagram size={18} />
            </a>
            <a
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:border-emerald-400 hover:text-white"
              href="#contact"
              aria-label="Contact"
            >
              <GrContact size={18} />
            </a>
            <a
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:border-emerald-400 hover:text-white"
              href="https://www.youtube.com/@ritishbuilds"
              aria-label="YouTube"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaYoutubeSquare size={18} />
            </a>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-7xl text-xs text-slate-200 sm:text-sm">
          © 2026 Ritish. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-3xl font-black sm:text-4xl">{value}</p>
      <p className="mt-2 text-sm font-semibold text-slate-400 sm:text-base">{label}</p>
    </div>
  );
}
