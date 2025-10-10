import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "./api";

const API_BASE_URL = "https://api.upilabs.com";

const WidgetPortfolio = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("No token found, user may not be logged in");
        return;
      }
      try {
        const response = await api.get("/widget/portfolioStats");
        setStats(response.data.data);
      } catch (error) {
        console.error("Error fetching weekly stats:", error);

        // 🟢 Optional: Auto logout if token is invalid/expired
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      }
    };

    fetchStats();
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
