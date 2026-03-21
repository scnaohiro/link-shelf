import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { EditLinkForm } from "@/components/EditLinkForm"

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const link = await prisma.link.findUnique({ where: { id } })

  if (!link) notFound()

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h2 className="text-lg font-semibold mb-4">リンクを編集</h2>
      <EditLinkForm link={link} />
    </main>
  )
}