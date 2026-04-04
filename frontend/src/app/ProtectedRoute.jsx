import { useAuth } from "../features/auth/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-xl flex items-center">
          <Loader2 className="h-4 w-4 mr-3 animate-spin" /> Loading...
        </p>
      </div>
    );

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
