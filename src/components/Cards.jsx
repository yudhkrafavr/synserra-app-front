import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultFile from "../assets/file-template.svg";
import Levels from "./Levels";
import LogoShape from "./LogoShape";
import CardButton from "./CardButton";
import api from "./api";

const API_BASE_URL = 'https://api.upilabs.com';

const Cards = ({ onCreateProjectClick }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const UPLOADS_BASE_URL = "https://api.upilabs.com/utility/uploads/";

  // ✅ helper: use api with token to fetch secured file
  const fetchSecureImage = async (filePath, fallbackUrl) => {
    if (!filePath) return fallbackUrl;
    try {
      const response = await api.get(`/utility/uploads/${filePath}`, {
        responseType: "blob",
      });
      return URL.createObjectURL(response.data);
    } catch (err) {
      console.warn("Failed to load secure image:", err);
      return fallbackUrl;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/template/all");

        if (response.data.success && response.data.data) {
          // Securely fetch each image with token
          const formattedCards = await Promise.all(
            response.data.data.map(async (card) => {
              const logoPath = card.lastVersion?.logoUrl;
              const bannerPath = card.lastVersion?.mainBannerUrl;

              const imageUrl = await fetchSecureImage(
                bannerPath,
                "https://placehold.co/400x800"
              );
              const logoUrl = await fetchSecureImage(logoPath, defaultFile);

              return {
                id: card.templateId,
                title: card.templateName,
                estimatedValue: card.estimatedValue,
                downloads: card.downloadCount,
                imageUrl,
                logoUrl,
                colorLevel: card.colorLevel,
                logoShape: card.logoType?.toLowerCase(),
                tags: card.tag
                  ? card.tag.split(",").map((tag) => tag.trim()).join(", ")
                  : "",
                industries: card.industries
                  ? card.industries
                      .split(",")
                      .map((industry) => industry.trim())
                      .join(", ")
                  : "",
                description: card.description,
                lastVersion: card.lastVersion,
              };
            })
          );

          setCards(formattedCards);
        } else {
          setError("Invalid response data");
        }
      } catch (err) {
        console.error("Error fetching templates:", err);
        setError("Failed to load templates");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="w-screen flex justify-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="w-screen flex justify-center py-10">Error: {error}</div>;
  }

  if (cards.length === 0) {
    return <div className="w-screen flex justify-center py-10">No templates found</div>;
  }

  return (
    <div className="w-screen flex py-10 justify-center min-w-[1100px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[1240px] items-start justify-items-center px-4">
        {cards.map((card) => (
          <div key={card.id} className="w-[340px]">
            <div className="flex items-center space-x-4">
              <div className="w-25">
                <img src={card.logoUrl} alt="template" className="w-25" />
              </div>
              <div className="text-xl">{card.title}</div>
            </div>
            <div className="flex items-center justify-between mx-auto py-5">
              <div>
                <div>${card.estimatedValue}</div>
                <div className="text-[#5B5B5B] text-sm">Estimated value</div>
              </div>
              <div>
                <div className="text-right">{card.downloads}</div>
                <div className="text-right text-[#5B5B5B] text-sm">
                  Downloads
                </div>
              </div>
            </div>
            <div className="bg-[#E4E4E4] p-7 shadow-sm">
              <img 
                src={card.imageUrl} 
                alt={card.title} 
                className="w-full h-auto"
              />
            </div>
            <div className="flex items-center justify-between mx-auto py-4">
              <div>
                <div className="py-2">Color Level</div>
                <div>
                  <Levels level={card.colorLevel} />
                </div>
              </div>
              <div>
                <div className="text-right py-2">Logo Type</div>
                <div>
                  <LogoShape shape={card.logoShape} />
                </div>
              </div>
            </div>
            <div className="py-3">Tag</div>
            <div className="text-[#5B5B5B] text-sm">{card.tags}</div>
            <div className="py-3">Industries</div>
            <div className="text-[#5B5B5B] text-sm">{card.industries}</div>
            <div className="pt-5 pb-14">
              <CardButton
                text="CREATE PROJECT"
                onClick={() => onCreateProjectClick(card)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
