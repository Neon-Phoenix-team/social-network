import s from './Menu.module.scss'
import {
  HomeOutline,
  Home,
  PlusSquareOutline,
  PersonOutline,
  MessageCircleOutline,
  SearchOutline,
  TrendingUpOutline,
  BookmarkOutline,
  LogOutOutline,
} from '@/assets/icons/components'
import { menu } from './menuData'
import { MenuItem } from './MenuItem/MenuItem'
import { useRouter } from 'next/router'

type MenuPropsTypes = {
  open: boolean
  handlOpen: () => void
}

const Menu = (props?: MenuPropsTypes) => {
  return (
    <aside className={s.aside}>
      <ul className={s.list}>
        {menu.map((item, i) => (
          <MenuItem {...item} key={i} />
        ))}
      </ul>
    </aside>
  )
}
export default Menu
