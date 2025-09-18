import React from "react";

const Levels = ({ level }) => {
  const maxLevel = 5;
  return (
    <div className="flex gap-1.5">
      {[...Array(maxLevel)].map((_, index) => (
        <div
          key={index}
          className={`w-3.5 h-4 ${
            index < level ? "bg-[#834B09]" : "bg-gray-300"
          }`}
        ></div>
      ))}
    </div>
  );
};

export default Levels;
