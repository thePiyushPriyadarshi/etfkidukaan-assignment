import { configureStore } from '@reduxjs/toolkit'
import employeesSlice from './slice/employee'

export const store = configureStore({
  reducer: {
    employees: employeesSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch