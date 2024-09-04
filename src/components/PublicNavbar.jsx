import { NavLink } from "react-router-dom"
import logo from "../../public/Logo2.png"

export const PublicNavbar = () => {
  return (
    <nav className="bg-white shadow-lg p-4 flex justify-between items-center fixed top-0 w-full z-50">
    <div className="text-lg sm:text-2xl font-semibold text-gray-800 flex items-center gap-2">
      <NavLink to="/" className="flex items-center font-nerko sm:text-3xl text-xl">
        <img 
          src={logo}
          alt="Logo" 
          className="w-8 h-8 mr-2" 
        />
        Inspira<span className="text-blue-500">Blog</span>
      </NavLink>
    </div>
  
    <div className="h items-center justify-center gap-4 md:flex">
      <NavLink 
        to="/login" 
        className="text-xs sm:text-sm mr-3 sm:mr-0 font-medium text-green-600 border border-green-400 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md transition-transform duration-200 ease-in-out hover:scale-[1.03]"
      >
        Masuk
      </NavLink>
      <NavLink 
        to="/signup" 
        className="rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
      >
        Daftar
      </NavLink>
    </div>
  </nav>
  
  
  
  )
}
