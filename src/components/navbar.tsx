import { NavLink } from "react-router";
import { ColorModeButton } from "./ui/color-mode";

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
  return (
    <nav className="border-b py-1">
      <div className="w-11/12 mx-auto flex justify-between items-center ">
        <div className="w-6 h-6">
          <img src="https://etfkidukaan.in/logo_black.jpg" alt="logo" />
        </div>
        <div className="flex gap-4 font-medium">
          {navbarData.map((item) => (
            <NavLink to={item.href}>{item.label}</NavLink>
          ))}
        </div>
        <div>
          <ColorModeButton />
        </div>
      </div>
    </nav>
  );
};
