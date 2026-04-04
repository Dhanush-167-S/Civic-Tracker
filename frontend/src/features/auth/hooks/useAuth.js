import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/api";

export const useAuth = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const user = data?.user || null;

  return {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isLoading,
  };
};
