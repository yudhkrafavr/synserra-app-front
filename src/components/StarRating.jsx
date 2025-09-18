import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating, size = 16 }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // Add full stars
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} className="text-[#302E2C]" size={size} />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} className="text-[#302E2C]" size={size} />);
    } else {
      stars.push(<FaRegStar key={i} className="text-[#302E2C]" size={size} />);
    }
  }

  return (
    <div className="flex space-x-1">
      {stars}
    </div>
  );
};

export default StarRating;
