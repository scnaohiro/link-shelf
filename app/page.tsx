import { addLink, deleteLink } from "@/actions/links"
import { prisma } from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"
import { auth, signOut } from "@/auth"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tag?: string }>
}) {
  const { q, tag } = await searchParams
  const session = await auth()

  const links = await prisma.link.findMany({
    where: {
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { description: { contains: q, mode: "insensitive" } },
              { url: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(tag ? { tags: { has: tag } } : {}),
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <main className="max-w-2xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Link Shelf</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {session?.user?.name}
          </span>
          <form action={async () => {
            "use server"
            await signOut()
          }}>
            <button type="submit" className="text-sm hover:underline">
              ログアウト
            </button>
          </form>
        </div>
      </div>

      <form action={addLink} className="flex flex-col gap-2 mb-4">
        <div className="flex gap-2">
          <input
            type="url"
            name="url"
            placeholder="https://..."
            required
            className="flex-1 border rounded px-3 py-2"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
          >
            保存
          </button>
        </div>
        <input
          type="text"
          name="tags"
          placeholder="タグ（カンマ区切り例: react, nextjs）"
          className="border rounded px-3 py-2"
        />
      </form>

      <form method="GET" className="mb-8">
        <input
          type="text"
          name="q"
          placeholder="検索..."
          defaultValue={q ?? ""}
          className="w-full border rounded px-3 py-2"
        />
        {tag && <input type="hidden" name="tag" value={tag} />}
      </form>

      {tag && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm">タグ：{tag}</span>
          <Link href="/" className="text-sm text-gray-500 hover:underline">
            クリア
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {links.map((link) => (
          <div key={link.id} className="border rounded p-4 flex gap-4 items-start">
            {link.imageUrl && (
              <Image
                src={link.imageUrl}
                alt={link.title ?? ""}
                width={120}
                height={80}
                className="object-cover rounded"
              />
            )}
            <div className="flex-1">
              <a
                href={link.url}
                target="_blank"
                className="font-bold hover:underline"
              >
                {link.title ?? link.url}
              </a>
              {link.description && (
                <p className="text-sm text-gray-500 mt-1">
                  {link.description}
                </p>
              )}
              {link.tags.length > 0 && (
                <div className="flex gap-1 mt-2">
                  {link.tags.map((t) => (
                    <a
                      key={t}
                      href={`/?tag=${t}`}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                    >
                      {t}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <form action={deleteLink.bind(null, link.id)}>
              <button
                type="submit"
                className="text-red-500 hover:text-red-700 text-sm"
              >
                削除
              </button>
            </form>
          </div>
        ))}
      </div>
    </main>
  )
}