import React, { useState, useEffect } from "react";
import defaultFile from "../assets/file-template.svg";
import CardButton from "./CardButton";
import StarRating from "./StarRating";
import api from "./api";

const API_BASE_URL = "http://localhost:8084";

const CardsPorto = () => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 6;

// Utility to convert to Title Case
const toTitleCase = (str) =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");


  const loadCards = async () => {
    try {
      const res = await api.get(
        `${API_BASE_URL}/template/portfolio?page=${page}&size=${pageSize}`
      );

      if (res.data.success) {
        const { content, totalPages } = res.data.data;

        if (page + 1 >= totalPages) {
          setHasMore(false);
        }

        setCards((prev) => [...prev, ...content]);
      }
    } catch (err) {
      console.error("Error fetching portfolio cards:", err);
    }
  };

  useEffect(() => {
    loadCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="w-screen flex flex-col items-center py-10 min-w-[1100px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[1240px] items-start justify-items-center px-4">
        {cards.map((card, index) => (
          <div key={index} className="w-[340px]">
            <div className="flex items-center space-x-4">
              <div className="w-25">
                <img src={card.logoUrl ? `${API_BASE_URL}/utility/uploads/${card.logoUrl}` : defaultFile} alt="default" className="w-25" />
              </div>
              <div className="text-xl">{toTitleCase(card.projectName)}</div>
            </div>
            <div className="flex items-center justify-between mx-auto py-5">
              <div>
                <div>${card.value}</div>
                <div className="text-[#5B5B5B] text-sm">Project Value</div>
              </div>
              <div>
                <div className="text-right">{card.projectSource}</div>
                <div className="text-right text-[#5B5B5B] text-sm">Source</div>
              </div>
            </div>
            <div className="bg-[#E4E4E4] p-7 shadow-sm">
              <img
                src={`${API_BASE_URL}/utility/uploads/${card.conceptUrl}`}
                alt={card.projectName}
              />
            </div>
            <div className="flex items-center justify-between mx-auto pt-5">
              <div>
                <div className="text-[#5B5B5B] text-sm">Branding name</div>
                <div>{card.brandName}</div>
              </div>
              <div>
                <div className="text-right text-[#5B5B5B] text-sm">Client</div>
                <div className="text-right">{card.customerName}</div>
              </div>
            </div>
            <div className="flex items-center justify-between mx-auto py-5">
              <div>
                <div className="text-[#5B5B5B] text-sm">Hours spent</div>
                <div>{card.hourSpent}</div>
              </div>
              <div>
                <div className="text-right text-[#5B5B5B] text-sm">
                  Completed on
                </div>
                <div className="text-right">{card.completedDate}</div>
              </div>
            </div>
            <div>
              <div className="text-[#5B5B5B] text-sm mb-1">Overall rating</div>
              <StarRating rating={card.rating} />
            </div>
            <div className="pt-5 pb-14">
              <CardButton
                text="DOWNLOAD"
                onClick={() =>
                  window.open(`${API_BASE_URL}/utility/${card.deliverableUrl}`, "_blank")
                }
              />
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <button
          onClick={loadMore}
          className="mt-8 px-6 py-2 bg-[#222222] text-white rounded-md hover:bg-[#535353] transition duration-200"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default CardsPorto;
