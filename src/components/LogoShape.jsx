import React from "react";

const LogoShape = ({ shape }) => {
  return (
    <div
      className={`${
        shape === "rectangle" ? "w-10 h-5" : "w-7 h-7"
      } border-1 ml-auto`}
    ></div>
  );
};

export default LogoShape;
