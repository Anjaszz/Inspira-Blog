import { NavLink } from "react-router-dom"

export const PublicNavbar = () => {
  return (
    <nav className="bg-white shadow-lg p-4 flex justify-between items-center">
    <div className="text-2xl font-semibold text-gray-800">
      <NavLink to="/">InspiraBlog</NavLink>
    </div>
    <div className="space-x-4">
      <NavLink 
        to="/login" 
        className="font-dm text-sm font-medium text-slate-700"
      >
        Login
      </NavLink>
      <NavLink 
        to="/signup" 
        className="rounded-md bg-gradient-to-br from-green-600 to-emerald-400 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
      >
        Daftar
      </NavLink>
    </div>
  </nav>
  
  
  )
}
