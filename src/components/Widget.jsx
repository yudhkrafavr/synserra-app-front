import React, { useEffect, useState } from "react";
import arrowDown from "../assets/arrow-down.svg";
import arrowUp from "../assets/arrow-up.svg";
import axios from "axios";
import api from "./api";

const API_BASE_URL = "https://api.upilabs.com";

const Widget = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("No token found, user may not be logged in");
        return;
      }
      try {
        const response = await api.get("/widget/weeklyStats");
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
      <div className="w-screen flex py-[2rem] bg-[#F9FAE3]">
        <div className="w-[1240px] flex items-center justify-center mx-auto py-[2rem] min-w-[1100px] px-4">
          <div className="text-xl">Loading stats...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen flex py-[2rem] bg-[#F9FAE3]">
      <div className="w-[1240px] flex items-center justify-between mx-auto py-[2rem] min-w-[1100px] px-4">
        <div className="text-3xl">Current week’s stats</div>
        <div className="flex space-x-10">
          {/* Earnings */}
          <div>
            <div className="text-xl font-light py-5">Earnings</div>
            <div className="text-4xl text-[#834B09]">${stats.currentEarnings}</div>
            <div className="text-sm font-light py-4">Last week earnings today</div>
            <div className="flex space-x-3">
              <div className="text-xl">
                <span className="text-[#396C4D]">${stats.earningsDifference}</span> |
                <span
                  className={
                    stats.earningsIncreased ? "text-[#396C4D]" : "text-[#ED4E4E]"
                  }
                >
                  {stats.earningsIncreased ? "+" : "-"}
                  {stats.earningsDifference}
                </span>
              </div>
              <div>
                <img
                  src={stats.earningsIncreased ? arrowUp : arrowDown}
                  alt={stats.earningsIncreased ? "arrowUp" : "arrowDown"}
                  className="h-2.5"
                />
              </div>
            </div>
          </div>

          {/* Jobs Completed */}
          <div>
            <div className="text-xl font-light py-5">Jobs Completed</div>
            <div className="text-4xl text-[#834B09]">
              {stats.currentJobsCompleted}
            </div>
            <div className="text-sm font-light py-4">
              Last week jobs completed today
            </div>
            <div className="flex space-x-3">
              <div className="text-xl">
                <span className="text-[#396C4D]">
                  {stats.jobsDifference}
                </span>{" "}
                |{" "}
                <span
                  className={stats.jobsIncreased ? "text-[#396C4D]" : "text-[#ED4E4E]"}
                >
                  {stats.jobsIncreased ? "+" : "-"}
                  {stats.jobsDifference}
                </span>
              </div>
              <div>
                <img
                  src={stats.jobsIncreased ? arrowUp : arrowDown}
                  alt={stats.jobsIncreased ? "arrowUp" : "arrowDown"}
                  className="h-2.5"
                />
              </div>
            </div>
          </div>

          {/* Ongoing Projects */}
          <div>
            <div className="text-xl font-light py-5">Ongoing Projects</div>
            <div className="text-4xl text-[#834B09]">
              {stats.ongoingProjects} | ${stats.ongoingProjectsValue}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
