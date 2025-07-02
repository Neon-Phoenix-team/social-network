import { MenuItemPropsType } from './MenuItem/MenuItem'
import {
  Bookmark,
  BookmarkOutline,
  Home,
  HomeOutline,
  MessageCircle,
  MessageCircleOutline,
  Person,
  PersonOutline,
  PlusSquare,
  PlusSquareOutline,
  Search,
  SearchOutline,
  TrendingUp,
  TrendingUpOutline,
} from '@/assets/icons/components'

export const menu: MenuItemPropsType[] = [
  {
    name: 'Feed',
    path: '/feed',
    icon: <HomeOutline />,
    iconActive: <Home />,
  },
  {
    name: 'Create',
    path: '/create',
    icon: <PlusSquareOutline />,
    iconActive: <PlusSquare />,
  },
  {
    name: 'My Profile',
    path: '/my-profile',
    icon: <PersonOutline />,
    iconActive: <Person />,
  },
  {
    name: 'Messenger',
    path: '/messenger',
    icon: <MessageCircleOutline />,
    iconActive: <MessageCircle />,
  },
  {
    name: 'Search',
    path: '/search',
    icon: <SearchOutline />,
    iconActive: <Search />,
  },
  {
    name: 'Statistics',
    path: '/statistics',
    icon: <TrendingUpOutline />,
    iconActive: <TrendingUp />,
  },
  {
    name: 'Favorites',
    path: '/favorites',
    icon: <BookmarkOutline />,
    iconActive: <Bookmark />,
  },
  // {
  //   name: 'Log Out',
  //   path: '/#',
  //   icon: <LogOutOutline />,
  //   iconActive: <LogOut />,
  // },
]
