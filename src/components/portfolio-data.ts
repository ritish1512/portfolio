export interface Project {
  _id: string;
  title: string;
  description: string;
  problem: string;
  architecture: string;
  wins: string[];
  image: string;
  url: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  photo: string;
}

export interface Service {
  _id: string;
  title: string;
  tag: string;
  price: string;
  description: string;
  deliverables: string[];
  tools: string[];
}

export interface SanityResponse<T> {
  result?: T;
}

export const whatsappNumber = "918072487339";

export const fallbackProjects: Project[] = [
  {
    _id: "invoiceflow",
    title: "InvoiceFlow - Automation Dashboard",
    description: "Automated invoicing and reconciliation for B2B operations.",
    problem: "Reduce manual reconciliation and streamline billing flows.",
    architecture: "Event-driven services, queueing and idempotent processors.",
    wins: ["60% faster processing", "Observability + SLOs", "Role-based workflows"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    url: "#contact",
  },
  {
    _id: "opsforge",
    title: "OpsForge - Internal Ops Suite",
    description: "A clean command center for leads, tickets and team output.",
    problem: "Replace spreadsheet-led operations with a single source of truth.",
    architecture: "Next.js workspace, serverless actions and Sanity-managed content.",
    wins: ["Lead intake automation", "Reusable workflow modules", "Executive reporting"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    url: "#contact",
  },
  {
    _id: "booking",
    title: "Booking Automator",
    description: "Service booking flow with WhatsApp routing and CMS control.",
    problem: "Convert service interest into instant, structured sales conversations.",
    architecture: "Static React UI, Sanity content source and client-side WhatsApp handoff.",
    wins: ["Zero backend latency", "Editable packages", "Mobile-first conversion path"],
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1000&q=80",
    url: "#services",
  },
];

export const fallbackServices: Service[] = [
  {
    _id: "professional-website",
    title: "Professional Website",
    tag: "WEBSITE",
    price: "₹2000/-",
    description: "A focused, trust-building web presence for your business or personal brand.",
    deliverables: ["Website link", "Responsive one-page design", "Contact action setup"],
    tools: ["HTML", "CSS", "Javascript"],
  },
  {
    _id: "custom-development",
    title: "Custom Website Development",
    tag: "WEBSITE",
    price: "₹2999/-",
    description: "A custom website built around your offer, content and conversion path.",
    deliverables: ["Clean website for you", "Up to 3 pages", "WhatsApp call-to-action"],
    tools: ["Next.js", "React", "Sanity"],
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Jordhan Daniyel",
    role: "Founder",
    company: "Daniyel Studio",
    quote:
      "Ritish turned our scattered requirements into a fast, polished website that customers understood immediately. The WhatsApp booking flow started bringing leads the first week.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Mariya John",
    role: "Operations Lead",
    company: "Northline Services",
    quote:
      "The project felt premium from day one. We needed automation without complexity, and he shipped a dashboard our team could actually use.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
  },
];

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
