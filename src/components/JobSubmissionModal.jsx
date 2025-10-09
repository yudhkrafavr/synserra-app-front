import React, { useState } from "react";
import { X } from "lucide-react";
import catSubmission from "../assets/cat-submission.png";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import api from "./api";


const JobSubmissionModal = ({ isOpen, onClose, onSubmit, templateTitle, templateId }) => {
  const [projectValue, setProjectValue] = useState('5');
  const [clientName, setClientName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [source, setSource] = useState('');
  const [otherSource, setOtherSource] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const [addToPortfolio, setAddToPortfolio] = useState('no'); 
  const API_BASE_URL = "http://localhost:8084";
  
  const getRelativeDate = (dateString) => {
    if (!dateString) return '';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const targetDate = new Date(dateString);
    targetDate.setHours(0, 0, 0, 0);
    
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 1) return `${diffDays} days`;
    return '';
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      projectValue: parseInt(projectValue) || 0,
      templateName: templateTitle || "Untitled Template",
      client: clientName,
      contact: clientContact,
      brandName: brandName,
      estDeliveryDate: estimatedDeliveryDate,
      dueDate: dueDate,
      source: source === "Other" ? otherSource : source,
      templateId: templateId,
      published: addToPortfolio === "yes"
    };
  
    try {
      const response = await api.post(`/project/submit`, payload, {
        headers: {
          "Content-Type": "application/json",
          accept: "*/*"
        }
      });
  
      console.log("Submission success:", response.data);
  
      if (onSubmit) {
        onSubmit(response.data.data);
      }
  
      onClose();
    } catch (err) {
      console.error("Error submitting project:", err);
      alert("Failed to submit project. Please try again.");
    }
  };  

  // Reset form fields
  const handleReset = () => {
    setProjectValue('5');
    setClientName('');
    setEstimatedDeliveryDate('');
    setDueDate('');
    setClientContact('');
    setSource('');
    setOtherSource('');
    setBrandName('');
  };

  const handleValueChange = (amount) => {
    const newValue = Math.max(0, (parseInt(projectValue) || 0) + amount).toString();
    setProjectValue(newValue);
  };

  // For $20 and $50 buttons - sets exact value
  const setExactValue = (value) => {
    setProjectValue(value.toString());
  };
    if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white w-full max-w-3xl relative flex shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
        <div className="w-[45%]">
          <img 
            src={catSubmission} 
            alt="Cat" 
            className="object-cover w-full h-full select-none" 
            draggable="false" 
            onDragStart={(e) => e.preventDefault()} 
          />
        </div>
        <div className="w-[55%] p-7">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {templateTitle ? `${templateTitle} Template Job Submission` : 'Template Job Submission'}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="projectValue" className="text-sm text-gray-500">
              Project value
            </label>
            <div className="w-[70%] flex items-center mt-1 mb-1 justify-between border-b border-amber-600">
              
              <span className="text-2xl font-bold">$
              <input
                type="number"
                id="projectValue"
                value={projectValue}
                onChange={(e) => {
                  // Allow empty string for better UX when deleting
                  if (e.target.value === '') {
                    setProjectValue('');
                    return;
                  }
                  // Only update if it's a valid number
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 0) {
                    setProjectValue(value.toString());
                  }
                }}
                min="0"
                className="w-24 px-2 py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none focus:ring-0 focus:border-transparent"
              /></span>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => handleValueChange(5)}
                  className="bg-[#FE9D2B] px-3 py-1 rounded"
                  aria-label="Increase project value by 5"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => handleValueChange(-5)}
                  className="bg-gray-300 px-3 py-1 rounded"
                  aria-label="Decrease project value by 5"
                >
                  -
                </button>
              </div>
            </div>
            <div className="flex space-x-2">
            <button
                  type="button"
                  onClick={() => setExactValue(20)}
                  className="bg-gray-300 px-3 py-1 rounded text-sm"
                  aria-label="Increase project value by 5"
                >
                  $20
                </button>
                <button
                  type="button"
                  onClick={() => setExactValue(50)}
                  className="bg-gray-300 px-3 py-1 rounded text-sm"
                  aria-label="Decrease project value by 5"
                >
                  $50
                </button>
            </div>
            <div className="flex space-x-3 my-4">
              <div className="w-1/2">
              <div>
              <label htmlFor="clientName" className="text-sm text-gray-500">
                Client
              </label>
              <span className="text-sm font-bold">
              <input
                id="clientName"
                type="text"
                placeholder="Unyil Sunyil"
                className="w-full border-b border-[#FE9D2B] outline-none py-1"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              /></span>
              </div>
              </div>
              <div className="w-1/2">
                <label htmlFor="date" className="text-sm text-gray-500">
                  Estimated Delivery Date
                </label>
                <div className="relative">
                <span className="text-sm font-bold">
                  <input
                    id="date"
                    type="date"
                    className="w-40 border-b border-[#FE9D2B] outline-none py-1 bg-transparent font-bold"
                    value={estimatedDeliveryDate}
                    min={today}
                    onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
                    required
                  />
                  </span>
                </div>
                <AnimatePresence>
                  {estimatedDeliveryDate && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="text-xs text-gray-500 mt-1">
                        {getRelativeDate(estimatedDeliveryDate)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex space-x-3 my-4">
              <div className="w-1/2">
              <div>
              <label htmlFor="clientContact" className="text-sm text-gray-500">
                Client Contact
              </label>
              <span className="text-sm font-bold">
              <input
                id="clientContact"
                type="text"
                placeholder="unyil@gmail.com"
                className="w-full border-b border-[#FE9D2B] outline-none py-1"
                value={clientContact}
                onChange={(e) => setClientContact(e.target.value)}
                required
              /></span>
              </div>
              </div>
              <div className="w-1/2">
                <label htmlFor="date" className="text-sm text-gray-500">
                  Due Date
                </label>
                <div className="relative">
                <span className="text-sm font-bold">
                  <input
                    id="date"
                    type="date"
                    className="w-40 border-b border-[#FE9D2B] outline-none py-1 bg-transparent font-bold"
                    value={dueDate}
                    min={today}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
                  </span>
                </div>
                <AnimatePresence>
                  {dueDate && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="text-xs text-gray-500 mt-1">
                        {getRelativeDate(dueDate)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex space-x-3 my-4">
              <div className="w-1/2">
              <div>
              <label htmlFor="brandName" className="text-sm text-gray-500">
                Brand Name
              </label>
              <span className="text-sm font-bold">
              <input
                id="brandName"
                type="text"
                placeholder="Branding Name"
                className="w-full border-b border-[#FE9D2B] outline-none py-1"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                required
              /></span>
              </div>
              </div>
              <div className="w-1/2">
                <label htmlFor="date" className="text-sm text-gray-500">
                  Add to Portfolio?
                </label>
                <div className="border-b border-[#FE9D2B] flex items-center space-x-4 outline-none py-1">
    <label className="inline-flex items-center">
      <input
        type="radio"
        className="form-radio text-[#FE9D2B]"
        name="addToPortfolio"
        value="yes"
        checked={addToPortfolio === 'yes'}
        onChange={(e) => setAddToPortfolio(e.target.value)}
      />
      <span className="text-sm ml-2">Yes</span>
    </label>
    <label className="inline-flex items-center">
      <input
        type="radio"
        className="form-radio text-[#FE9D2B]"
        name="addToPortfolio"
        value="no"
        checked={addToPortfolio === 'no'}
        onChange={(e) => setAddToPortfolio(e.target.value)}
      />
      <span className="text-sm ml-2">No</span>
    </label>
  </div>
              </div>
            </div>
            <div className="my-4">
              <label htmlFor="source" className="text-sm text-gray-500 block mb-1">
                Source
              </label>
              <div className="relative text-sm">
                <AnimatePresence mode="wait">
                  {source !== 'Other' ? (
                    <motion.div
                      key="select"
                      initial={false}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <select
                        id="source"
                        className="w-full border-b border-[#FE9D2B] outline-none py-1 bg-transparent font-bold"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        required
                      >
                        <option value="">Select source</option>
                        <option value="Fiverr">Fiverr</option>
                        <option value="Email">Email</option>
                        <option value="Other">Other</option>
                      </select>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="other-input"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center overflow-hidden"
                    >
                      <span className="font-bold mr-2">Other:</span>
                      <input
                        type="text"
                        placeholder="Please specify"
                        className="flex-1 border-b border-[#FE9D2B] outline-none py-1 bg-transparent font-normal"
                        value={otherSource}
                        onChange={(e) => setOtherSource(e.target.value)}
                        required
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSource('');
                          setOtherSource('');
                        }}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                        aria-label="Change source"
                      >
                        <X size={16} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex space-x-3 pt-2">
              <button
                type="submit"
                className="font-semibold text-sm bg-[#FE9D2B] px-5 py-2 rounded border-1 border-[#121212] hover:bg-[#e88f27] transition-colors"
              >
                SUBMIT
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="font-semibold text-sm bg-gray-300 text-black px-5 py-2 rounded border-1 border-[#121212]"
              >
                RESET
              </button>
            </div>
          </form>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobSubmissionModal;
