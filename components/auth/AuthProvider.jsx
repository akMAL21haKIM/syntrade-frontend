import { useState, useEffect, createContext, useContext } from "react";
import Cookies from "js-cookie";

const Context = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = Cookies.get("signedin");

    setUser(currentUser);
  }, [user]);

  return <Context.Provider value={{ user }}>{children}</Context.Provider>;
};

export const AuthState = () => {
  return useContext(Context);
};
