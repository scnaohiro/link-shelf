import Link from "next/link"

type TagFilterProps = {
  tag: string
}

export function TagFilter({ tag }: TagFilterProps) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="text-sm">タグ：{tag}</span>
      <Link href="/" className="text-sm text-gray-500 hover:underline">
        クリア
      </Link>
    </div>
  )
}