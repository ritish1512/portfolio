'use client'

import { Star } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'

interface Review {
  _id: string
  name: string
  email: string
  rating: number
  review: string
  createdAt: string
}

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch('/api/reviews')
        const data = await response.json()
        if (data.success) {
          setReviews(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const reviewData = {
      name: formData.get('name'),
      email: formData.get('email'),
      rating: formData.get('rating'),
      review: formData.get('review'),
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      })

      const data = await response.json()
      if (data.success) {
        setReviews([data.data, ...reviews])
        ;(e.target as HTMLFormElement).reset()
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
      }
    } catch (error) {
      console.error('Failed to submit review:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0

  return (
    <section id="reviews" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-8 lg:px-10 lg:py-24">
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300 sm:text-sm">
          Client Feedback
        </p>
        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
          Client Reviews
        </h2>
        {reviews.length > 0 && (
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            <div>
              <p className="text-5xl font-black text-emerald-300 sm:text-6xl md:text-7xl">{averageRating}</p>
              <div className="mt-2 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < Math.round(Number(averageRating))
                        ? 'fill-emerald-300 text-emerald-300'
                        : 'text-slate-700'
                    }
                  />
                ))}
              </div>
              <p className="mt-2 text-sm text-slate-400 sm:text-base">{reviews.length} reviews</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-slate-400">Loading reviews...</p>
            </div>
          ) : reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 transition hover:border-emerald-400/50 sm:p-6"
                >
                  <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-semibold text-white text-lg sm:text-xl">{review.name}</p>
                      <p className="text-sm text-slate-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < review.rating
                              ? 'fill-emerald-300 text-emerald-300'
                              : 'text-slate-700'
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-7 sm:text-base">{review.review}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-10 text-center sm:p-12">
              <p className="text-slate-400 text-base">No reviews yet. Be the first to share your feedback!</p>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-slate-700/70 bg-slate-900/40 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300 sm:text-sm">
            Share Your Feedback
          </p>
          <h3 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">Write a Review</h3>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-300">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                required
                aria-label='Enter your name'
                placeholder="John Doe"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 sm:text-base sm:px-5 sm:py-4"
                suppressHydrationWarning
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                aria-label='Enter your email'
                placeholder="john@example.com"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 sm:text-base sm:px-5 sm:py-4"
                suppressHydrationWarning
              />
            </div>

            <div>
              <label htmlFor="rating" className="block text-sm font-semibold text-slate-300">
                Rating
              </label>
              <select
                id="rating"
                name="rating"
                required
                aria-label='Ratings'
                defaultValue="5"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 sm:text-base sm:px-5 sm:py-4"
                suppressHydrationWarning
              >
                <option value="5" aria-label='5stars'>⭐⭐⭐⭐⭐ Excellent</option>
                <option value="4" aria-label='4stars'>⭐⭐⭐⭐ Good</option>
                <option value="3" aria-label='3stars'>⭐⭐⭐ Average</option>
                <option value="2" aria-label='2stars'>⭐⭐ Fair</option>
                <option value="1" aria-label='1star'>⭐ Poor</option>
              </select>
            </div>

            <div>
              <label htmlFor="review" className="block text-sm font-semibold text-slate-300">
                Your Review
              </label>
              <textarea
                id="review"
                name="review"
                required
                minLength={10}
                maxLength={500}
                aria-label='Enter your Review'
                placeholder="Share your experience..."
                className="mt-2 min-h-28 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 sm:text-base sm:px-5 sm:py-4"
                suppressHydrationWarning
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              aria-label='Submit review'
              className="w-full rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950 transition disabled:opacity-50 hover:bg-emerald-400 sm:px-6 sm:py-4 sm:text-base"
              suppressHydrationWarning
            >
              {submitting ? 'Submitting...' : submitted ? 'Thank you!' : 'Submit Review'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
