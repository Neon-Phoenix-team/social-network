import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/shared/api/store'


export const useAppDispatch: () => AppDispatch = useDispatch