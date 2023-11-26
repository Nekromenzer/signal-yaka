import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignIn from "./pages/signIn/SignIn";
import HandleAuth from "./auth/HandleAuth";
import Referral from "./pages/referral/Referral";
import Profile from "./pages/profile/Profile"
// import Home from './pages/Home/Home'

function App() {
  return (
    <Routes>
      <Route path="login" element={<SignIn />} />
      <Route element={<HandleAuth />}>
        <Route element={<Layout />}>
          <Route
            index
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="referral" element={<Referral />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
