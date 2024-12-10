import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl text-gray-600 mt-2">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-lg text-gray-600 my-4">
          It seems like you've encountered a broken link or a missing page.
        </p>
        <Button>
          <NavLink to="/">Go to Homepage</NavLink>
        </Button>
      </div>
    </div>
  );
}
