'use client'

import s from './Menu.module.scss'
import { menu } from './menuData'
import { MenuItem } from './MenuItem/MenuItem'
import { LogOut } from '@/shared/ui/Menu/LogOut/LogOut'


const Menu = () => {


  return (
    <aside className={s.aside}>
      <ul className={s.list}>

        {menu.map((item, index) => {
          return (
            <MenuItem
              {...item}
              key={index}
              className={
                (index === 4 ? s.extraSpace : '')
              }
            />
          )
        })}
        <li className={s.last}>
          <LogOut />
        </li>
      </ul>
    </aside>
  )
}
export default Menu
