import { NavLink } from "react-router";
import { ColorModeButton } from "./ui/color-mode";
import { Button } from "./ui/button";
import { LuLogIn } from "react-icons/lu";
import { MobileNavbar } from "./mobile-navbar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { UserDropDown } from "./user-dropdown";

const navbarData = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Employee List",
    href: "/employees",
  },
  {
    label: "Add Employee",
    href: "/employees/add",
  },
];
export const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="border-b py-1.5">
      <div className="w-11/12 mx-auto flex justify-between items-center ">
        <div className="flex gap-3">
          <MobileNavbar />
          <NavLink to={"/"} className="w-6 h-6">
            <img src="https://etfkidukaan.in/logo_black.jpg" alt="logo" />
          </NavLink>
        </div>
        {user?.accountType === "ADMIN" && (
          <div className="hidden md:flex gap-4 font-medium">
            {navbarData.map((item) => (
              <NavLink key={item.href} to={item.href}>{item.label}</NavLink>
            ))}
          </div>
        )}
        <div className="flex items-center justify-center gap-4">
          <div>
            {user ? (
              <UserDropDown />
            ) : (
              <NavLink to={"/login"}>
                <Button>
                  Login <LuLogIn className="w-4 h-4" />
                </Button>
              </NavLink>
            )}
          </div>
          <ColorModeButton />
        </div>
      </div>
    </nav>
  );
};
