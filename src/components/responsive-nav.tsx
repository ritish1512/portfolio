'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { FaGithub, FaLinkedin, FaInstagram, FaYoutubeSquare } from 'react-icons/fa'
import { GrContact } from 'react-icons/gr'

const navItems = [
  { label: 'Projects', href: '#projects' },
  { label: 'Videos', href: '#videos' },
  { label: 'Services', href: '#services' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Reviews', href: '#reviews' },
]

export function ResponsiveNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 md:px-8">
      <a href="#hero" className="flex items-center gap-3 font-semibold tracking-tight text-white text-sm sm:text-base">
        <div className="relative h-9 w-9 rounded-3xl border border-emerald-400/60 overflow-hidden">
          <Image
            src="/logo-square.png"
            alt="Ritish Logo"
            width={36}
            height={45}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        Ritish Builds
      </a>

      <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex md:gap-8 lg:text-base">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className="transition hover:text-white">
            {item.label}
          </a>
        ))}
      </div>

      <div className="hidden items-center gap-3 md:flex">
        <a
          href="#contact"
          className="rounded-full border border-emerald-400/50 px-5 py-2 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400 hover:text-slate-950"
        >
          Get In Touch
        </a>
        <div className="flex items-center gap-2">
          <NavIcon href="https://github.com/ritish1512/" label="GitHub">
            <FaGithub />
          </NavIcon>
          <NavIcon href="https://www.linkedin.com/in/ritish1907" label="LinkedIn">
            <FaLinkedin />
          </NavIcon>
          <NavIcon href="https://www.instagram.com/ritishbuilds/" label="Instagram">
            <FaInstagram />
          </NavIcon>
          <NavIcon href="#contact" label="Contact">
            <GrContact />
          </NavIcon>
          <NavIcon href="https://www.youtube.com/@ritishbuilds" label="YouTube">
            <FaYoutubeSquare />
          </NavIcon>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:border-emerald-400 hover:text-white md:hidden ${open ? ' rotate-90' : 'rotate-0'} transition-all duration-300`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        suppressHydrationWarning
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

        {open && <div className='absolute h-screen w-screen inset-x-0 top-full z-49 bg-[#0D1117]/95 backdrop-blur-xl '/>}
        <div className={`absolute inset-x-0 top-full z-50 rounded-b-3xl border-t border-white/10  px-5 pb-6 pt-4  shadow-2xl md:hidden ${open ? 'scale-y-full' : 'scale-y-0'} transition-all duration-300 origin-top`}>
            <div className="flex flex-wrap items-center gap-3 mb-6 justify-center">
                <NavIcon href="https://github.com/ritish1512/" label="GitHub">
                <FaGithub />
                </NavIcon>
                <NavIcon href="https://www.linkedin.com/in/ritish1907" label="LinkedIn">
                <FaLinkedin />
                </NavIcon>
                <NavIcon href="https://www.instagram.com/ritishbuilds/" label="Instagram">
                <FaInstagram />
                </NavIcon>
                <NavIcon href="https://www.youtube.com/@ritishbuilds" label="YouTube">
                <FaYoutubeSquare />
                </NavIcon>
          </div>
          <div className="space-y-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-base font-medium text-white transition hover:border-emerald-400/50 hover:bg-slate-900"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-emerald-400/50 bg-emerald-400/10 px-4 py-3 text-base font-semibold text-emerald-300 transition hover:bg-emerald-400 hover:text-slate-950"
            onClick={() => setOpen(false)}
          >
            Get In Touch
          </a>
          
        </div>
      
    </div>
  )
}

function NavIcon({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:border-emerald-400 hover:text-white"
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
    >
      {children}
    </a>
  )
}

