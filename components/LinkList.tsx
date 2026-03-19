import type { Link as LinkType } from "@/type"
import { LinkCard } from "./LinkCard"

type LinkListProps = {
  links: LinkType[]
}

export function LinkList({ links }: LinkListProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  )
}