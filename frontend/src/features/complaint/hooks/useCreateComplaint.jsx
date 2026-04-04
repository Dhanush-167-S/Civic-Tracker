import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComplaint } from "../services/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useCreateComplaint = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createComplaint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
      toast.success("Complaint created successfully!");
      navigate("/");
    },
  });
};
