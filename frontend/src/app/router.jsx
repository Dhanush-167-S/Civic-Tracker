import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import SignUp from "../features/auth/pages/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import Home from "@/features/complaint/pages/Home";
import CreateComplaint from "@/features/complaint/pages/Create-complaint";
import Layout from "@/components/layout/Layout";
import ComplaintDetails from "@/features/complaint/pages/ComplaintDetails";
import Complaints from "@/features/complaint/pages/Complaints";

export const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    element: <ProtectedRoute />, // auth wrapper
    children: [
      {
        element: <Layout />, // Navbar lives here
        children: [
          {
            index: true, // "/" route
            element: <Home />,
          },
          {
            path: "complaints/create",
            element: <CreateComplaint />,
          },
          {
            path: "complaints",
            element: <Complaints />,
          },
          {
            path: "complaints/:id",
            element: <ComplaintDetails />,
          },
        ],
      },
    ],
  },
]);
