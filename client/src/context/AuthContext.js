import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState();
  const [isAdmin, setIsAdmin] = useState(false);

  async function getLoggedIn() {
    const loggedInRes = await axios.get("/login/loggedin", {
      withCredentials: true,
    });

    setLoggedIn(loggedInRes.data);
  }

  async function getIsAdmin() {
    try {
      const adminRes = await axios.get("/admin/isadmin", {
        withCredentials: true,
      });

      setIsAdmin(adminRes.data);
    } catch (err) {
      console.error(err);
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
