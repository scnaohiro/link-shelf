import { auth, signOut } from "@/auth"
import Link from "next/link"

export async function Header() {
  const session = await auth()

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-xl font-semibold tracking-tight">Link Shelf</h1>
      <div className="flex items-center gap-3">
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