import s from './Menu.module.scss'
import { menu } from './menuData'
import { MenuItem } from './MenuItem/MenuItem'

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
                (index === 4 ? s.extraSpace : '') ||
                (index === menu.length - 1 ? s.last : '')
              }
            />
          )
        })}
      </ul>
    </aside>
  )
}
export default Menu
