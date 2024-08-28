
import { Navigate,Outlet } from "react-router-dom"
import { PublicNavbar } from "../PublicNavbar"
export const PublicLayout = () => {
    const auth = true;

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
