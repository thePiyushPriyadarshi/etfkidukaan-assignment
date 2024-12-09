import { ColorModeButton } from "./ui/color-mode";

export const Navbar = () => {
  return (
    <nav className="border-b py-1">
      <div className="w-11/12 mx-auto flex justify-between items-center ">
        <div className="w-6 h-6">
          <img src="https://etfkidukaan.in/logo_black.jpg" alt="logo" />
        </div>
        <div>
          <ColorModeButton />
        </div>
      </div>
    </nav>
  );
};
