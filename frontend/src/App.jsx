// import all the Routes
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { Loader2 } from "lucide-react";
import LandingPage from "./Pages/LandingPage";
import Navbar from "./Components/Navbar";
import useAuthStore from "./Store/Store";
import ProfilePage from "./Pages/ProfilePage";
import Community from "./Pages/Community";
import Themes from "./Pages/Themes";

const App = () => {
  // Store
  const { AuthUser, isCheckingAuth, checkAuth, theme } = useAuthStore();

  useEffect(() => {
    checkAuth(); // Check everytime for auth or jwt token
  }, []);

  // Loading states for AUth
  if (isCheckingAuth) {
    return (
      <Loader2 className="animate-spin w-20 h-20 absolute left-1/2 bottom-1/2"></Loader2>
    );
  }
  const isAuthenticated = !!AuthUser; // Convert authUser to boolean value
  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <LandingPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/community"
          element={isAuthenticated ? <Community /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/:id"
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route path="/themes" element={<Themes />} />
      </Routes>
    </div>
  );
};

export default App;
