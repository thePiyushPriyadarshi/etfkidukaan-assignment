import {
  Input,
  Box,
  createListCollection,
  Card,
  Badge,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "./ui/field";
import { useForm, Controller } from "react-hook-form";
import { Button } from "./ui/button";
import { useState } from "react";

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { LuX } from "react-icons/lu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConnector } from "@/utils/api-connector";
import { EmployeeType } from "@/types/type";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setStale } from "@/redux/slice/employee";
import { toast } from "sonner";
type Employee = {
  id: string;
  name: string;
  position: string;
  department: string[];
  email: string;
  phone: string;
  salary: number;
  hireDate: string;
  officeLocation: string;
  skills: string[];
  projects: string[];
  bio: string;
};

const departments = createListCollection({
  items: [
    { value: "IT", label: "IT" },
    { value: "Operations", label: "Operations" },
    { value: "Design", label: "Design" },
    { value: "Analytics", label: "Analytics" },
  ],
});
export function EditEmployeeForm({ data }: { data: EmployeeType }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Employee>({
    defaultValues: {
      id: data.id,
      name: data.name,
      position: data.position,
      department: [data.department],
      email: data.email,
      phone: data.phone,
      salary: data.salary,
      hireDate: data.hireDate,
      officeLocation: data.officeLocation,
      skills: data.skills,
      projects: data.projects,
      bio: data.bio,
    },
  });

  const [skills, setSkills] = useState<string[]>(data.skills);
  const [projects, setProjects] = useState<string[]>(data.projects);

  const addTag = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    if (value.trim()) {
      setList([...list, value.trim()]);
    }
  };

  const removeTag = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => {
    setList(list.filter((_, i) => i !== index));
  };

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: (data: EmployeeType) =>
      apiConnector("PUT", `/employees/${data?.id}`, data),
    onSuccess: () => {
      toast.success("Employee details updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["employeesDetails", data?.id],
      });
      dispatch(setStale(true));
      navigate(`/employees/${data?.id}`);
    },
    onError: () => {
      toast.error("Error in  updating employee details, Please try again");
    },
  });
  const onSubmit = handleSubmit((data: Employee) => {
    const department = data?.department[0];
    const formData = {
      ...data,
      department,
      skills,
      projects,
    };
    mutation.mutate(formData);
  });

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Edit Employee Details</Card.Title>
        <Card.Description>
          Update the employee information below. Please make sure all mandatory
          fields are filled out correctly.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <form onSubmit={onSubmit} className="space-y-4">
          <Field
            label="Name"
            invalid={!!errors.name}
            errorText={errors.name?.message}
          >
            <Input {...register("name", { required: "Name is required" })} />
          </Field>
          <Field
            label="Email"
            invalid={!!errors.email}
            errorText={errors.email?.message}
          >
            <Input
              type="email"
              {...register("email", { required: "Email is required" })}
            />
          </Field>

          <Field
            label="Position"
            invalid={!!errors.position}
            errorText={errors.position?.message}
          >
            <Input
              {...register("position", { required: "Position is required" })}
            />
          </Field>
          <Field
            label="Contact Number"
            invalid={!!errors.phone}
            errorText={errors.phone?.message}
          >
            <Input
              {...register("phone", { required: "Contact No. is required" })}
            />
          </Field>

          <Field label="Department" errorText={errors.department?.message}>
            <Controller
              control={control}
              name="department"
              render={({ field }) => (
                <SelectRoot
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => field.onChange(value)}
                  onInteractOutside={() => field.onBlur()}
                  collection={departments}
                >
                  <SelectTrigger>
                    <SelectValueText placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.items.map((item) => (
                      <SelectItem item={item} key={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              )}
            />
          </Field>

          <Field
            label="Salary"
            invalid={!!errors.salary}
            errorText={errors.salary?.message}
          >
            <Input
              type="number"
              {...register("salary", { required: "Salary in required" })}
            />
          </Field>
          <Field
            label="Bio"
            invalid={!!errors.bio}
            errorText={errors.bio?.message}
          >
            <Textarea {...register("bio")} />
          </Field>

          {/* Skills TagInput */}
          <Field label="Skills">
            <Box width="100%">
              <Input
                placeholder="Type a skill and press Enter"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag(skills, setSkills, e.currentTarget.value);
                    e.currentTarget.value = "";
                  }
                }}
              />
              <Box mt="2" display="flex" gap="2" flexWrap="wrap">
                {skills.map((skill, index) => (
                  <Badge colorPalette={"purple"}>
                    {skill}
                    <button
                      type="button"
                      className="cursor-pointer"
                      key={index}
                      onClick={() => removeTag(skills, setSkills, index)}
                    >
                      <LuX />
                    </button>
                  </Badge>
                ))}
              </Box>
            </Box>
          </Field>

          {/* Projects TagInput */}
          <Field label="Projects">
            <Box width="100%">
              <Input
                placeholder="Type a project and press Enter"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag(projects, setProjects, e.currentTarget.value);
                    e.currentTarget.value = "";
                  }
                }}
              />
              <Box mt="2" display="flex" gap="2" flexWrap="wrap">
                {projects.map((project, index) => (
                  <Badge key={index} colorPalette={"purple"}>
                    {project}
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => removeTag(projects, setProjects, index)}
                    >
                      <LuX />
                    </button>
                  </Badge>
                ))}
              </Box>
            </Box>
          </Field>

          <Field
            label="Hire Date"
            invalid={!!errors.hireDate}
            errorText={errors.hireDate?.message}
          >
            <Input
              type="date"
              {...register("hireDate", { required: "Hire Date in required" })}
            />
          </Field>
          <Field
            label="Office Location"
            invalid={!!errors.officeLocation}
            errorText={errors.officeLocation?.message}
          >
            <Input {...register("officeLocation")} />
          </Field>
          <div className="flex justify-end">
            <Button loading={mutation.isPending} type="submit">
              Save Chages
            </Button>
          </div>
        </form>
      </Card.Body>
    </Card.Root>
  );
}
