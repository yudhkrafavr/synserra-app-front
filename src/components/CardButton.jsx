import React from "react";

const CardButton = ({ text, onClick }) => {
  return (
    <button
      className="px-4 py-2 bg-[#F4F5C6] text-black font-semibold rounded-sm border hover:bg-[#D7D782] transition duration-200"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CardButton;
