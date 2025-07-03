import s from './SideBarItem.module.scss'
// import { Icon } from '@/shared/ui/Icon/Icon'

type SideBarItem = {
  iconId: string
  name: string
  href: string
  color?: string
}

export const SideBarItem = ({ name, href }: SideBarItem) => {
  return (
    <a href={href} className={s.flexWrapper}>
      {/*<Icon iconId={iconId} />*/}
      <span>{name}</span>
    </a>
  )
}
