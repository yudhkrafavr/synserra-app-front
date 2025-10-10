import React, { useState, useEffect } from "react";
import defaultFile from "../assets/file-template.svg";
import CardButton from "./CardButton";
import StarRating from "./StarRating";
import api from "./api";

const API_BASE_URL = "https://api.upilabs.com";

const CardsPorto = () => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const pageSize = 6;

  // ✅ Utility to convert to Title Case
  const toTitleCase = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  // ✅ Fetch image securely (logo/concept)
  const fetchSecureImage = async (filePath, fallbackUrl) => {
    if (!filePath) return fallbackUrl;
    try {
      const response = await api.get(`/utility/uploads/${filePath}`, {
        responseType: "blob",
      });
      return URL.createObjectURL(response.data);
    } catch (err) {
      console.warn("Failed to fetch secure image:", filePath, err);
      return fallbackUrl;
    }
  };

  // ✅ Secure download handler
  const handleSecureDownload = async (filePath, filename = "file.zip") => {
    if (!filePath) {
      alert("No file available to download.");
      return;
    }
    try {
      const response = await api.get(`/utility/${filePath}`, {
        responseType: "blob",
      });
      const blobUrl = URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download file. Please try again.");
    }
  };

  const loadCards = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        `${API_BASE_URL}/template/portfolio?page=${page}&size=${pageSize}`
      );

      if (res.data.success) {
        const { content, totalPages } = res.data.data;

        // ✅ Securely fetch logo & concept images
        const updatedContent = await Promise.all(
          content.map(async (card) => {
            const secureLogoUrl = await fetchSecureImage(card.logoUrl, defaultFile);
            const secureConceptUrl = await fetchSecureImage(card.conceptUrl, null);
            return { ...card, secureLogoUrl, secureConceptUrl };
          })
        );

        if (page + 1 >= totalPages) {
          setHasMore(false);
        }

        setCards((prev) => [...prev, ...updatedContent]);
      }
    } catch (err) {
      console.error("Error fetching portfolio cards:", err);
    } finally {
      setLoading(false);
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
      {/* ✅ Empty state message */}
      {!loading && cards.length === 0 && (
        <div className="text-gray-500 text-center py-20 text-lg">
          No available data.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[1240px] items-start justify-items-center px-4">
        {cards.map((card, index) => (
          <div key={index} className="w-[340px]">
            {/* Logo & project title */}
            <div className="flex items-center space-x-4">
              <div className="w-25">
                <img
                  src={card.secureLogoUrl || defaultFile}
                  alt="logo"
                  className="w-25"
                />
              </div>
              <div className="text-xl">{toTitleCase(card.projectName)}</div>
            </div>

            {/* Project info */}
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

            {/* Concept image */}
            <div className="bg-[#E4E4E4] p-7 shadow-sm">
              <img
                src={card.secureConceptUrl}
                alt={card.projectName}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Brand & client */}
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

            {/* Hours & completion */}
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

            {/* Rating */}
            <div>
              <div className="text-[#5B5B5B] text-sm mb-1">Overall rating</div>
              <StarRating rating={card.rating} />
            </div>

            {/* ✅ Secure download */}
            <div className="pt-5 pb-14">
              <CardButton
                text="DOWNLOAD"
                onClick={() => handleSecureDownload(card.deliverableUrl, `${card.projectName}.zip`)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {hasMore && cards.length > 0 && (
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
