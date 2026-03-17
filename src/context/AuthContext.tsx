import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "patient" | "doctor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS: Record<string, User> = {
  "patient@hms.com": {
    id: "p1",
    name: "Alice Johnson",
    email: "patient@hms.com",
    role: "patient",
  },
  "doctor@hms.com": {
    id: "d1",
    name: "Dr. Samuel Carter",
    email: "doctor@hms.com",
    role: "doctor",
  },
  "admin@hms.com": {
    id: "a1",
    name: "Admin User",
    email: "admin@hms.com",
    role: "admin",
  },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("hms_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, _password: string, role: UserRole): Promise<boolean> => {
    const found = MOCK_USERS[email];
    if (found && found.role === role) {
      setUser(found);
      localStorage.setItem("hms_user", JSON.stringify(found));
      return true;
    }
    // Allow any email with matching role for demo
    const demoUser: User = {
      id: Math.random().toString(36).slice(2),
      name: email.split("@")[0],
      email,
      role,
    };
    setUser(demoUser);
    localStorage.setItem("hms_user", JSON.stringify(demoUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("hms_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
