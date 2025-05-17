
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

// Mock user data - would normally come from a backend
const MOCK_USERS = [
  {
    email: "admin@example.com",
    password: "password123",
    name: "Admin User",
    role: "compliance_officer"
  }
];

type User = {
  email: string;
  name: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Debug log the current auth state
  useEffect(() => {
    console.log("AuthProvider - Current auth state:", { 
      user, 
      isLoading, 
      path: location.pathname,
      hasStoredUser: !!localStorage.getItem("user"),
      sessionExpiry: localStorage.getItem("sessionExpiry")
    });
  }, [user, isLoading, location.pathname]);

  useEffect(() => {
    // Check for user in localStorage on mount
    const storedUser = localStorage.getItem("user");
    const sessionExpiry = localStorage.getItem("sessionExpiry");
    
    console.log("Initial auth check:", { storedUser: !!storedUser, sessionExpiry });
    
    if (storedUser && sessionExpiry) {
      try {
        const expiryTime = Number(sessionExpiry);
        // Check if the session is still valid
        if (expiryTime > Date.now()) {
          const parsedUser = JSON.parse(storedUser);
          console.log("Session is valid, setting user:", parsedUser);
          setUser(parsedUser);
          
          // Refresh the session timer when the user is active
          const newExpiryTime = Date.now() + 30 * 60 * 1000; // 30 minutes
          localStorage.setItem("sessionExpiry", newExpiryTime.toString());
        } else {
          // Session expired
          console.log("Session expired, logging out");
          localStorage.removeItem("user");
          localStorage.removeItem("sessionExpiry");
          // Don't navigate here, as it causes redirect issues
        }
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("user");
        localStorage.removeItem("sessionExpiry");
      }
    } else {
      console.log("No stored user found");
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    setIsLoading(true);
    
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        );

        if (foundUser) {
          const userWithoutPassword = {
            email: foundUser.email,
            name: foundUser.name,
            role: foundUser.role,
          };
          
          console.log("Login successful, setting user:", userWithoutPassword);
          setUser(userWithoutPassword);
          
          // Store user in localStorage
          localStorage.setItem("user", JSON.stringify(userWithoutPassword));
          
          // Set session expiry time (30 minutes from now)
          const expiryTime = Date.now() + 30 * 60 * 1000; // 30 minutes in milliseconds
          localStorage.setItem("sessionExpiry", expiryTime.toString());
          
          // Redirect to the page they tried to visit or to dashboard
          const origin = location.state?.from?.pathname || "/dashboard";
          console.log("Redirecting to:", origin);
          navigate(origin);
          toast.success("Login successful!");
          resolve(true);
        } else {
          toast.error("Invalid email or password");
          resolve(false);
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  const logout = () => {
    console.log("Logging out user");
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("sessionExpiry");
    navigate("/login");
    toast.info("You have been logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
