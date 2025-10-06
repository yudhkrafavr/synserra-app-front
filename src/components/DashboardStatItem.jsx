import React from 'react';

const DashboardStatItem = ({ rank, title, value, projectCount, change, changeType, defaultFile, arrowDown, arrowUp }) => {
  return (
    <div className="flex border-b-1 border-[#DDDDDD] space-x-7 w-[100%] py-6">
      <div className="font-bold text-xl">#{rank}</div>
      <div className="flex space-x-4 w-[90%]">
        <div>
          <img src={defaultFile} alt="defaultFile" className="w-[80px]" />
        </div>
        <div className="flex justify-between w-[70%]">
          <div>
            <div className="text-lg mb-2">{title}</div>
            <div className="flex space-x-4">
              <div>
                <h3 className="text-sm text-[#B5B5B5]">Value</h3>
                <p className="text-md py-1">${value}</p>
              </div>
              <div>
                <h3 className="text-sm text-[#B5B5B5]">Projects Count</h3>
                <p className="text-md py-1">{projectCount}</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-2 items-center">
          {change != null && changeType != null && (
  <div className="flex items-center space-x-1">
    <div
      className={`text-md ${
        changeType === "increase" ? "text-[#396C4D]" : "text-[#ED4E4E]"
      }`}
    >
      {changeType === "increase" ? "+" : "-"}${Math.abs(change)}
    </div>
    <div>
      <img
        src={changeType === "increase" ? arrowUp : arrowDown}
        alt={changeType === "increase" ? "arrow-up" : "arrow-down"}
        className="h-2.5"
      />
    </div>
  </div>
)}

          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatItem;
