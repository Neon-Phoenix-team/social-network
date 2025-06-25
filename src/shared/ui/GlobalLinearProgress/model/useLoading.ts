import { useAppSelector } from '@/shared/hooks/useAppSelector'


export const useIsLoading = () => {
  return useAppSelector((state) => {
    const queries = state.api.queries
    const mutations = state.api.mutations

    const isLoadingQueries = Object.values(queries).some((q) => q?.status === "pending")
    const isLoadingMutations = Object.values(mutations).some((m) => m?.status === "pending")

    return isLoadingQueries || isLoadingMutations
  })
}
