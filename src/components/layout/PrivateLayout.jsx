
import { Navigate,Outlet } from "react-router-dom"
import { PrivateNavbar } from "../PrivateNavbar"
import { UseAuth } from "../../context/AuthContext";

export const PrivateLayout = () => {
    const auth = UseAuth() ;

    if(!auth){
        return <Navigate to="/" />
    }
  return (
    <>
    <PrivateNavbar />
    <Outlet/>
    </>
  )
}
