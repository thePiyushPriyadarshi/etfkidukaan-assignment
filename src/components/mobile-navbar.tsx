import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { RootState } from "@/redux/store";
import { Separator } from "@chakra-ui/react";
import { useState } from "react";
import { LuMenu } from "react-icons/lu";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

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
export const MobileNavbar = () => {
  const [open, setOpen] = useState(false);
  const {user} = useSelector((state:RootState)=>state.auth)
  return (
    <DrawerRoot
      size={"xs"}
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement={"start"}
    >
      <DrawerBackdrop />
      <DrawerTrigger className="block md:hidden">
        <LuMenu className="w-5 h-5" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex gap-3">
          <div className="w-6 h-6">
            <img src="https://etfkidukaan.in/logo_black.jpg" alt="logo" />
          </div>
          <DrawerTitle>ETF KI DUKAAN</DrawerTitle>
        </DrawerHeader>
        <Separator className="w-11/12 mx-auto mb-6" />
        <DrawerBody className="flex flex-col gap-5">
          {user?.accountType && (
            <div className="flex flex-col text-lg gap-4 font-medium">
              {navbarData.map((item) => (
                <NavLink key={item.href} onClick={() => setOpen(false)} to={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </DrawerBody>
        <DrawerFooter />
      </DrawerContent>
    </DrawerRoot>
  );
};
