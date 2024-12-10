import { EmployeeCard } from "@/components/employee-card";
import Loader from "@/components/loader";
import {
  SelectContent,
  SelectItem, 
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { EmployeeType } from "@/types/type";

import { useEmployees } from "@/utils/hooks/useEmployees";
import { createListCollection, Input, Separator } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const departments = createListCollection({
  items: [
    { value: "", label: "Select Department" },
    { value: "IT", label: "IT" },
    { value: "Operations", label: "Operations" },
    { value: "Design", label: "Design" },
    { value: "Analytics", label: "Analytics" },
  ],
});

export default function EmployeeListPage() {
  const { data, loading } = useEmployees();
  const [employeesData, setEmployeesData] = useState(data);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterDepartment, setFilterDepartment] = useState<string>("");

  useEffect(() => {
    const searchData = data?.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchValue.toLowerCase()) &&
        employee.department
          .toLowerCase()
          .includes(filterDepartment.toLowerCase())
    );
    // const filterData = data.filter
    setEmployeesData(searchData);
  }, [searchValue, data, filterDepartment]);

  if (loading || !employeesData) {
    return <Loader />;
  }
  return (
    <div className="max-w-[1080px] w-11/12 mx-auto my-6">
      <div className="grid grid-cols-1 w-11/12 mx-auto sm:grid-cols-2 gap-4">
        <Input
          placeholder="Search employees on basis of name and email"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div>
          <SelectRoot
            collection={departments}
            value={[filterDepartment]}
            onValueChange={(e) => setFilterDepartment(e.value[0])}
          >
            {/* <SelectLabel>Select Department</SelectLabel> */}
            <SelectTrigger>
              <SelectValueText placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.items.map((department) => (
                <SelectItem item={department} key={department.value}>
                  {department.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </div>
      </div>
      <Separator className="my-3"/>
      <div className="space-y-4">
        {employeesData?.map((employee: EmployeeType) => (
          <EmployeeCard employee={employee} key={employee.id} />
        ))}
      </div>
    </div>
  );
}
