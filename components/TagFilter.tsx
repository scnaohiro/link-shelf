import Link from "next/link"

type TagFilterProps = {
  tag: string
  favorite?:string 
}

export function TagFilter({ tag, favorite }: TagFilterProps) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="text-sm">タグ：{tag}</span>
      <Link href={favorite === "true" ? "/?favorite=true" : "/"} className="text-sm text-gray-500 hover:underline">
        クリア
      </Link>
    </div>
  )
}