import React from 'react';

const Home = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Synserra</h1>
        <p className="text-xl text-gray-600 mb-8">Your platform for custom work and templates</p>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-[#222222] text-white rounded-sm hover:bg-[#535353] transition duration-200">
            Get Started
          </button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-100 transition duration-200">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
