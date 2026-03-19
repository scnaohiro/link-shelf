import Image from "next/image"
import Link from "next/link"
import { deleteLink } from "@/actions/links"
import type { Link as LinkType } from "@/types"

type LinkCardProps = {
  link: LinkType
}

export function LinkCard({ link }: LinkCardProps) {
  const hostname = new URL(link.url).hostname

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors">
      {link.imageUrl && (
        <div className="w-full h-36 relative">
          <Image
            src={link.imageUrl}
            alt={link.title ?? ""}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1">{hostname}</p>
        <a
          href={link.url}
          target="_blank"
          className="text-sm font-medium hover:underline line-clamp-2"
        >
          {link.title ?? link.url}
        </a>
        {link.description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {link.description}
          </p>
        )}
        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-1 flex-wrap">
            {link.tags.map((t) => (
              <Link
                key={t}
                href={`/?tag=${t}`}
                className="text-xs px-2 py-0.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                {t}
              </Link>
            ))}
          </div>
          <form action={deleteLink.bind(null, link.id)}>
            <button
              type="submit"
              className="text-xs text-red-400 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded transition-colors"
            >
              削除
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}