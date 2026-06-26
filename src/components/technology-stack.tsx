import { Code2 } from 'lucide-react'

type TechItem = {
  name: string
  icon?: string
  description?: string
}

type TechCategory = {
  category: string
  technologies: TechItem[]
}

async function getTechStack(): Promise<TechCategory[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-06-26'

  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(
    '*[_type == "technology"] | order(_createdAt asc) { category, technologies }',
  )}`

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } })
    if (!response.ok) return []
    const data = (await response.json()) as { result: TechCategory[] }
    return data.result || []
  } catch {
    return []
  }
}

function getTechIcon(iconName: string | undefined): string {
  if (!iconName) return '⚙️'

  const iconMap: Record<string, string> = {
    react: '⚛️',
    nextjs: '▲',
    nodejs: '🟢',
    typescript: '🔷',
    mongodb: '🍃',
    sanity: '✨',
    tailwind: '🌪️',
    postgres: '🐘',
    python: '🐍',
    express: '⚡',
    prisma: '◆',
    graphql: '◆',
    docker: '🐳',
    aws: '☁️',
    vercel: '▲',
  }

  return iconMap[iconName.toLowerCase()] || '⚙️'
}

export async function TechnologyStack() {
  const categories = await getTechStack()

  if (!categories.length) {
    return null
  }

  return (
    <section id="tech-stack" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-8 lg:px-10 lg:py-24">
      <div className="mb-12 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300 sm:text-sm">
          Tech Stack
        </p>
        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
          Tools & Technologies I Use
        </h2>
        <p className="mt-6 text-base leading-7 text-slate-400 sm:text-lg">
          A curated selection of modern technologies that power fast, scalable, and maintainable
          applications.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:gap-10">
        {categories.map((category) => (
          <div
            key={category.category}
            className="rounded-3xl border border-slate-700/70 bg-slate-900/40 p-6 transition hover:border-emerald-400/30 sm:p-7 md:p-8"
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl border border-emerald-400/30 bg-emerald-400/10">
                <Code2 size={24} className="text-emerald-300" />
              </div>
              <h3 className="text-2xl font-black capitalize tracking-tight sm:text-3xl">
                {category.category}
              </h3>
            </div>

            <div className="space-y-4">
              {category.technologies?.map((tech) => (
                <div key={tech.name} className="flex items-start gap-4">
                  <span className="text-3xl">{getTechIcon(tech.icon)}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{tech.name}</p>
                    {tech.description && (
                      <p className="mt-1 text-sm text-slate-400">{tech.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
