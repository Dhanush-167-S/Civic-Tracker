import { useAuth } from "@/features/auth/hooks/useAuth";
import { logout } from "@/features/auth/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { LogOutIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logout();
      toast.success(res.message);
      queryClient.removeQueries({ queryKey: ["auth", "me"] });
      navigate("/login", { replace: true });
    } catch (error) {
      queryClient.removeQueries({ queryKey: ["auth", "me"] });
      navigate("/login", { replace: true });
    }
  };

  return (
    <nav className="border-b border-gray-800">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center  h-16">
          <Link
            to={"/"}
            className="text-2xl font-bold flex items-center text-[#fafafa]"
          >
            Civic <span className="text-emerald-500">Tracker</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to={"/"}>Home</Link>
            <Link to={"/complaints/create"}>Create</Link>
            <Link to={"/complaints"}>Complaints</Link>
          </div>
          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <Link to={"/signup"}>Signup</Link>
                <Link
                  to={"/login"}
                  className="px-5 py-2 bg-white text-black rounded-sm"
                >
                  Login
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOutIcon className="h-4 w-4" /> Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
