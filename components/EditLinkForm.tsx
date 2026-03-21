import { updateLink } from "@/actions/links"
import type { Link } from "@/types"

type EditLinkFormProps = {
  link: Link
}

export function EditLinkForm({ link }: EditLinkFormProps) {
  const action = updateLink.bind(null, link.id)

  return (
    <form action={action} className="flex flex-col gap-2">
      <input
        type="url"
        name="url"
        defaultValue={link.url}
        required
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
      />
      <input
        type="text"
        name="tags"
        defaultValue={link.tags.join(", ")}
        placeholder="タグ（カンマ区切り例: react, nextjs）"
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
      />
      <button
        type="submit"
        className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
      >
        更新
      </button>
    </form>
  )
}