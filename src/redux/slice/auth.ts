import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  user: {
    name: string;
    email: string;
    password: string;
    accountType: "ADMIN" | "EMPLOYEE";
  } | null;
}
const storedUser = localStorage.getItem("user");
const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null; 
      localStorage.removeItem("auth_user");
    },
  },
});

export const { setUser,logout } = authSlice.actions;

export default authSlice.reducer;
