import React from "react";
import arrowDown from "../assets/arrow-down.svg";
import arrowUp from "../assets/arrow-up.svg";
import time from "../assets/time.svg";
import timePending from "../assets/time-pending.svg";
import graph from "../assets/graph.svg";
const WidgetDashboard = () => {
  return (
    <div className="w-screen flex py-[1rem]">
      <div className="w-[1240px] flex items-center justify-between mx-auto min-w-[1100px] px-4">
        <div className="text-3xl">Current week’s stats</div>
        <div className="flex space-x-3">
          <div className="bg-[#302E2C] rounded-md w-[250px] p-6">
            <div>
              <img 
                src={time} 
                alt="Time icon" 
                className="h-6 select-none" 
                draggable="false"
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
            <div className="text-md py-5 text-[#E8E8E8]">All time earnings</div>
            <div className="flex space-x-10">
              <div>
                <div className="text-sm font-light py-2 text-[#E8E8E8]">
                  Earnings
                </div>
                <div className="text-xl text-[#E8E8E8]">$10378</div>
              </div>
              <div>
                <div className="text-sm font-light py-2 text-[#E8E8E8]">
                  Projects
                </div>
                <div className="text-xl text-[#E8E8E8]">249</div>
              </div>
            </div>
          </div>
          <div className="bg-[#302E2C] rounded-md w-[250px] p-6">
            <div>
              <img 
                src={timePending} 
                alt="Pending icon" 
                className="h-6 select-none" 
                draggable="false"
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
            <div className="text-md py-5 text-[#E8E8E8]">Pending earnings</div>
            <div className="flex space-x-10">
              <div>
                <div className="text-sm font-light py-2 text-[#E8E8E8]">
                  Earnings
                </div>
                <div className="text-xl text-[#E8E8E8]">$10378</div>
              </div>
              <div>
                <div className="text-sm font-light py-2 text-[#E8E8E8]">
                  Projects
                </div>
                <div className="text-xl text-[#E8E8E8]">249</div>
              </div>
            </div>
          </div>
          <div className="bg-[#302E2C] rounded-md w-[250px] p-6">
            <div>
              <img 
                src={graph} 
                alt="Graph icon" 
                className="h-6 select-none" 
                draggable="false"
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
            <div className="text-md py-5 text-[#E8E8E8]">Last 30 days</div>
            <div className="flex space-x-10">
              <div>
                <div className="text-sm font-light py-2 text-[#E8E8E8]">
                  Earnings
                </div>
                <div className="text-xl text-[#E8E8E8]">$10378</div>
              </div>
              <div>
                <div className="text-sm font-light py-2 text-[#E8E8E8]">
                  Projects
                </div>
                <div className="text-xl text-[#E8E8E8]">249</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetDashboard;
