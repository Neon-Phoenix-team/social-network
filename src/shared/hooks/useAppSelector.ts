import { useSelector } from 'react-redux'
import { RootState } from '@/shared/api/store'

export const useAppSelector = useSelector.withTypes<RootState>()