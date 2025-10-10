import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import DashboardStatItem from "./DashboardStatItem";
import defaultFile from "../assets/file-template.svg";
import arrowDown from "../assets/arrow-down.svg";
import arrowUp from "../assets/arrow-up.svg";
import api from "./api";

const API_BASE_URL = "https://api.upilabs.com";

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
  const [activePeriod, setActivePeriod] = useState("allTime");

  const [projects, setProjects] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);

  const projectsPerPage = 5;

  // === Fetch Projects ===
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/project?page=${currentPage - 1}&size=${projectsPerPage}&status=${activeTab}`,
        { headers: { accept: "*/*" } }
      );

      if (response.data.success) {
        const { content, totalPages } = response.data.data;

        const formatted = content.map((p) => ({
          id: p.projectId,
          code: p.projectCode,
          status: p.status,
          templateUrl: p.templateUrl,
          projectName: p.projectName,
          targetDate: p.estDeliveryDate,
          createdDate: p.createdDate,
          price: p.value,
          logoUrl: p.logoUrl,
        }));

        setProjects(formatted);
        setTotalPages(totalPages);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  // === Fetch Stats (Dynamic by Period) ===
  const fetchStats = async (type) => {
    setStatsLoading(true);
    try {
      const response = await api.get(
        `${API_BASE_URL}/widget/performance?type=${type}`,
        { headers: { accept: "*/*" } }
      );

      if (response.data.success) {
        const formatted = response.data.data.map((item, index) => ({
          id: index + 1,
          title: item.templateName,
          value: item.value,
          projectCount: item.projectsCount,
          change: item.change,
          changeType: item.increased ? "increase" : "decrease",
          logoUrl: item.logoUrl,
        }));
        setStats(formatted);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
      setStats([]);
    } finally {
      setStatsLoading(false);
    }
  };

  // === Run when page/tab changes ===
  useEffect(() => {
    fetchProjects();
  }, [currentPage, activeTab]);

  // === Run when period changes ===
  useEffect(() => {
    let typeParam = "all-time";
    if (activePeriod === "week") typeParam = "weekly";
    else if (activePeriod === "month") typeParam = "monthly";
    fetchStats(typeParam);
  }, [activePeriod]);

  return (
    <div className="w-screen flex py-[1rem] min-h-screen">
      <div className="w-[1240px] flex space-x-7 mx-auto py-[2rem] min-w-[1100px] px-4">
        {/* === Left side - Projects === */}
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
                    setCurrentPage(1);
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
                    setCurrentPage(1);
                  }}
                >
                  Completed
                </li>
              </ul>
            </div>
          </div>

          <div>

          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                code={project.code}
                status={project.status}
                projectName={project.projectName}
                targetDate={project.targetDate}
                price={project.price}
                logoUrl={project.logoUrl}
                onReload={fetchProjects}
                templateUrl={project.templateUrl}
                createdDate={project.createdDate}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No {activeTab.toLowerCase()} projects found.
            </div>
          )}
          </div>
          {projects.length > 0 && (
            <ProjectsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>

        {/* === Right side - Templates Performance === */}
        <div className="w-[40%]">
          <div className="w-full border-b border-[#DDDDDD]">
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
                  Last 7 Days
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

          {statsLoading ? (
            <div className="text-center py-8 text-gray-500">Loading stats...</div>
          ) : stats.length > 0 ? (
            stats.map((stat, index) => (
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
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No stats available for this period.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
