import React from "react";
const HeadingTitle = ({ headingTitle  }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[1240px] py-20 text-center text-4xl">
        {headingTitle}
      </div>
    </div>
  );
};
export default HeadingTitle;
