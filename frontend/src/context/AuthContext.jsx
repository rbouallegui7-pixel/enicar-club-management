import { createContext, useContext, useState } from "react";
import { mockUsers } from "../mock/data";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // VERSION MOCKÉE — remplacer par appel API quand backend prêt
  const login = async (email, password) => {
    const found = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) throw new Error("Email ou mot de passe incorrect");
    const { password: _, ...safeUser } = found;
    localStorage.setItem("user", JSON.stringify(safeUser));
    localStorage.setItem("token", "mock-jwt-token-" + safeUser.id);
    setUser(safeUser);
    return safeUser;
  };

  const register = async (fullName, email, password) => {
    const exists = mockUsers.find((u) => u.email === email);
    if (exists) throw new Error("Cet email est déjà utilisé");
    const newUser = { id: Date.now(), fullName, email, role: "CLUB_MEMBER" };
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("token", "mock-jwt-token-" + newUser.id);
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);