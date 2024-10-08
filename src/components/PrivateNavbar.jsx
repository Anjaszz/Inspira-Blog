import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { UseAuth } from '../context/AuthContext';
import LogoutModal from './Modalbox/LogoutModal';

export const PrivateNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const auth = UseAuth();

  const handleLogout = () => {
    window.localStorage.removeItem("BlogData");
    toast.success("Logout Berhasil", {
      position: toast.TOP_RIGHT,
      autoClose: true,
    });
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 w-full z-50">
        <div className="text-2xl font-semibold text-gray-800">
          <NavLink to="/">InspiraBlog</NavLink>
        </div>

        {/* Hamburger Menu Button */}
        <div className="block lg:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-gray-800 focus:outline-none"
          >
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>

        {/* Navbar Links */}
        <div className={`z-50 lg:flex lg:space-x-6 space-y-4 lg:space-y-0 absolute lg:static top-16 left-0 lg:left-auto bg-white lg:bg-transparent border border-gray-300 lg:border-none shadow-lg lg:shadow-none w-full lg:w-auto transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center lg:items-center space-y-4 lg:space-y-0 lg:space-x-6 p-4 lg:p-0 bg-white lg:bg-transparent border-t lg:border-t-0 border-gray-300">
            <NavLink 
              to="/" 
              className="text-gray-700 hover:text-indigo-500 transition duration-300 md:border-2 lg:border-none "
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            {(auth.role === 1 || auth.role === 3) && ( 
              <NavLink 
                to="/categories" 
                className="text-gray-700 hover:text-indigo-500 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Kategori
              </NavLink>
            )}
            <NavLink 
              to="/post" 
              className="text-gray-700 hover:text-indigo-500 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Post
            </NavLink>
            <NavLink 
              to="/profile" 
              className="text-gray-700 hover:text-indigo-500 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </NavLink>
            <NavLink 
              to="/setting" 
              className="text-gray-700 hover:text-indigo-500 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Setting
            </NavLink>
            <button 
              className="flex items-center text-red-600 hover:text-indigo-500 transition duration-300"
              onClick={() => {
                setIsLogoutModalOpen(true);
                setIsOpen(false);
              }}
              
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        closeModal={() => setIsLogoutModalOpen(false)}
        logoutAction={() => {
          handleLogout();
          setIsLogoutModalOpen(false);
        }}
      />
    </>
  );
};
