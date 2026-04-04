import { useQuery } from "@tanstack/react-query";
import { getAllComplaints } from "../services/api";

export const useComplaints = () => {
  return useQuery({
    queryKey: ["complaints"],
    queryFn: getAllComplaints,
  });
};
