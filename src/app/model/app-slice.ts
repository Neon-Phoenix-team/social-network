import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    error: null as null | string,
  },
  reducers: create => {
    return {
      setAppErrorAC: create.reducer<{ error: null | string }>(
        (state, action) => {
          state.error = action.payload.error
        }
      ),
    }
  },
  selectors: {
    selectError: state => state.error,
  },
})
export const { setAppErrorAC } =  appSlice.actions
export const appReducer = appSlice.reducer
export const { selectError } = appSlice.selectors
