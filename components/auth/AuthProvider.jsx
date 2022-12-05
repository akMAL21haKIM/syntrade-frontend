import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import Cookies from "js-cookie";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = Cookies.get("auth-token");
    console.log("currentUser: ", currentUser);
    setUser(currentUser);
  }, [Cookies.get("auth-token")]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
