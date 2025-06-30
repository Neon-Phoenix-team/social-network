import {
  BaseQueryApi,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query/react'
import { setAppErrorAC } from '@/app/model/app-slice'
import { isErrorWithMessage } from '@/shared/utils'



export const handleError = (
  api: BaseQueryApi,
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
) => {
  let error = 'Some error occurred'
  if (result.error) {
    const { status, data } = result.error
    switch (status) {
      case 'FETCH_ERROR':
      case 'PARSING_ERROR':
      case 'CUSTOM_ERROR':
        error = result.error.error
        break
      case 403:
        error = '403 Forbidden Error. Check API-KEY'
        break
      case 400:
        error = (data as { messages: Error[] }).messages[0].message
        break
      case 500:
        if (isErrorWithMessage(data)) {
          error = data.message
        } else {
          error = JSON.stringify(data)
        }
        break
      // default:
      //   error = JSON.stringify(result.error)
      //   break
    }
    api.dispatch(setAppErrorAC({ error }))
  }
}
