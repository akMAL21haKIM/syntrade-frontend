import { useState, useEffect, createContext, useContext } from "react";
import Cookies from "js-cookie";

const Context = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const test = Cookies.get("auth-token");
    const currentUser = Cookies.get("signedin");

    console.log("Cookies.get auth token: ", Cookies.get("auth-token"));

    setUser(currentUser);
    console.log("currentUser: ", currentUser);
    console.log("currentUser: ", test);
  }, [user]);

  return <Context.Provider value={{ user }}>{children}</Context.Provider>;
};

export const AuthState = () => {
  return useContext(Context);
};
