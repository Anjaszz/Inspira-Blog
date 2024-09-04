// PublicLayout.js
import { Navigate, Outlet } from "react-router-dom";
import { PublicNavbar } from "../PublicNavbar";
import { UseAuth } from "../../context/AuthContext";
import { Footer } from "../Footer";

export const PublicLayout = () => {
  const auth = UseAuth();

  if (auth) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex flex-col min-h-screen w-screen">
      <PublicNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
