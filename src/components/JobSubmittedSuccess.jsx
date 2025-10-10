import React, { useMemo } from 'react';
import { Check, X } from 'lucide-react';
import catSubmitted from "../assets/cat-submitted.png";

const JobSubmittedSuccess = ({ isOpen, onClose, projectInfo }) => {
  const { projectName, dueDate, projectData } = projectInfo || {};

  if (!isOpen) return null;

  // 🧮 Calculate remaining time until end of dueDate (23:59:00)
  const remainingTime = useMemo(() => {
    if (!dueDate) return "-";

    const now = new Date();
    const endOfDueDate = new Date(dueDate);

    // Set due date time to 23:59:00
    endOfDueDate.setHours(23, 59, 0, 0);

    const diffMs = endOfDueDate - now;
    if (diffMs <= 0) return "Expired";

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

    return `${days} Days ${hours} Hours ${minutes} Minutes`;
  }, [dueDate]);

  // 🧩 Extract file name without "projects/" and ".zip"
  const downloadableFile = useMemo(() => {
    if (!projectData) return "-";

    // Example: "projects/8x1q_FIVERR_BUJA_RETAILS_CO_02102025.zip"
    const parts = projectData.split("/");
    return parts.pop(); // "8x1q_FIVERR_BUJA_RETAILS_CO_02102025.zip"
  }, [projectData]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl relative shadow-lg">
        {/* Banner Image */}
        <div>
          <img
            src={catSubmitted}
            alt="Cat"
            className="object-cover w-full select-none"
            draggable="false"
            onDragStart={(e) => e.preventDefault()}
          />
        </div>

        {/* Content */}
        <div className="p-7 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center justify-center">
            <Check className="w-8 h-8 text-[#FE9D2B] mr-2" />
            Job Submitted Successfully!
          </h2>

          {/* Table */}
          <div className="w-[550px] border border-[#B5B5B5] p-4 mx-auto my-5 text-left">
            <div className="table">
              <div className="table-row h-6">
                <div className="table-cell w-[40%] text-[#5B5B5B] text-sm align-middle">Project Name</div>
                <div className="table-cell w-[60%] text-sm align-middle">{projectName || "-"}</div>
              </div>

              <div className="table-row h-6">
                <div className="table-cell w-[40%] text-[#5B5B5B] text-sm align-middle">Due in</div>
                <div className="table-cell w-[60%] text-sm font-bold align-middle">{remainingTime || "-"}</div>
              </div>

              <div className="table-row h-6">
                <div className="table-cell w-[40%] text-[#5B5B5B] text-sm align-middle">Downloadable file</div>
                <div className="table-cell w-[60%] text-sm align-middle">{downloadableFile || "-"}</div>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <a
            href={projectData ? `https://api.upilabs.com/utility/${projectData}.zip` : "#"}
            className="font-semibold text-sm bg-[#FE9D2B] px-5 py-2 rounded border border-[#121212] hover:bg-[#e88f27] transition-colors inline-block"
          >
            DOWNLOAD
          </a>
        </div>

        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={22} />
        </button>
      </div>
    </div>
  );
};

export default JobSubmittedSuccess;
