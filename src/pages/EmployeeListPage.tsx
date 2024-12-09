import Loader from "@/components/loader";
import { apiConnector } from "@/utils/api-connector";
import { EmployeeType } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { Badge, Card } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {
  LuBuilding,
  LuCalendar,
  LuIndianRupee,
  LuMail,
  LuMapPin,
  LuPhone,
} from "react-icons/lu";
import { formatDate } from "@/utils/format-data";
import { NavLink } from "react-router";
export default function EmployeeListPage() {
  const { data: employeesData, isLoading } = useQuery({
    queryFn: () => apiConnector("GET", "/employees"),
    queryKey: ["employees"],
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-[1080px] w-11/12 mx-auto my-6">
      <div className="space-y-5">
        {employeesData.map((employee: EmployeeType) => (
          <Card.Root variant={"elevated"} className="rounded-lg">
            <Card.Header>
              <Card.Title>{employee?.name}</Card.Title>
              <Card.Description>
                {" "}
                <Badge colorPalette="purple">{employee?.position}</Badge>
              </Card.Description>
            </Card.Header>
            <Card.Body className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
              <p className="flex gap-2 items-center">
                <LuMail />{" "}
                <span className="font-semibold">{employee?.email}</span>
              </p>
              <p className="flex gap-2 items-center">
                <LuPhone />{" "}
                <span className="font-semibold">{employee?.phone}</span>
              </p>
              <p className="flex gap-2 items-center">
                <LuCalendar /> <span>Joining Date : </span>{" "}
                <span className="font-semibold">
                  {formatDate(employee?.hireDate)}
                </span>
              </p>
              <p className="flex gap-2 items-center">
                <LuBuilding /> <span> Department : </span>{" "}
                <span className="font-semibold">{employee?.department}</span>
              </p>

              <p className="flex gap-2 items-center">
                <LuIndianRupee /> <span>Salary : </span>
                <span className="font-semibold">{employee?.salary}</span>
              </p>
              <p className="flex gap-2 items-center">
                <LuMapPin /> <span>Location : </span>
                <span className="font-semibold">
                  {employee?.officeLocation}
                </span>
              </p>
            </Card.Body>
            <Card.Footer className="flex justify-end">
              <NavLink to={`/employees/${employee.id}`}>
                <Button>View Details</Button>
              </NavLink>
            </Card.Footer>
          </Card.Root>
        ))}
      </div>
    </div>
  );
}
