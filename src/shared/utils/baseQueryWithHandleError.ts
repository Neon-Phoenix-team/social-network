import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'

import { handleError } from '@/shared/utils/handleError'
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: headers => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
  credentials: 'include'
})

export const baseQueryWithErrorHandler: BaseQueryFn = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions)
  console.log(result)
  handleError(api, result)

  return result
}
