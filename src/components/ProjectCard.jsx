import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
import DashboardButtonMain from './DashboardButtonMain';
import DashboardButtonSecondary from './DashboardButtonSecondary';
import defaultFile from "../assets/file-template.svg";
import ProjectDetails from './ProjectDetails';

const formatRemainingDays = (targetDate) => {
  if (!targetDate) return 'No due date';
  
  const today = new Date();
  const dueDate = new Date(targetDate);
  const timeDiff = dueDate - today;
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
  if (isNaN(daysDiff)) return 'Invalid date';
  if (daysDiff === 0) return 'Due today';
  if (daysDiff < 0) return `${Math.abs(daysDiff)} Days Late`;
  return `Due in ${daysDiff} Days`;
};

const isOverdue = (targetDate) => {
  if (!targetDate) return false;
  const today = new Date();
  const dueDate = new Date(targetDate);
  return dueDate < today;
};

const ProjectCard = ({ 
  id,
  status,
  projectName,
  targetDate,
  price
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  
  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleCancelSubmit = () => {
    if (cancelReason.trim()) {
      console.log('Cancellation reason:', cancelReason);
      // Add your cancel submission logic here
      setShowCancelModal(false);
      setCancelReason('');
    }
  };

  const handleCloseModal = () => {
    setShowCancelModal(false);
    setCancelReason('');
  };

  return (
    <>
      <div className="flex space-x-5 p-6 border border-[#D9D9D9] w-[700px] rounded-[10px] my-5">
        <div className="w-[80px]">
          <img src={defaultFile} alt="defaultFile" className="w-[80px]" />
        </div>
        <div className="flex justify-between w-[85%]">
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-4">
                <div className="font-bold text-sm">#{id.toString().padStart(4, '0')}</div>
                <div className={`font-bold text-sm ${
                  status === 'PENDING' ? 'text-[#834B09]' : 
                  status === 'COMPLETED' ? 'text-[#5B5B5B]' : 'text-[#DF8C2A]'
                } tracking-widest`}>
                  {status}
                </div>
              </div>
            </div>
            <div className="text-md font-light py-2">
              {projectName}
            </div>
            {status !== 'COMPLETED' && (
              <div className={`text-sm font-bold pb-4 ${
                isOverdue(targetDate) ? 'text-red-500' : 'text-black'
              }`}>
                {formatRemainingDays(targetDate)}
              </div>
            )}
            {status !== 'COMPLETED' && (
              <div className="flex flex-col">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-gray-400 hover:text-gray-600 transition-colors self-start"
                  aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                >
                  {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <AnimatePresence>
                  {isExpanded && status !== 'COMPLETED' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="py-4">
                        <ProjectDetails />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            <div className="flex items-center space-x-4 pt-4">
              {status !== 'COMPLETED' && (
                <>
                  <DashboardButtonMain 
                    text="COMPLETE PROJECT" 
                  />
                  <DashboardButtonSecondary 
                    text="CANCEL" 
                    onClick={handleCancelClick}
                  />
                </>
              )}
              <DashboardButtonSecondary 
                text="DOWNLOAD" 
              />
            </div>
          </div>
          <div>
            <div 
              className={`flex items-center w-[60px] h-[60px] justify-center font-bold text-xl ${
                price < 50 
                  ? 'bg-[#F4F5C6] text-black' 
                  : price <= 100 
                    ? 'bg-[#787878] text-white' 
                    : 'bg-[#302E2C] text-white'
              }`}
            >
              <span className="text-sm">$</span>{price}
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Reason Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <FaTimes />
            </button>
            
            <h3 className="text-xl font-bold mb-4">Cancel Project</h3>
            <p className="mb-4">Please provide a reason for cancellation:</p>
            
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4 h-32"
              placeholder="Enter your reason here..."
            />
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Close
              </button>
              <button
                onClick={handleCancelSubmit}
                disabled={!cancelReason.trim()}
                className={`px-4 py-2 rounded-md ${
                  cancelReason.trim() 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
