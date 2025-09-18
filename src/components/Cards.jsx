import React from "react";
import defaultFile from "../assets/file-template.svg";
import Levels from "./Levels";
import LogoShape from "./LogoShape";
import CardButton from "./CardButton";

const cardData = [
  {
    id: 1,
    title: "The Refresher’s",
    estimatedValue: 2567,
    downloads: 100,
    imageUrl: "https://placehold.co/400x800",
    colorLevel: 3,
    logoShape: "rectangle",
    tags: "Simple, Clean, Strong Branding, Multipurpose, Strong Color",
    industries: "Sneakers, Apparels, Toys, Furniture",
  },
  {
    id: 2,
    title: "Retails CO",
    estimatedValue: 2567,
    downloads: 100,
    imageUrl: "https://placehold.co/400x800",
    colorLevel: 3,
    logoShape: "square",
    tags: "Simple, Clean, Strong Branding, Multipurpose, Strong Color",
    industries: "Sneakers, Apparels, Toys, Furniture",
  },
  {
    id: 3,
    title: "Thermos",
    estimatedValue: 2567,
    downloads: 100,
    imageUrl: "https://placehold.co/400x800",
    colorLevel: 3,
    logoShape: "rectangle",
    tags: "Simple, Clean, Strong Branding, Multipurpose, Strong Color",
    industries: "Sneakers, Apparels, Toys, Furniture",
  },
  {
    id: 4,
    title: "UrbanVibe",
    estimatedValue: 3200,
    downloads: 145,
    imageUrl: "https://placehold.co/400x800/2c3e50/ffffff",
    colorLevel: 2,
    logoShape: "square",
    tags: "Modern, Minimalist, Urban, Versatile, Bold Typography",
    industries: "Streetwear, Music, Sports, Lifestyle",
  },
  {
    id: 5,
    title: "EcoLife",
    estimatedValue: 2850,
    downloads: 210,
    imageUrl: "https://placehold.co/400x800/27ae60/ffffff",
    colorLevel: 1,
    logoShape: "rectangle",
    tags: "Eco-friendly, Organic, Natural, Sustainable, Fresh",
    industries: "Health, Food, Beauty, Home Decor, Wellness",
  },
];

const Cards = ({ onCreateProjectClick }) => {
  return (
    <div className="w-screen flex py-10 justify-center min-w-[1100px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[1240px] place-items-center px-4">
        {cardData.map((card) => (
          <div key={card.id} className="w-[340px]">
            <div className="flex items-center space-x-4">
              <div>
                <img src={defaultFile} alt="arrowDown" className="h-12" />
              </div>
              <div className="text-2xl">{card.title}</div>
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
              <img src={card.imageUrl} alt={card.title} />
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
