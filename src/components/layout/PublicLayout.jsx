
import { Navigate,Outlet } from "react-router-dom"
import { PublicNavbar } from "../PublicNavbar"
import { UseAuth } from "../../context/AuthContext";

export const PublicLayout = () => {
    const auth = UseAuth();

    if(auth){
        return <Navigate to="/" />
    }
  return (
    <>
    <PublicNavbar />
    <Outlet/>
    </>
  )
}
