import { configureStore } from "@reduxjs/toolkit";
import employeesSlice from "./slice/employee";
import authSlice from "./slice/auth";

export const store = configureStore({
  reducer: {
    employees: employeesSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
