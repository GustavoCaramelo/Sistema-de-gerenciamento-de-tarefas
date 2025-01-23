import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

const AppRoutes = () => {
  const isAuthenticated = !!localStorage.getItem("authToken");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home user={{ name: "Gustavo" }} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;