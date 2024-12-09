import { DeleteEmployee } from "@/components/delete-employee-dialog";
import Loader from "@/components/loader";
import { apiConnector } from "@/utils/api-connector";
import { formatDate } from "@/utils/format-data";
import { Badge, Card, Separator } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  LuArrowLeft,
  LuBuilding,
  LuCalendar,
  LuIndianRupee,
  LuMail,
  LuMapPin, 
  LuPencil,
  LuPhone,
} from "react-icons/lu";
import { NavLink, useParams } from "react-router";
import NotFoundPage from "./NotFoundPage";
import { Button } from "@/components/ui/button";

export default function EmployeeDetailsPage() {
  
  const { id } = useParams(); 
  const { data: employeeDetails, isLoading } = useQuery({
    queryFn: () => apiConnector("GET", `/employees/${id}`),
    queryKey: ["employeesDetails", id],
  });

  if (isLoading) {
    return <Loader />;
  }
  if (!employeeDetails || !id) {
    return <NotFoundPage />;
  }
  return (
    <div className="max-w-[1080px] w-11/12 mx-auto my-10">
      <Card.Root variant={"elevated"} className="rounded-lg">
        <Card.Header>
          <div className="flex flow-row justify-between">
            <div>
              <Card.Title className="flex items-center gap-1">
                {employeeDetails?.name}
                <Badge colorPalette="purple">{employeeDetails?.position}</Badge>
              </Card.Title>
              <Card.Description>{employeeDetails?.bio}</Card.Description>
            </div>
            <div className="flex items-start gap-6">
              <NavLink
                className={"mt-0.5"}
                to={`/employees/${employeeDetails?.id}/edit`}
              >
                <LuPencil />
              </NavLink>
              <DeleteEmployee id={id} />
            </div>
          </div>
          <Separator />
        </Card.Header>
        <Card.Body>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <p className="flex gap-2 items-center">
              <LuMail />{" "}
              <span className="font-semibold">{employeeDetails?.email}</span>
            </p>
            <p className="flex gap-2 items-center">
              <LuPhone />{" "}
              <span className="font-semibold">{employeeDetails?.phone}</span>
            </p>
            <p className="flex gap-2 items-center">
              <LuCalendar /> <span>Joining Date : </span>{" "}
              <span className="font-semibold">
                {formatDate(employeeDetails?.hireDate)}
              </span>
            </p>
            <p className="flex gap-2 items-center">
              <LuBuilding /> <span> Department : </span>{" "}
              <span className="font-semibold">
                {employeeDetails?.department}
              </span>
            </p>
            <p className="flex gap-2 items-center">
              <LuIndianRupee /> <span>Salary : </span>
              <span className="font-semibold">{employeeDetails?.salary}</span>
            </p>
            <p className="flex gap-2 items-center">
              <LuMapPin /> <span>Location : </span>
              <span className="font-semibold">
                {employeeDetails?.officeLocation}
              </span>
            </p>
          </div>
          <Separator className="my-3" />
          <div>
            <h6 className="text-lg flex uppercase font-bold">skills</h6>
            {employeeDetails?.skills.length > 0 ? (
              <ul className="list-disc px-5 flex flex-wrap gap-14">
                {employeeDetails?.skills.map((skill: string) => (
                  <li className="">{skill}</li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-lg">No Skill Present</p>
            )}
          </div>
          <Separator className="my-3" />
          <div>
            <h6 className="text-lg uppercase font-bold">Project</h6>
            {employeeDetails?.projects?.length > 0 ? (
              <ul className="list-disc px-5 flex flex-col gap-1">
                {employeeDetails?.projects?.map((project: string) => (
                  <li className="px-4">{project}</li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-lg">No Project Present</p>
            )}
          </div>
        </Card.Body>
        <Card.Footer className="flex flex-col">
          <Separator className="mb-3" />
          <div className="flex justify-end w-full">
            <NavLink to={"/employees"}>
              <Button variant={"solid"} size="sm">
                <LuArrowLeft /> Back
              </Button>
            </NavLink>
          </div>
        </Card.Footer>
      </Card.Root>
    </div>
  );
}
