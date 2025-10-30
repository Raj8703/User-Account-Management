import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import Navbar from "./components/Navbar";

const ProtectedRoute = ({ user, children }) => {
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} setUser={setUser} />
        <main className="flex-grow">
          <AppRoutes user={user} setUser={setUser} />
        </main>
      </div>
    </Router>
  );
};

const AppRoutes = ({ user, setUser }) => {
  useEffect(() => {
    if (user) {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = () => {
        window.history.go(1);
      };
    } else {
      window.onpopstate = null;
    }
  }, [user]);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          !user ? (
            <Login setUser={setUser} />
          ) : (
            <Navigate to="/account" replace />
          )
        }
      />
      <Route
        path="/register"
        element={
          !user ? (
            <Register setUser={setUser} />
          ) : (
            <Navigate to="/account" replace />
          )
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute user={user}>
            <Account user={user} setUser={setUser} />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={<Navigate to={user ? "/account" : "/login"} replace />}
      />
    </Routes>
  );
};

export default App;
