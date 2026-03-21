import Link from "next/link"
import { auth, signOut } from "@/auth"

export async function Header() {
  const session = await auth()

  return (
    <div className="flex justify-between items-center mb-8">
      <Link href="/"><h1 className="text-xl font-semibold tracking-tight">Link Shelf</h1></Link>
      <div className="flex items-center gap-3">
        <Link href="/tags" className="text-sm text-gray-500 hover:text-gray-800">
          タグ一覧
        </Link>
        <span className="text-sm text-gray-400">
          {session?.user?.name}
        </span>
        <form action={async () => {
          "use server"
          await signOut()
        }}>
          <button
            type="submit"
            className="text-sm text-gray-500 hover:text-gray-800 border border-gray-200 hover:border-gray-300 px-3 py-1.5 rounded-lg transition-colors"
          >
            ログアウト
          </button>
        </form>
        <Link href="/postform">+新規作成</Link>
      </div>
    </div>
  )
}