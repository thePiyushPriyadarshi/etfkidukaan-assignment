import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "./ui/button";
import { logout } from "@/redux/slice/auth";
import { LuLogOut, LuUser } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router";
import { Separator } from "@chakra-ui/react";
export const UserDropDown = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <button>
          <Avatar name={user?.name} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-fit px-5">
        <PopoverArrow />
        <PopoverBody className="flex flex-col items-center justify-center gap-3">
          <NavLink to="/profile" className={"flex gap-3"}>
            <LuUser className="w-4 h-4" /> Profile
          </NavLink>
          <Separator />
          <Button
            className="text-rose-500 flex gap-3"
            onClick={logoutHandler}
            variant={"subtle"}
          >
            <LuLogOut className="w-4 h-4" />
            Logout
          </Button>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};
