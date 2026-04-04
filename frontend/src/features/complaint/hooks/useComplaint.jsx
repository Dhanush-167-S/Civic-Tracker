import { useQuery } from "@tanstack/react-query";
import { getComplaintById } from "../services/api";

export const useComplaint = (id) => {
  return useQuery({
    queryKey: ["complaint", id],
    queryFn: () => getComplaintById(id),
  });
};
