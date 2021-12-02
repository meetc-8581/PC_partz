import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(false);

  async function getLoggedIn() {
    const loggedInRes = await axios.get(
      "http://localhost:3000/login/loggedin",
      {
        withCredentials: true,
      }
    );

    setLoggedIn(loggedInRes.data);
  }

  async function getIsAdmin() {
    try {
      const adminRes = await axios.get("http://localhost:3000/admin/isadmin", {
        withCredentials: true,
      });
      setIsAdmin(adminRes.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getLoggedIn();
    getIsAdmin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loggedIn, getLoggedIn, isAdmin, setIsAdmin }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

export { AuthContextProvider };
