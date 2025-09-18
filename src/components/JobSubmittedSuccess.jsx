import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import catSubmitted from "../assets/cat-submitted.png";

const JobSubmittedSuccess = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl relative shadow-lg">
        <div><img src={catSubmitted} alt="Cat" className="object-cover w-full select-none" draggable="false" onDragStart={(e) => e.preventDefault()} /></div>
        <div className="p-7 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center justify-center">
            <Check className="w-8 h-8 text-[#FE9D2B] mr-2" />
            Job Submitted Successfully!
          </h2>
          <div className="w-[550px] border border-[#B5B5B5] p-4 mx-auto my-5 text-left">
            <div className="table" >
              <div className="table-row h-6">
                <div className="table-cell w-[40%] text-[#5B5B5B] text-sm align-middle">Project Name</div>
                <div className="table-cell w-[60%] text-sm align-middle">FIVERR - YUDHA KIRANA - RETAILS CO</div>
              </div>
              <div className="table-row h-6">
                <div className="table-cell w-[40%] text-[#5B5B5B] text-sm align-middle">Due in</div>
                <div className="table-cell w-[60%] text-sm font-bold align-middle">3 Days 2 Hours 3 Minutes</div>
              </div>
              <div className="table-row h-6">
                <div className="table-cell w-[40%] text-[#5B5B5B] text-sm align-middle">Downloadable file</div>
                <div className="table-cell w-[60%] text-sm align-middle">FIVERR - YUDHA KIRANA - 22032024.zip</div>
              </div>
            </div>
          </div>
          <button
              className="font-semibold text-sm bg-[#FE9D2B] px-5 py-2 rounded border-1 border-[#121212] hover:bg-[#e88f27] transition-colors"
            >
              DOWNLOAD
            </button>
        </div>
        
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