'use client'

import { Send } from 'lucide-react'
import { FormEvent, useState } from 'react'

const faqData = [
  {
    question: 'What is your typical project timeline?',
    answer: 'Most projects take 2-8 weeks depending on scope and complexity.',
  },
  {
    question: 'Do you offer post-launch support?',
    answer: 'Yes, I provide 30 days of free support after launch, with additional support packages available.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'I accept bank transfers, UPI, and cryptocurrency. Payment plans are available for larger projects.',
  },
  {
    question: 'Can you work with my existing team?',
    answer: 'Absolutely! I integrate seamlessly with remote teams and can work with your existing developers.',
  },
  {
    question: 'Do you sign NDAs?',
    answer: 'Yes, I can sign NDAs to protect confidential project information.',
  },
  {
    question: 'What technologies do you specialize in?',
    answer: 'I specialize in full-stack development with Next.js, Node.js, MongoDB, and cloud deployment.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [customQuestion, setCustomQuestion] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function buildWhatsAppUrl(text: string): string {
    const message = encodeURIComponent(text)
    return `https://wa.me/918072487339?text=${message}`
  }

  function submitQuestion(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!customQuestion.trim()) return

    const message = `Hi Ritish, I have a question:\n\n${customQuestion.trim()}`
    setCustomQuestion('')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    window.location.href = buildWhatsAppUrl(message)
  }

  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-8 lg:px-10 lg:py-24">
      <div className="mb-12 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300 sm:text-sm">
          Questions & Answers
        </p>
        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
          Frequently Asked
        </h2>
        <p className="mt-6 text-base leading-8 text-slate-400 sm:text-lg">
          Can&apos;t find your answer? Send me a message on WhatsApp and I&apos;ll get back to you right away.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <button
              aria-label='open faq'
              key={index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 transition hover:border-emerald-400/50"
              suppressHydrationWarning
            >
              <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
                <h3 className="text-left text-base font-semibold text-white sm:text-lg md:text-xl">
                  {faq.question}
                </h3>
                <span
                  className={`shrink-0 text-emerald-300 transition ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </div>
              {openIndex === index && (
                <div className="border-t border-white/10 px-5 py-4 text-left text-slate-300 sm:px-6 sm:py-5 sm:text-base">
                  {faq.answer}
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-700/70 bg-slate-900/40 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300 sm:text-sm">
            Ask a Question
          </p>
          <h3 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
            Still have questions?
          </h3>
          <p className="mt-4 text-base text-slate-400 sm:text-lg">
            Send your question directly to WhatsApp and I&apos;ll answer within 24 hours.
          </p>

          <form onSubmit={submitQuestion} className="mt-6 space-y-4">
            <textarea
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              placeholder="What would you like to know?"
              aria-label='Add custom message'
              className="min-h-32 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 sm:text-base sm:px-5 sm:py-4"
            />
            <button
              type="submit"
              disabled={!customQuestion.trim()}
              aria-label="Send message"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950 transition disabled:opacity-50 hover:bg-emerald-400 sm:px-6 sm:py-4 sm:text-base"
            >
              {submitted ? 'Opening WhatsApp...' : 'Ask on WhatsApp'} <Send size={18} />
            </button>
          </form>

          <p className="mt-4 text-xs text-slate-400 sm:text-sm">
            📱 Direct message to: +91 8072487339
          </p>
        </div>
      </div>
    </section>
  )
}
