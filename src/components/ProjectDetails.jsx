import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaStar, FaPaperclip, FaTimes } from "react-icons/fa";

const FileUploader = ({ onFileSelect, label }) => {
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileSelect(null);
  };

  return (
    <label className="flex items-center cursor-pointer w-full">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="flex items-center w-full min-w-[110px] max-w-[150px] px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50">
        <FaPaperclip className="text-gray-500 mr-2 flex-shrink-0" />
        <span className="text-sm text-gray-600 truncate flex-grow">
          {fileName || label}
        </span>
        {fileName && (
          <button 
            type="button" 
            onClick={handleRemoveFile}
            className="ml-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
          >
            <FaTimes size={12} />
          </button>
        )}
      </div>
    </label>
  );
};

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex space-x-1 mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`cursor-pointer ${star <= rating ? 'text-[#302E2C]' : 'text-gray-300'}`}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );
};

const ProjectDetails = ({ onDetailsChange }) => {
  const [rating, setRating] = useState(0);
  const [timeSpent, setTimeSpent] = useState('');
  const [designConcept, setDesignConcept] = useState(null);
  const [deliveryFile, setDeliveryFile] = useState(null);

  // 🔥 Send details up to ProjectCard whenever they change
  useEffect(() => {
    onDetailsChange({
      rating,
      timeSpent,
      designConcept,
      deliveryFile
    });
  }, [rating, timeSpent, designConcept, deliveryFile]);

  return (
    <motion.div 
      className="flex items-start space-x-6 flex-wrap"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.1 }}
    >
      <div>
        <h3 className="text-sm font-medium">Overall experience!</h3>
        <StarRating rating={rating} setRating={setRating} />
      </div>

      <div>
        <h3 className="text-sm mb-2 font-medium">Design Concept</h3>
        <FileUploader 
          label="Attach file"
          onFileSelect={setDesignConcept}
        />
      </div>

      <div>
        <h3 className="text-sm mb-2 font-medium">Delivery Files</h3>
        <FileUploader 
          label="Attach file"
          onFileSelect={setDeliveryFile}
        />
      </div>

      <div>
        <h3 className="text-sm mb-2 font-medium">Hours spent</h3>
        <input
          type="number"
          min="0"
          step="1"
          value={timeSpent}
          onChange={(e) => setTimeSpent(e.target.value)}
          placeholder="0.0"
          className="w-20 p-1 border border-gray-300 rounded text-sm"
        />
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
