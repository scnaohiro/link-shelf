import { LinkList } from "@/components/LinkList"
import { SearchBar } from "@/components/SearchBar"
import { TagFilter } from "@/components/TagFilter"
import { prisma } from "@/lib/prisma"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tag?: string }>
}) {
  const { q, tag } = await searchParams

  const links = await prisma.link.findMany({
    where: {
      ...(q ? {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
          { url: { contains: q, mode: "insensitive" } },
        ],
      } : {}),
      ...(tag ? { tags: { has: tag } } : {}),
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <main className="max-w-2xl mx-auto p-8">
      <SearchBar q={q} tag={tag} />
      {tag && <TagFilter tag={tag} />}
      <LinkList links={links} />
    </main>
  )
}