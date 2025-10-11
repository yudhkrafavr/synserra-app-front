import React, { useState, useEffect } from "react";
import axios from "axios";
import arrowDown from "../assets/arrow-down.svg";
import arrowUp from "../assets/arrow-up.svg";
import time from "../assets/time.svg";
import timePending from "../assets/time-pending.svg";
import graph from "../assets/graph.svg";
import api from "./api";

const API_BASE_URL = "https://api.upilabs.com";

const WidgetDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/widget/earningsStats");
        setStats(response.data.data);
      } catch (error) {
        console.error("Error fetching weekly stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="w-screen flex py-[1rem]">
        <div className="w-[1240px] flex items-center justify-between mx-auto min-w-[1100px] px-4">
          <p className="text-gray-400">Loading stats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen flex py-[1rem]">
      <div className="w-[1240px] flex items-center justify-between mx-auto min-w-[1100px] px-4">
        <div className="text-3xl">Current week’s stats</div>
        <div className="flex space-x-3">
          {/* All Time Earnings */}
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
                <div className="text-sm font-light py-2 text-[#E8E8E8]">Earnings</div>
                <div className="text-xl text-[#E8E8E8]">${stats.allTimeEarnings}</div>
              </div>
              <div>
                <div className="text-sm font-light py-2 text-[#E8E8E8]">Projects</div>
                <div className="text-xl text-[#E8E8E8]">{stats.allTimeProjects}</div>
              </div>
            </div>
          </div>

          {/* Pending Earnings */}
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
                <div className="text-sm font-light py-2 text-[#E8E8E8]">Earnings</div>
                <div className="text-xl text-[#E8E8E8]">${stats.pendingEarnings}</div>
              </div>
              <div>
                <div className="text-sm font-light py-2 text-[#E8E8E8]">Projects</div>
                <div className="text-xl text-[#E8E8E8]">{stats.pendingProjects}</div>
              </div>
            </div>
          </div>

          {/* Last 30 Days */}
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
                <div className="text-sm font-light py-2 text-[#E8E8E8]">Earnings</div>
                <div className="text-xl text-[#E8E8E8]">${stats.last30DaysEarnings}</div>
              </div>
              <div>
                <div className="text-sm font-light py-2 text-[#E8E8E8]">Projects</div>
                <div className="text-xl text-[#E8E8E8]">{stats.last30DaysProjects}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetDashboard;
