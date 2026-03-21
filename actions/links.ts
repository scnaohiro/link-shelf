"use server"

import { prisma } from "@/lib/prisma"
import ogs from "open-graph-scraper"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function addLink(formData: FormData) {
  const url = formData.get("url") as string
  const tagsInput = formData.get("tags") as string

  const tags = tagsInput
    ? tagsInput.split(",").map((t) => t.trim()).filter(Boolean)
    : []

  const { result } = await ogs({ url })

  const title = result.ogTitle ?? null
  const description = result.ogDescription ?? null
  const imageUrl = result.ogImage?.[0]?.url ?? null

  await prisma.link.create({
    data: { url, title, description, imageUrl, tags }
  })

  revalidatePath("/")
  redirect("/")
}

export async function deleteLink(id: string) {
  await prisma.link.delete({
    where: { id }
  })

  revalidatePath("/")
}

export async function updateLink(id: string, formData: FormData) {
  const url = formData.get("url") as string
  const tagsInput = formData.get("tags") as string

  const tags = tagsInput
    ? tagsInput.split(",").map((t) => t.trim()).filter(Boolean)
    : []

  const { result } = await ogs({ url })

  const title = result.ogTitle ?? null
  const description = result.ogDescription ?? null
  const imageUrl = result.ogImage?.[0]?.url ?? null

  await prisma.link.update({
    where: { id },
    data: { url, title, description, imageUrl, tags }
  })

  revalidatePath("/")
  redirect("/")
}

export async function toggleFavorite(id: string, currentValue: boolean) {
  await prisma.link.update({
    where: { id },
    data: { isFavorite: !currentValue }
  })

  revalidatePath("/")
}