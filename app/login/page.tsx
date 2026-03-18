import { signIn } from "@/auth"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="border rounded p-8 flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Link Shelf</h1>
        <form action={async () => {
          "use server"
          await signIn("github")
        }}>
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded flex items-center gap-2"
          >
            GitHubでログイン
          </button>
        </form>
      </div>
    </main>
  )
}