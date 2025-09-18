import React from "react";

const DashboardButtonMain = ({ text }) => {
  return (
    <button className="px-2 py-2 bg-[#222222] text-white text-xs font-semibold rounded-sm border hover:bg-[#535353] transition duration-200 font-inter">
      {text}
    </button>
  );
};

export default DashboardButtonMain;
