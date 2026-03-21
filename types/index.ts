export type Link = {
  id: string
  url: string
  title: string | null
  description: string | null
  imageUrl: string | null
  tags: string[]
  createdAt: Date
  isFavorite: boolean
}