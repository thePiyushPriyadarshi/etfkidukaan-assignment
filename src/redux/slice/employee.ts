import { EmployeeType } from "@/types/type";
import { apiConnector } from "@/utils/api-connector";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

export interface EmployeeState {
  data: EmployeeType[];
  loading: boolean;
  stale: boolean;
}

const initialState: EmployeeState = {
  data: [],
  loading: false,
  stale: false,
};
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_) => {
    try {
      const response = await apiConnector("GET", "/employees");
      return response;
    } catch (error: unknown) {
      toast.error("Error in fetching employees")
      console.log(error);
    }
  }
);
export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.data = action.payload;
    },
    setStale:(state, action) => {
        state.stale = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.stale = false;
      });
  },
});

export const { setEmployees,setStale } = employeesSlice.actions;

export default employeesSlice.reducer;
