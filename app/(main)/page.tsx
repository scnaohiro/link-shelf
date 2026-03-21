import { LinkList } from "@/components/LinkList"
import { SearchBar } from "@/components/SearchBar"
import { TagFilter } from "@/components/TagFilter"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import Link from "next/link"

const ITEMS_PER_PAGE = 10

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tag?: string; favorite?: string; sort?: string; page?: string }>
}) {
  const { q, tag, favorite, sort, page } = await searchParams
  const currentPage = Number(page ?? 1)

  const where: Prisma.LinkWhereInput = {
    ...(q ? {
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { url: { contains: q, mode: "insensitive" } },
      ],
    } : {}),
    ...(tag ? { tags: { has: tag } } : {}),
    ...(favorite === "true" ? { isFavorite: true } : {}),
  }

  const [links, totalCount] = await Promise.all([
    prisma.link.findMany({
      where,
      orderBy: { createdAt: sort === "asc" ? "asc" : "desc" },
      take: ITEMS_PER_PAGE,
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
    }),
    prisma.link.count({ where }),
  ])

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  return (
    <main className="max-w-2xl mx-auto p-8">
      <SearchBar q={q} tag={tag} />
      <div className="flex gap-2 mb-4">
        <Link
          href={`/?${new URLSearchParams({ ...(q ? { q } : {}), ...(tag ? { tag } : {}), ...(favorite === "true" ? { favorite } : {}), sort: "desc" }).toString()}`}
          className={`text-sm px-3 py-1 rounded-full border transition-colors ${sort !== "asc" ? "border-gray-800 text-gray-800" : "border-gray-200 text-gray-400"
            }`}
        >
          新着順
        </Link>
        <Link
          href={`/?${new URLSearchParams({ ...(q ? { q } : {}), ...(tag ? { tag } : {}), ...(favorite === "true" ? { favorite } : {}), sort: "asc" }).toString()}`}
          className={`text-sm px-3 py-1 rounded-full border transition-colors ${sort === "asc" ? "border-gray-800 text-gray-800" : "border-gray-200 text-gray-400"
            }`}
        >
          古い順
        </Link>
      </div>
      {tag && <TagFilter tag={tag} favorite={favorite} />}
      <LinkList links={links} />
      {/* ページネーション */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Link
            key={p}
            href={`/?${new URLSearchParams({
              ...(q ? { q } : {}),
              ...(tag ? { tag } : {}),
              ...(favorite === "true" ? { favorite } : {}),
              ...(sort ? { sort } : {}),
              page: String(p),
            }).toString()}`}
            className={`text-sm px-3 py-1 rounded border transition-colors ${currentPage === p
                ? "border-gray-800 text-gray-800"
                : "border-gray-200 text-gray-400 hover:border-gray-400"
              }`}
          >
            {p}
          </Link>
        ))}
      </div>
    </main>
  )
}