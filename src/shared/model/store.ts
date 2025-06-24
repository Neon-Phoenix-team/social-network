import { configureStore } from '@reduxjs/toolkit'

import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from '@/shared/api/baseApi'

// объединение reducer'ов с помощью combineReducers

// создание store
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
// для возможности обращения к store в консоли браузера
