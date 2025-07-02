import s from './SideBarItem.module.scss'
import { Icon } from '@/shared/ui/icon/Icon'

type SideBarItem = {
  iconId: string
  name: string
  href: string
  color?: string
}

export const SideBarItem = ({ iconId, name, href }: SideBarItem) => {
  return (
    <a href={href} className={s.flexWrapper}>
      <Icon iconId={iconId} />
      <span>{name}</span>
    </a>
  )
}
