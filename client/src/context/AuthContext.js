import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(false);

  async function getLoggedIn() {
    const loggedInRes = await axios.get("http://localhost:3000/login/loggedin");

    setLoggedIn(loggedInRes.data);
    console.log("loggedin", loggedInRes.data);
  }

  async function getIsAdmin() {
    try {
      const adminRes = await axios.get("http://localhost:3000/admin/isadmin");
      setIsAdmin(adminRes.data);
    } catch (err) {
      console.log("Not Admin");
    }
  }

  useEffect(() => {
    getLoggedIn();
    getIsAdmin();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

export { AuthContextProvider };
