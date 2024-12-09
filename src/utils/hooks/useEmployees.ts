import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchEmployees } from "@/redux/slice/employee";

export const useEmployees = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, stale } = useSelector(
    (state: RootState) => state.employees
  );

  useEffect(() => {
    if (data?.length === 0 || stale) {
      dispatch(fetchEmployees());
    }
  }, [data, dispatch, stale]);

  return { data, loading };
};
