import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { Badge } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex flex-col gap-5 items-center justify-center w-11/2 my-10 mx-auto">
      <div className="text-gray-500 border rounded-lg p-2.5">
        <div className="flex flex-1 justify-between items-center gap-5">
          <p>Name : {user?.name}</p>
          <Badge colorPalette={"purple"}>{user?.accountType}</Badge>
        </div>
        <p>Email : {user?.email}</p>
      </div>

      {user?.accountType === "EMPLOYEE" ? (
        <div className="text-center p-5 border rounded-md shadow-md">
          <p className="text-gray-600 mb-1">
            You are logged in as an <strong>EMPLOYEE</strong>.
          </p>
          <p className="text-gray-600">
            Log in with an <span className="font-medium">ADMIN</span> account to
            manage employees.
          </p>
        </div>
      ) : (
        <NavLink to={"/"}>
          <Button>Go to Dashboard</Button>
        </NavLink>
      )}
    </div>
  );
}
