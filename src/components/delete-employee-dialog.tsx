import { useState } from "react";
import {
  DialogBackdrop,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LuTrash2 } from "react-icons/lu";
import { apiConnector } from "@/utils/api-connector";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { toast } from "sonner";
export function DeleteEmployee({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const deleteHandler = useMutation({
    mutationFn: () => apiConnector("DELETE", `/employees/${id}`),
    onSuccess: () => {
      toast.success("Employees deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      navigate("/employees");
    },
    onError: () => {
      toast.error("Error in deleting employee, please try again");
      setOpen(false);
    },
  });
  return (
    <DialogRoot
      placement={"center"}
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <DialogBackdrop />
      <DialogTrigger>
        <button className="cursor-pointer">
          <LuTrash2 className="text-rose-600" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this ?</DialogTitle>
        </DialogHeader>
        <DialogBody />
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant={"subtle"}>
            Cancel
          </Button>
          <Button
            onClick={() => deleteHandler.mutate()}
            className="bg-rose-500 text-white"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
