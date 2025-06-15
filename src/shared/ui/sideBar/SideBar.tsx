import s from './sideBarItem/SideBarItem.module.scss'
import { SideBarItem } from '@/shared/ui/sideBar/sideBarItem/SideBarItem'

export const SideBar = () => {
  return (
    <aside className={s.aside}>
      <div className={s.top}>
        <SideBarItem iconId={'home'} name={'Feed'} href={'/feed'} />
        <SideBarItem iconId={'create'} name={'Create'} href={'/create'} />
        <SideBarItem iconId={'my_profile'} name={'My Profile'} href={'/profile'} />
        <SideBarItem iconId={'messenger'} name={'Messenger'} href={'/messenger'} />
      </div>
      <div className={s.middle}>
        <SideBarItem iconId={'statistics'} name={'Statistics'} href={'/statistics'} />
        <SideBarItem iconId={'favorites'} name={'Favorites'} href={'/favorites'} />
      </div>
      <div className={s.bottom}>
        <SideBarItem iconId={'logOut'} name={'Log Out'} href={'/logOut'} />
      </div>
    </aside>
  )
}
