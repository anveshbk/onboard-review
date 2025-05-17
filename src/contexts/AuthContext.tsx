
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

  useEffect(() => {
    // Check for user in localStorage on mount
    const storedUser = localStorage.getItem("user");
    const sessionExpiry = localStorage.getItem("sessionExpiry");
    
    if (storedUser && sessionExpiry) {
      try {
        // Check if the session is still valid
        if (Number(sessionExpiry) > Date.now()) {
          setUser(JSON.parse(storedUser));
        } else {
          // Session expired
          localStorage.removeItem("user");
          localStorage.removeItem("sessionExpiry");
        }
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("user");
        localStorage.removeItem("sessionExpiry");
      }
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
          
          setUser(userWithoutPassword);
          localStorage.setItem("user", JSON.stringify(userWithoutPassword));
          
          // Set session expiry time (30 minutes from now)
          const expiryTime = Date.now() + 30 * 60 * 1000; // 30 minutes in milliseconds
          localStorage.setItem("sessionExpiry", expiryTime.toString());
          
          // Redirect to the page they tried to visit or to dashboard
          const origin = location.state?.from?.pathname || "/dashboard";
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
