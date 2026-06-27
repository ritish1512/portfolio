"use client";

import { Send, X, ChevronRight } from "lucide-react";
import { FormEvent, useMemo, useState, useEffect } from "react";
import { buildWhatsAppUrl, type Service } from "./portfolio-data";

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";

export function ServicesBooking({ services }: { services: Service[] }) {
  const [bookingService, setBookingService] = useState<Service | null>(null);
  const [bookingName, setBookingName] = useState("");
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const selectedService = services[0] ?? null;

  useEffect(() => {
    setIsMounted(true);
    setShowSwipeHint(true);
  }, []);

  const pricingTitles = useMemo(() => services.map((service) => service.title), [services]);
  const pricingBudgets = useMemo(
    () => [...services.map((service) => service.price), "Custom Budget"],
    [services],
  );

  function beginBooking(service: Service) {
    setBookingService(service);
    setBookingName("");
  }

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!bookingService) return;
    const name = bookingName.trim();
    const message = [
      "Hi Ritish, I want to book this service.",
      `Client Name: ${name}`,
      `Service: ${bookingService.title}`,
      `Budget: ₹${bookingService.price}/-`,
      `Scope: ${bookingService.deliverables.join(", ")}`,
    ].join("\n");
    setBookingService(null);
    window.location.href = buildWhatsAppUrl(message);
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      "Hi Ritish, I want to discuss a project.",
      `Client Name: ${String(form.get("name") ?? "").trim()}`,
      `Project Type: ${form.get("projectType")}`,
      `Budget Range: ${form.get("budget")}`,
      `Expected Time: ${form.get("time")}`,
      `Message: ${String(form.get("message") ?? "").trim() || "No custom message"}`,
    ].join("\n");
    window.location.href = buildWhatsAppUrl(message);
  }

  return (
    <>
      <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-8 lg:px-10 lg:py-24">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end md:gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300 sm:text-sm">
              Services & pricing
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
              Services I Offer
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-400 sm:text-base">
            I provide a range of services to help you establish a strong online presence.
          </p>
        
        </div>
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-5 sm:gap-5 sm:px-5 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden" onScroll={() => setShowSwipeHint(false)}>
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} onBook={beginBooking} />
          ))}
        </div>
        
        {isMounted && showSwipeHint && (
          <div className="mt-4 flex justify-center md:hidden swipe-indicator">
            <div className="flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/5 px-4 py-2">
              <ChevronRight size={18} className="text-emerald-300" />
              <span className="text-xs font-semibold text-emerald-300 tracking-wide">SWIPE</span>
              <ChevronRight size={18} className="text-emerald-300" />
            </div>
          </div>
        )}
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-8 lg:px-10 lg:py-24">
        <div className="grid overflow-hidden rounded-4xl bg-emerald-400 text-slate-950 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700 sm:text-sm">
              Start your build
            </p>
            <form onSubmit={submitContact} className="mt-8 space-y-4">
              <input className={fieldClass} name="name" aria-label="enter your name" required placeholder="Client Name" type="text" suppressHydrationWarning />
              <select aria-label="project" className={fieldClass} name="projectType" defaultValue={selectedService?.title || ""} suppressHydrationWarning>
                {pricingTitles.map((title) => (
                  <option key={title} aria-label={title}>{title}</option>
                ))}
              </select>
              <select aria-label="budget" className={fieldClass} name="budget" defaultValue={selectedService?.price || ""} suppressHydrationWarning>
                {pricingBudgets.map((budget) => (
                  <option key={budget} aria-label={budget}>₹{budget}/-</option>
                ))}
              </select>
              <select className={fieldClass} name="time" aria-label="time period" defaultValue="Within 1 Week" suppressHydrationWarning>
                <option>Within 1 Week</option>
                <option>1-2 Weeks</option>
                <option>Flexible</option>
              </select>
              <textarea
                className={`${fieldClass} min-h-32 resize-none`}
                name="message"
                placeholder="Custom Message"
                aria-label="custom message"
              />
              <button aria-label="send form" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-4 text-sm font-black text-white transition hover:bg-emerald-600 sm:text-base sm:px-7 sm:py-5" suppressHydrationWarning>
                Send on WhatsApp <Send size={18} />
              </button>
            </form>
          </div>
          <div className="flex min-h-[440px] flex-col justify-center p-8 sm:p-10 lg:p-16">
            <h2 className="max-w-xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
              Become a Part of the Digital Evolution!
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-800 sm:text-lg md:text-xl">
              Bring your service, product or operations workflow online with a polished interface,
              automation-ready architecture and a direct path from visitor interest to WhatsApp
              conversation.
            </p>
          </div>
        </div>
      </section>

      {bookingService && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <form
            onSubmit={submitBooking}
            className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">
                  Book service
                </p>
                <h3 className="mt-2 text-2xl font-black">{bookingService.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setBookingService(null)}
                className="grid size-10 place-items-center rounded-full hover:bg-white/10"
                aria-label="Close booking"
              >
                <X size={20} />
              </button>
            </div>
            <label aria-label="name" className="mt-8 block text-sm font-semibold text-slate-300" htmlFor="booking-name">
              Your name
            </label>
            <input
              id="booking-name"
              required
              aria-label="name"
              value={bookingName}
              onChange={(event) => setBookingName(event.target.value)}
              className="mt-3 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-300/10"
              placeholder="Client Name"
            />
            <button aria-label="send button" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-emerald-300">
              Continue to WhatsApp <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function ServiceCard({ service, onBook }: { service: Service; onBook: (service: Service) => void }) {
  return (
    <article className="flex min-h-[620px] w-[85vw] shrink-0 snap-center flex-col rounded-3xl border border-white/10 bg-slate-900/50 p-6 transition hover:border-emerald-400/40 sm:w-[82vw] sm:p-7 md:w-auto md:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <p className="font-mono text-lg tracking-[0.28em] text-emerald-300 sm:text-xl">₹{service.price}/-</p>
        <span className="inline-flex rounded-full bg-white/5 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.38em] text-slate-300 sm:px-5 sm:py-2 sm:text-xs">
          {service.tag || "WEBSITE"}
        </span>
      </div>
      <h3 className="mt-8 max-w-sm text-3xl font-black tracking-tight sm:text-4xl">{service.title}</h3>
      <p className="mt-6 text-base leading-7 text-slate-300 sm:text-lg">{service.description}</p>
      <div className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-emerald-300 sm:text-sm">
          Deliverables
        </p>
        <ul className="mt-5 space-y-3">
          {service.deliverables?.map((item) => (
            <li key={item} className="flex gap-3 text-slate-200 text-sm sm:text-base">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-emerald-300 sm:text-sm">
          Tools Used
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {service.tools?.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 sm:px-4 sm:py-2 sm:text-sm"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={() => onBook(service)}
        aria-label="book service"
        suppressHydrationWarning
        className="mt-auto w-full rounded-xl bg-emerald-500 px-5 py-4 text-sm font-black text-black transition hover:bg-emerald-400 hover:text-slate-950 sm:px-6 sm:py-4 sm:text-base"
      >
        Book this Service
      </button>
    </article>
  );
}
