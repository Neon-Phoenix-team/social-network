import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithErrorHandler } from '@/shared/utils'

export const baseApi = createApi({
  baseQuery: baseQueryWithErrorHandler,
  endpoints: () => ({}),
})
