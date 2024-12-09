import { EditEmployeeForm } from "@/components/edit-employee-form";
import Loader from "@/components/loader";
import { useParams } from "react-router";
import NotFoundPage from "./NotFoundPage";
import { apiConnector } from "@/utils/api-connector";
import { useQuery } from "@tanstack/react-query";

export default function EditEmployeePage() {
  const { id } = useParams();
  const { data: employeeDetails, isLoading } = useQuery({
    queryFn: () => apiConnector("GET", `/employees/${id}`),
    queryKey: ["employeesDetails", id],
  });
  if (isLoading) {
    return <Loader />;
  }
  if(!employeeDetails || !id){
    return <NotFoundPage/>
  }

  return (
    <div className="mx-auto w-11/12 max-w-[1080px] py-5">
      <EditEmployeeForm data={employeeDetails}/>
    </div>
  );
}
