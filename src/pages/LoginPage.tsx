"use client";

import { Badge, Button, Card, Input, Separator } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { InputGroup } from "@/components/ui/input-group";
import { LuKeyRound, LuMail } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/auth";

interface FormValues {
  email: string;
  password: string;
}

const dummyAccount = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: "password",
    accountType: "ADMIN",
  },
  {
    name: "Piyush Priyadarshi",
    email: "employee@gmail.com",
    password: "password",
    accountType: "EMPLOYEE",
  },
];
export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    const user = dummyAccount.find(
      (account) => account.email === data?.email.toLowerCase()
    );

    if (!user) {
      toast.error("User does not exist");
      return;
    }
    if (user?.password !== data.password) {
      toast.error("Password does not match");
      return;
    }

    toast.success("User Logged in successfully");
    user.password = "";
    dispatch(setUser(user));
    navigate("/profile");

  });
  return (
    <Card.Root className="max-w-lg my-10 mx-auto">
      <Card.Header>
        <Card.Title className="text-center">Login to ETF ki Dukaan</Card.Title>
        <Card.Description className="text-center">
          Your one-stop solution to manage employees details effortlessly.
        </Card.Description>
        {/* <Separator /> */}
        <div className="grid grid-cols-1 gap-3 mt-5">
          {dummyAccount.map((account) => (
            <div key={account.email} className="text-gray-500 border rounded-lg p-2.5">
              <div className="flex justify-between items-center">
                <p>Name : {account.name}</p>
                <Badge colorPalette={"purple"}>{account.accountType}</Badge>
              </div>
              <p>Email : {account.email}</p>
              <p>Password : {account.password}</p>
            </div>
          ))}
        </div>
      </Card.Header>
      <Separator className="mt-5 w-11/12 mx-auto" />
      <Card.Body>
        <form onSubmit={onSubmit} className="space-y-5">
          <Field
            label="Email"
            invalid={!!errors.email}
            errorText={errors.email?.message}
          >
            <InputGroup className="w-full" startElement={<LuMail />}>
              <Input
                type="email"
                {...register("email", { required: "Email is required" })}
              />
            </InputGroup>
          </Field>
          <Field
            label="Password"
            invalid={!!errors.password}
            errorText={errors.password?.message}
          >
            <InputGroup className="w-full" startElement={<LuKeyRound />}>
              <Input
                type="password"
                {...register("password", { required: "Password is required" })}
              />
            </InputGroup>
          </Field>
          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
      </Card.Body>
      <Separator className="mb-5 w-11/12 mx-auto" />

      <Card.Footer className="flex flex-col gap-3">
        <small className="text-gray-500">
          Don't have an account?{" "}
          <NavLink to="/signup" className="text-blue-500">
            Signup
          </NavLink>
        </small>
        <small className="text-gray-500">
          <a href="/forgot-password" className="text-secondary">
            Forgot Password?
          </a>
        </small>
      </Card.Footer>
    </Card.Root>
  );
}
