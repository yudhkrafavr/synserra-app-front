import React from "react";

const DashboardButtonMain = ({ text, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-2 py-2 bg-[#222222] text-white text-xs font-semibold rounded-sm border hover:bg-[#535353] transition duration-200 font-inter ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {text}
    </button>
  );
};

export default DashboardButtonMain;
