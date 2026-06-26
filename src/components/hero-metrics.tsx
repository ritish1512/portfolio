import { CheckCircle, Star, TrendingUp } from 'lucide-react'
import { connectDB } from '@/lib/db'
import { Review } from '@/lib/models/review'

interface MetricsData {
  projectsCount: number
  reviewsCount: number
  averageRating: number
}

async function getMetrics(): Promise<MetricsData> {
  try {
    // Fetch projects count from Sanity
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
    const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-06-26'
    const query = `*[_type == "project"] | order(orderRank asc, _createdAt desc) { _id }`
    const projectsUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(
      query,
    )}`

    const projectsRes = await fetch(projectsUrl, { next: { revalidate: 3600 } })
    const projectsData = await projectsRes.json()
    const projectsCount = projectsData.result?.length || 0

    // Fetch reviews count from MongoDB
    await connectDB()
    const reviews = await Review.find({})
    const averageRating =
      reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0

    return {
      projectsCount,
      reviewsCount: reviews.length,
      averageRating: Number(averageRating),
    }
  } catch (error) {
    console.error('Error fetching metrics:', error)
    return {
      projectsCount: 0,
      reviewsCount: 0,
      averageRating: 0,
    }
  }
}

export async function HeroMetrics() {
  const metrics = await getMetrics()

  return (
    <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8">
      {/* Projects Metric */}
      <div className="group rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4 transition hover:border-emerald-400/50 hover:bg-emerald-400/10 sm:p-6 md:p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-3xl font-black text-emerald-300 sm:text-4xl md:text-5xl">
              {metrics.projectsCount}
            </p>
            <p className="mt-2 text-xs font-semibold text-slate-400 sm:text-sm">
              Projects Delivered
            </p>
          </div>
          <div className="rounded-lg bg-emerald-400/10 p-2 transition group-hover:bg-emerald-400/20">
            <CheckCircle size={20} className="text-emerald-300" />
          </div>
        </div>
      </div>

      {/* Reviews Metric */}
      <div className="group rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4 transition hover:border-emerald-400/50 hover:bg-emerald-400/10 sm:p-6 md:p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-3xl font-black text-emerald-300 sm:text-4xl md:text-5xl">
              {metrics.reviewsCount}
            </p>
            <p className="mt-2 text-xs font-semibold text-slate-400 sm:text-sm">
              Client Reviews
            </p>
          </div>
          <div className="rounded-lg bg-emerald-400/10 p-2 transition group-hover:bg-emerald-400/20">
            <Star size={20} className="fill-emerald-300 text-emerald-300" />
          </div>
        </div>
      </div>

      {/* Rating Metric */}
      {metrics.reviewsCount > 0 && (
        <div className="group rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4 transition hover:border-emerald-400/50 hover:bg-emerald-400/10 sm:p-6 md:p-8 sm:col-span-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-3xl font-black text-emerald-300 sm:text-4xl md:text-5xl">
                {metrics.averageRating}
              </p>
              <p className="mt-2 text-xs font-semibold text-slate-400 sm:text-sm">
                Avg Rating
              </p>
            </div>
            <div className="rounded-lg bg-emerald-400/10 p-2 transition group-hover:bg-emerald-400/20">
              <TrendingUp size={20} className="text-emerald-300" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
