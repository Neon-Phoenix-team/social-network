//
//
// /**
//  * HOF that wraps a base query function with additional functionality for data validation using zod
//  *
//  * @param baseQuery The base query function to be wrapped.
//  * @returns A modified version of the baseQuery with added data validation.
//  */
// export const baseQueryWithHandleError =
//   (baseQuery) => async (args, api, extraOptions) => {
//     // Call the original baseQuery function with the provided arguments
//     const result = await baseQuery(args, api, extraOptions);
//
//     if (result.error) {
//       console.log(result.error);
//     }
//
//     return result;
//   };
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
