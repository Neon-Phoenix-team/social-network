import { MenuItemPropsType } from './MenuItem/MenuItem'
import {
  HomeOutline,
  PlusSquare,
  PlusSquareOutline,
  Home,
  PersonOutline,
  MessageCircleOutline,
  MessageCircle,
  SearchOutline,
  Search,
  TrendingUpOutline,
  TrendingUp,
  BookmarkOutline,
  Bookmark,
  Person,
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
    path: '/profile',
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
]
