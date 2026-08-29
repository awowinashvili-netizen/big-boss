import { Link } from 'react-router-dom'
import IconArrow from '~icons/solar/arrow-right-linear'
import { Media } from '@/components/media/Media'

export function CategoryCard({
  to,
  label,
  image,
}: {
  to: string
  label: string
  image: string
}) {
  return (
    <Link
      to={to}
      data-card
      viewTransition
      className="group block overflow-hidden rounded-md border border-line bg-surface shadow-card transition-colors hover:border-line-strong"
    >
      {/* Label already names the card, so the image is decorative here. */}
      <Media
        src={image}
        alt=""
        ratio="16 / 10"
        mediaClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
      <div className="flex items-center justify-between gap-3 px-4 py-3.5">
        <span className="display text-title text-fg">{label}</span>
        <IconArrow
          className="size-4 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </Link>
  )
}
