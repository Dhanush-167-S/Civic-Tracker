import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
