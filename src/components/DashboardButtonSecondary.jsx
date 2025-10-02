import React from "react";

const DashboardButtonSecondary = ({ text, onClick, disabled }) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className="px-2 py-2 text-black text-xs font-semibold hover:text-[#AAAAAA] transition duration-200"
    >
      {text}
    </button>
  );
};

export default DashboardButtonSecondary;
