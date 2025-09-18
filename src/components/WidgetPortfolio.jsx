import React from "react";
const WidgetPortfolio = () => {
  return (
    <div className="w-full flex justify-center pt-[7rem] pb-[5rem]">
      <div className="w-full max-w-[1240px] px-4">
        <div className="flex justify-center space-x-9">
            <div className="text-center"><span className="text-3xl font-bold">22</span> Hours
                <p className="text-gray-400 text-sm">Total spent across 23 projects</p>
            </div>
            <div className="text-center"><span className="text-3xl font-bold">2</span> Hours
                <p className="text-gray-400 text-sm">Avg. time spent per project</p>
            </div>
            <div className="text-center"><span className="text-3xl font-bold">4</span> Hours
                <p className="text-gray-400 text-sm">Avg. time spent daily</p>
            </div>
            <div className="text-center"><span className="text-3xl font-bold">2</span> Days
                <p className="text-gray-400 text-sm">Avg. time spent weekly</p>
            </div>
            <div className="text-center"><span className="text-3xl font-bold">$59</span> 
                <p className="text-gray-400 text-sm">Calculated hourly rate</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetPortfolio;
