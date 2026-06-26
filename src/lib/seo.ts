import type { Metadata } from "next";

const fallbackSiteUrl = "http://localhost:3000";

export const siteUrl = (() => {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : fallbackSiteUrl);

  return configuredUrl.replace(/\/$/, "");
})();

export const siteMetadata = {
  name: "Ritish Builds",
  title: "Ritish Builds | Full-Stack Web Applications and Automation",
  description:
    "Ritish builds custom full-stack web applications, automation dashboards, Sanity-powered websites, and booking flows for growing businesses.",
  url: siteUrl,
  locale: "en_IN",
  author: "Ritish",
  creator: "Ritish Builds",
  keywords: [
    "Ritish Builds",
    "full-stack developer",
    "Next.js developer",
    "Sanity CMS developer",
    "web application development",
    "business automation",
    "custom website development",
    "portfolio",
  ],
  social: {
    github: "https://github.com/ritish1512/",
    linkedin: "https://www.linkedin.com/in/ritish1907",
    instagram: "https://www.instagram.com/ritishbuilds/",
    youtube: "https://www.youtube.com/@ritishbuilds",
  },
  phone: "+91 8072487339",
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.name}`,
  },
  description: siteMetadata.description,
  applicationName: siteMetadata.name,
  authors: [{ name: siteMetadata.author, url: siteMetadata.url }],
  creator: siteMetadata.creator,
  publisher: siteMetadata.creator,
  keywords: siteMetadata.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteMetadata.name,
    title: siteMetadata.title,
    description: siteMetadata.description,
    locale: siteMetadata.locale,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Ritish Builds full-stack engineering portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: ["/twitter-image"],
    creator: "@ritishbuilds",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo-square.png",
  },
  category: "technology",
};

export function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export function buildStructuredData() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteMetadata.url}/#person`,
    name: siteMetadata.author,
    url: siteMetadata.url,
    image: `${siteMetadata.url}/logo-square.png`,
    jobTitle: "Full-Stack Developer",
    telephone: siteMetadata.phone,
    sameAs: Object.values(siteMetadata.social),
    knowsAbout: [
      "Next.js",
      "React",
      "Sanity CMS",
      "Node.js",
      "MongoDB",
      "Business automation",
      "Full-stack web development",
    ],
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteMetadata.url}/#organization`,
    name: siteMetadata.name,
    url: siteMetadata.url,
    logo: `${siteMetadata.url}/logo-square.png`,
    description: siteMetadata.description,
    founder: { "@id": `${siteMetadata.url}/#person` },
    sameAs: Object.values(siteMetadata.social),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteMetadata.phone,
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["English"],
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteMetadata.url}/#website`,
    name: siteMetadata.name,
    url: siteMetadata.url,
    description: siteMetadata.description,
    publisher: { "@id": `${siteMetadata.url}/#organization` },
    inLanguage: "en-IN",
  };

  const services = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteMetadata.url}/#services`,
    name: "Web development services",
    itemListElement: [
      {
        "@type": "Offer",
        position: 1,
        name: "Professional Website",
        url: `${siteMetadata.url}/#services`,
        price: "2000",
        priceCurrency: "INR",
        itemOffered: {
          "@type": "Service",
          name: "Professional Website",
          serviceType: "Website design and development",
        },
      },
      {
        "@type": "Offer",
        position: 2,
        name: "Custom Website Development",
        url: `${siteMetadata.url}/#services`,
        price: "2999",
        priceCurrency: "INR",
        itemOffered: {
          "@type": "Service",
          name: "Custom Website Development",
          serviceType: "Next.js and Sanity CMS development",
        },
      },
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteMetadata.url}/#faq-schema`,
    mainEntity: [
      {
        "@type": "Question",
        name: "What is your typical project timeline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most projects take 2-8 weeks depending on scope and complexity.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer post-launch support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Ritish provides 30 days of free support after launch, with additional support packages available.",
        },
      },
      {
        "@type": "Question",
        name: "What technologies do you specialize in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ritish specializes in full-stack development with Next.js, Node.js, MongoDB, Sanity CMS, and cloud deployment.",
        },
      },
    ],
  };

  return [person, organization, website, services, faq];
}
