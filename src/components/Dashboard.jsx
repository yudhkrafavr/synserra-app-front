import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import DashboardStatItem from "./DashboardStatItem";
import defaultFile from "../assets/file-template.svg";
import arrowDown from "../assets/arrow-down.svg";
import arrowUp from "../assets/arrow-up.svg";

const ProjectsPagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md border ${
            currentPage === page
              ? "bg-[#396C4D] text-white border-[#396C4D]"
              : "border-gray-300 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("PENDING");
  const projectsPerPage = 3;
  const [activePeriod, setActivePeriod] = useState("allTime");
  const [projects, setProjects] = useState([
    {
      id: 1,
      status: "PENDING",
      projectName: "FIVERR - YUDHA KIRANA - RETAILS CO",
      targetDate: "2025-07-25",
      price: 45,
    },
    {
      id: 2,
      status: "IN PROGRESS",
      projectName: "FIVERR - YUDHA KIRANA - E-COMMERCE",
      targetDate: "2025-07-18",
      price: 120,
    },
    {
      id: 3,
      status: "COMPLETED",
      projectName: "FIVERR - YUDHA KIRANA - PORTFOLIO",
      targetDate: "2025-07-15",
      price: 85,
    },
    {
      id: 4,
      status: "PENDING",
      projectName: "FIVERR - YUDHA KIRANA - MOBILE APP",
      targetDate: "2025-08-01",
      price: 200,
    },
    {
      id: 5,
      status: "IN PROGRESS",
      projectName: "FIVERR - YUDHA KIRANA - LANDING PAGE",
      targetDate: "2025-07-22",
      price: 75,
    },
    {
      id: 6,
      status: "PENDING",
      projectName: "FIVERR - YUDHA KIRANA - DASHBOARD UI",
      targetDate: "2025-07-28",
      price: 150,
    },
  ]);

  const getCurrentStats = () => {
    switch (activePeriod) {
      case "week":
        return weeklyStats;
      case "month":
        return monthlyStats;
      case "allTime":
      default:
        return allTimeStats;
    }
  };

  // Filter projects based on active tab
  const filteredProjects =
    activeTab === "PENDING"
      ? projects.filter(
          (project) =>
            project.status === "PENDING" || project.status === "IN PROGRESS"
        )
      : projects.filter((project) => project.status === "COMPLETED");

  const allTimeStats = [
    {
      id: 1,
      title: "Retails Co.",
      value: "2415",
      projectCount: 25,
      change: "48",
      changeType: "decrease",
    },
    {
      id: 2,
      title: "EcoLife",
      value: "1980",
      projectCount: 18,
      change: "32",
      changeType: "increase",
    },
    {
      id: 3,
      title: "UrbanVibe",
      value: "1750",
      projectCount: 15,
      change: "12",
      changeType: "decrease",
    },
    {
      id: 4,
      title: "TechNova",
      value: "3200",
      projectCount: 28,
      change: "24",
      changeType: "increase",
    },
  ];

  const weeklyStats = [
    {
      id: 1,
      title: "Weekly Revenue",
      value: "250",
      projectCount: 8,
      change: "12",
      changeType: "increase",
      description: "7-day revenue trend",
    },
    {
      id: 2,
      title: "Active Projects",
      value: "15",
      projectCount: 15,
      change: "5",
      changeType: "increase",
      description: "Currently in progress",
    },
    {
      id: 3,
      title: "New Clients",
      value: "4",
      projectCount: 4,
      change: "2",
      changeType: "decrease",
      description: "This week",
    },
    {
      id: 4,
      title: "Avg. Response Time",
      value: "42",
      projectCount: 12,
      change: "18",
      changeType: "decrease",
      description: "Faster than last week",
    },
  ];

  const monthlyStats = [
    {
      id: 1,
      title: "Monthly Revenue",
      value: "800",
      projectCount: 32,
      change: "18",
      changeType: "increase",
      description: "30-day period",
    },
    {
      id: 2,
      title: "Completed Projects",
      value: "24",
      projectCount: 24,
      change: "6",
      changeType: "increase",
      description: "This month",
    },
    {
      id: 3,
      title: "Client Retention",
      value: "87%",
      projectCount: 28,
      change: "5",
      changeType: "increase",
      description: "Repeat business",
    },
    {
      id: 4,
      title: "Avg. Project Value",
      value: "240",
      projectCount: 32,
      change: "320",
      changeType: "increase",
      description: "Up from last month",
    },
  ];

  return (
    <div className="w-screen flex py-[1rem]">
      <div className="w-[1240px] flex space-x-7 mx-auto py-[2rem] min-w-[1100px] px-4">
        <div className="w-[60%]">
          <div>
            <h2 className="text-lg font-bold">Projects</h2>
            <div className="my-6 text-[#B5B5B5]">
              <ul className="flex space-x-6 text-sm items-center">
                <li
                  className={`cursor-pointer ${
                    activeTab === "PENDING"
                      ? "text-black text-lg"
                      : "text-[#B5B5B5]"
                  }`}
                  onClick={() => {
                    setActiveTab("PENDING");
                    setCurrentPage(1); // Reset to first page when changing tabs
                  }}
                >
                  Pending
                </li>
                <li
                  className={`cursor-pointer ${
                    activeTab === "COMPLETED"
                      ? "text-black text-lg"
                      : "text-[#B5B5B5]"
                  }`}
                  onClick={() => {
                    setActiveTab("COMPLETED");
                    setCurrentPage(1); // Reset to first page when changing tabs
                  }}
                >
                  Completed
                </li>
              </ul>
            </div>
          </div>
          <div>
            {filteredProjects.length > 0 ? (
              filteredProjects
                .slice(
                  (currentPage - 1) * projectsPerPage,
                  currentPage * projectsPerPage
                )
                .map((project) => (
                  <ProjectCard
                    key={project.id}
                    id={project.id}
                    status={project.status}
                    projectName={project.projectName}
                    targetDate={project.targetDate}
                    price={project.price}
                  />
                ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No {activeTab.toLowerCase()} projects found.
              </div>
            )}
          </div>
          {filteredProjects.length > 0 && (
            <ProjectsPagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredProjects.length / projectsPerPage)}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
        <div className="w-[40%]">
          <div className="w-[100%] border-b-1 border-[#DDDDDD]">
            <h2 className="text-lg font-bold">Templates Performance</h2>
            <div className="my-6 text-[#B5B5B5]">
              <ul className="flex space-x-6 text-sm items-center">
                <li
                  className={`cursor-pointer ${
                    activePeriod === "allTime"
                      ? "text-black text-lg"
                      : "text-[#B5B5B5]"
                  }`}
                  onClick={() => setActivePeriod("allTime")}
                >
                  All Time
                </li>
                <li
                  className={`cursor-pointer ${
                    activePeriod === "week"
                      ? "text-black text-lg"
                      : "text-[#B5B5B5]"
                  }`}
                  onClick={() => setActivePeriod("week")}
                >
                  This Week
                </li>
                <li
                  className={`cursor-pointer ${
                    activePeriod === "month"
                      ? "text-black text-lg"
                      : "text-[#B5B5B5]"
                  }`}
                  onClick={() => setActivePeriod("month")}
                >
                  Last 30 Days
                </li>
              </ul>
            </div>
          </div>
          {getCurrentStats().map((stat, index) => (
            <DashboardStatItem
              key={stat.id}
              rank={index + 1}
              title={stat.title}
              value={stat.value}
              projectCount={stat.projectCount}
              change={stat.change}
              changeType={stat.changeType}
              defaultFile={defaultFile}
              arrowDown={arrowDown}
              arrowUp={arrowUp}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
