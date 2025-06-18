import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Orders from "./pages/Orders";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  const location = useLocation();

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus(); 
  }, [location]); 

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/orders" /> : <Login />} />
      <Route path="/orders" element={isLoggedIn ? <Orders /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
