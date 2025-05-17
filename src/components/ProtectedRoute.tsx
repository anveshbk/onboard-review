
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  // Add detailed debug logging
  useEffect(() => {
    console.log("ProtectedRoute - Auth state:", { 
      user, 
      isLoading, 
      path: location.pathname, 
      hasLocalStorageUser: !!localStorage.getItem("user"),
      sessionExpiry: localStorage.getItem("sessionExpiry")
    });
  }, [user, isLoading, location.pathname]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    console.log("No user found, redirecting to login");
    // Save current location to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log("User authenticated, rendering protected content");
  return <>{children}</>;
};

export default ProtectedRoute;
