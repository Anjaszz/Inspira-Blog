
import { Navigate,Outlet } from "react-router-dom"
import { PrivateNavbar } from "../PrivateNavbar"
export const PrivateLayout = () => {
    const auth = true;

    if(!auth){
        return <Navigate to="/login" />
    }
  return (
    <>
    <PrivateNavbar />
    <Outlet/>
    </>
  )
}
