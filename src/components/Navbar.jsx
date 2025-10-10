import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/synserra-logo.svg";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <div className="w-full flex">
      <div className="w-[1240px] flex items-center justify-between mx-auto py-9 min-w-[1100px] px-4">
        <img 
          src={logo} 
          alt="Logo" 
          className="h-12 select-none" 
          draggable="false"
          onDragStart={(e) => e.preventDefault()}
        />
        <div className="flex items-center space-x-6">
          <ul className="flex space-x-6 text-sm">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? 'text-black' : 'text-gray-500 hover:text-gray-600'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/portfolio" 
              className={({ isActive }) => 
                isActive ? 'text-black' : 'text-gray-500 hover:text-gray-600'
              }
            >
              Portfolio 
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                isActive ? 'text-black' : 'text-gray-500 hover:text-gray-600'
              }
            >
              Dashboard
            </NavLink>
          </li>
        </ul>

       

        
        <button 
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('openJobSubmissionModal', { 
                detail: { 
                  isCustomTemplate: true,
                  templateTitle: 'Custom Template'
                } 
              }));
            }
          }}
          className="bg-[#302E2C] hover:bg-[#535353] text-white px-4 py-2 rounded-sm text-sm transition-colors"
        >
          Submit Custom Work
        </button>
        <button
          onClick={handleLogout}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          title="Logout"
        >
          <LogOut size={20} className="text-gray-600 hover:text-black" />
        </button>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
