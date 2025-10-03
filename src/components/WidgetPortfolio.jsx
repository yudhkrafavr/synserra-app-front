import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8084";

const WidgetPortfolio = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/widget/portfolioStats`)
      .then((res) => {
        if (res.data.success) {
          setStats(res.data.data);
        }
      })
      .catch((err) => console.error("Error fetching portfolio stats:", err));
  }, []);

  if (!stats) {
    return (
      <div className="w-full flex justify-center pt-[7rem] pb-[5rem]">
        <div className="w-full max-w-[1240px] px-4">
          <p className="text-center text-gray-400">Loading stats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center pt-[7rem] pb-[5rem]">
      <div className="w-full max-w-[1240px] px-4">
        <div className="flex justify-center space-x-9">
          <div className="text-center">
            <span className="text-3xl font-bold">{stats.totalHours}</span> Hours
            <p className="text-gray-400 text-sm">
              Total spent across {stats.totalProjects} projects
            </p>
          </div>
          <div className="text-center">
            <span className="text-3xl font-bold">{stats.avgTimePerProject}</span> Hours
            <p className="text-gray-400 text-sm">Avg. time spent per project</p>
          </div>
          <div className="text-center">
            <span className="text-3xl font-bold">{stats.avgTimeDaily}</span> Hours
            <p className="text-gray-400 text-sm">Avg. time spent daily</p>
          </div>
          <div className="text-center">
            <span className="text-3xl font-bold">{stats.avgTimeWeekly}</span> Days
            <p className="text-gray-400 text-sm">Avg. time spent weekly</p>
          </div>
          <div className="text-center">
            <span className="text-3xl font-bold">${stats.hourlyRate}</span>
            <p className="text-gray-400 text-sm">Calculated hourly rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetPortfolio;
