import { addLink } from "@/actions/links"

export function AddLinkForm() {
  return (
    <form action={addLink} className="flex flex-col gap-2 mb-6">
      <div className="flex gap-2">
        <input
          type="url"
          name="url"
          placeholder="https://..."
          required
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
        />
        <button
          type="submit"
          className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          保存
        </button>
      </div>
      <input
        type="text"
        name="tags"
        placeholder="タグ（カンマ区切り例: react, nextjs）"
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
      />
    </form>
  )
}