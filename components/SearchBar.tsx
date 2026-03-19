type SearchBarProps = {
  q?: string
  tag?: string
}

export function SearchBar({ q, tag }: SearchBarProps) {
  return (
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
  )
}