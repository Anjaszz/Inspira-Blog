import { NavLink } from "react-router-dom"
import logo from "../../public/Logo2.png"

export const PublicNavbar = () => {
  return (
    <nav className="bg-white shadow-lg p-4 flex justify-between items-center">
   <div className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
  <NavLink to="/" className="flex items-center">
    <img 
      src={logo}
      alt="Logo" 
      className="w-8 h-8 mr-2" 
    />
    InspiraBlog
  </NavLink>
</div>

    <div className="h items-center justify-center gap-4 md:flex">
  <NavLink 
    to="/login" 
    className="font-dm text-sm font-medium text-green-600 border border-green-400 px-3 py-2 rounded-md hover:bg-gradient-to-br from-green-600 to-emerald-400 hover:text-white"
  >
    Masuk
  </NavLink>
  <NavLink 
    to="/signup" 
    className="rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-2 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
  >
    Daftar Sekarang
  </NavLink>
</div>

  </nav>
  
  
  )
}
