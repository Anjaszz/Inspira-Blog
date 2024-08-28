import { NavLink } from "react-router-dom"

export const PublicNavbar = () => {
  return (
    <nav className="bg-white shadow-lg p-4 flex justify-between items-center">
    <div className="text-2xl font-semibold text-gray-800">
      <NavLink to="/">Logo</NavLink>
    </div>
    <div className="space-x-4">
      <NavLink 
        to="/login" 
        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300"
      >
        Login
      </NavLink>
      <NavLink 
        to="/signup" 
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
      >
        Daftar
      </NavLink>
    </div>
  </nav>
  
  
  )
}
