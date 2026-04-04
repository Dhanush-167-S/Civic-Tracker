import { useAuth } from "../features/auth/hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const AdminRoute = () => {
  const { isAdmin, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="flex items-center text-2xl">
          <Loader2 /> Loading...
        </p>
      </div>
    );
  }
  if (!isAdmin) {
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet />;
};
export default AdminRoute;
