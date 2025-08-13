import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Simulation from "./pages/Simulation.jsx";
import Drivers from "./pages/Drivers.jsx";
import RoutesPage from "./pages/RoutesPage.jsx";
import Orders from "./pages/Orders.jsx";
import Layout from "./components/Layout.jsx";
import { useAuth } from "./store/auth.js";

const Guard = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route index element={<Guard><Dashboard /></Guard>} />
          <Route path="/simulation" element={<Guard><Simulation /></Guard>} />
          <Route path="/drivers" element={<Guard><Drivers /></Guard>} />
          <Route path="/routes" element={<Guard><RoutesPage /></Guard>} />
          <Route path="/orders" element={<Guard><Orders /></Guard>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
