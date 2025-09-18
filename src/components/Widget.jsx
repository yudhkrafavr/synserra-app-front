import React from "react";
import arrowDown from "../assets/arrow-down.svg";
import arrowUp from "../assets/arrow-up.svg";

const Widget = () => {
  return (
    <div className="w-screen flex py-[2rem] bg-[#F9FAE3]">
      <div className="w-[1240px] flex items-center justify-between mx-auto py-[2rem] min-w-[1100px] px-4">
        <div className="text-3xl">Current week’s stats</div>
        <div className="flex space-x-10">
          <div>
            <div className="text-xl font-light py-5">Earnings</div>
            <div className="text-4xl text-[#834B09]">$28</div>
            <div className="text-sm font-light py-4">
              Last week earnings today
            </div>
            <div className="flex space-x-3">
              <div className="text-xl">
                <span className="text-[#396C4D]">$100</span> |
                <span className="text-[#ED4E4E]">-$28</span>
              </div>
              <div>
                <img src={arrowDown} alt="arrowDown" className="h-2.5" />
              </div>
            </div>
          </div>
          <div>
            <div className="text-xl font-light py-5">Jobs Completed</div>
            <div className="text-4xl text-[#834B09]">22</div>
            <div className="text-sm font-light py-4">
              Last week jobs completed today
            </div>
            <div className="flex space-x-3">
              <div className="text-xl">
                <span className="text-[#396C4D]">23</span> |
                <span className="text-[#396C4D]">+1</span>
              </div>
              <div>
                <img src={arrowUp} alt="arrowDown" className="h-2.5" />
              </div>
            </div>
          </div>
          <div>
            <div className="text-xl font-light py-5">Ongoing Projects</div>
            <div className="text-4xl text-[#834B09]">4 | $121</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
