import { EmployeeCard } from "@/components/employee-card";
import Loader from "@/components/loader";
import { EmployeeType } from "@/types/type";

import { useEmployees } from "@/utils/hooks/useEmployees";
export default function EmployeeListPage() { 
  const { data: employeesData, loading } = useEmployees();
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="max-w-[1080px] w-11/12 mx-auto my-6">
      <div className="space-y-4">
        {employeesData?.map((employee: EmployeeType) => (
          <EmployeeCard employee={employee} key={employee.id}/>
        ))}
      </div>
    </div>
  );
}
