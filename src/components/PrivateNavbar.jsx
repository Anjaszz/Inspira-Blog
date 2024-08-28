import { NavLink } from "react-router-dom"

export const PrivateNavbar = () => {
  return (
    <nav className="bg-white shadow-lg p-4 flex justify-between items-center">
    <div className="text-2xl font-semibold text-gray-800">
      <NavLink to="/">Logo</NavLink>
    </div>
    <div className="space-x-6">
      <NavLink 
        to="/" 
        className="text-gray-700 hover:text-indigo-500 transition duration-300"
      >
        Home
      </NavLink>
      <NavLink 
        to="/category" 
        className="text-gray-700 hover:text-indigo-500 transition duration-300"
      >
        Kategori
      </NavLink>
      <NavLink 
        to="/post" 
        className="text-gray-700 hover:text-indigo-500 transition duration-300"
      >
        Post
      </NavLink>
      <NavLink 
        to="/profile" 
        className="text-gray-700 hover:text-indigo-500 transition duration-300"
      >
        Profile
      </NavLink>
      <NavLink 
        to="/setting" 
        className="text-gray-700 hover:text-indigo-500 transition duration-300"
      >
        Setting
      </NavLink>
      <NavLink 
        to="/login" 
        className="text-gray-700 hover:text-indigo-500 transition duration-300"
      >
        Logout
      </NavLink>
    </div>
  </nav>
  
  )
}
