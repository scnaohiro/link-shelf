import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function TagsPage() {
  const links = await prisma.link.findMany({
    select: { tags: true }
  })

  // 全タグを集めてカウント
  const tagCount = links
    .flatMap((link) => link.tags)
    .reduce((acc, tag) => {
      acc[tag] = (acc[tag] ?? 0) + 1
      return acc
    }, {} as Record<string, number>)

  const tags = Object.entries(tagCount).sort((a, b) => b[1] - a[1])

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h2 className="text-lg font-semibold mb-4">タグ一覧</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/?tag=${tag}`}
            className="text-sm px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
          >
            {tag} ({count})
          </Link>
        ))}
      </div>
    </main>
  )
}