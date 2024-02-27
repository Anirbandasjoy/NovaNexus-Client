import { AuthContext } from "@/contex/AuthProvider";
import { AuthContextType } from "@/helper/Type";
import useGetSingleUserProfile from "@/hooks/userProfile/useGetSingleUserProfile";
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoutes = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useContext(
    AuthContext as React.Context<AuthContextType>
  );
  const { sigleUserProfile, isLoading } = useGetSingleUserProfile(user?.email);
  console.log(sigleUserProfile);
  const location = useLocation();
  if (loading || isLoading) {
    return <h1>Loading...</h1>;
  }
  if (user && sigleUserProfile?.payload?.role === "admin") {
    return children;
  }
  return <Navigate to="/" state={location?.pathname} replace />;
};

export default AdminRoutes;
