import React, { useState } from "react";
import defaultFile from "../assets/file-template.svg";
import Levels from "./Levels";
import LogoShape from "./LogoShape";
import CardButton from "./CardButton";
import StarRating from "./StarRating";

const cardData = [
  {
    id: 1,
    title: "The Refresher's",
    projectValue: 25,
    source: "Themeforest",
    companyLogo: "https://placehold.co/400x800",
    imageUrl: "https://placehold.co/400x800",
    logoShape: "rectangle",
    completedOn: "2025-07-24",
    sells: "Sneakers",
    overallRating: 4,
    hoursSpent: 4,
    brandName: "Thermos",
    contactPerson: "John Doe",
    downloadLink: "https://placehold.co/400x800",
  },
  {
    id: 2,
    title: "UrbanVibe",
    projectValue: 35,
    source: "Creative Market",
    companyLogo: "https://placehold.co/400x800/2c3e50/ffffff",
    imageUrl: "https://placehold.co/400x800/2c3e50/ffffff",
    logoShape: "square",
    completedOn: "2025-07-20",
    sells: "Fashion",
    overallRating: 4.5,
    hoursSpent: 6,
    brandName: "UrbanStyle",
    contactPerson: "Jane Smith",
    downloadLink: "https://placehold.co/400x800/2c3e50/ffffff",
  },
  {
    id: 3,
    title: "EcoLife",
    projectValue: 45,
    source: "Behance",
    companyLogo: "https://placehold.co/400x800/27ae60/ffffff",
    imageUrl: "https://placehold.co/400x800/27ae60/ffffff",
    logoShape: "circle",
    completedOn: "2025-07-15",
    sells: "Eco Products",
    overallRating: 5,
    hoursSpent: 8,
    brandName: "GreenLife",
    contactPerson: "Alex Johnson",
    downloadLink: "https://placehold.co/400x800/27ae60/ffffff",
  },
  {
    id: 4,
    title: "TechGadgets",
    projectValue: 50,
    source: "Dribbble",
    companyLogo: "https://placehold.co/400x800/3498db/ffffff",
    imageUrl: "https://placehold.co/400x800/3498db/ffffff",
    logoShape: "square",
    completedOn: "2025-07-10",
    sells: "Electronics",
    overallRating: 4.2,
    hoursSpent: 10,
    brandName: "TechHaven",
    contactPerson: "Mike Brown",
    downloadLink: "https://placehold.co/400x800/3498db/ffffff",
  },
  {
    id: 5,
    title: "Foodie's Delight",
    projectValue: 30,
    source: "Behance",
    companyLogo: "https://placehold.co/400x800/e74c3c/ffffff",
    imageUrl: "https://placehold.co/400x800/e74c3c/ffffff",
    logoShape: "rectangle",
    completedOn: "2025-07-05",
    sells: "Restaurant",
    overallRating: 4.8,
    hoursSpent: 7,
    brandName: "Gourmet Bites",
    contactPerson: "Sarah Wilson",
    downloadLink: "https://placehold.co/400x800/e74c3c/ffffff",
  },
  {
    id: 6,
    title: "Fitness Pro",
    projectValue: 40,
    source: "Themeforest",
    companyLogo: "https://placehold.co/400x800/9b59b6/ffffff",
    imageUrl: "https://placehold.co/400x800/9b59b6/ffffff",
    logoShape: "circle",
    completedOn: "2025-07-01",
    sells: "Fitness",
    overallRating: 4.6,
    hoursSpent: 9,
    brandName: "FitLife",
    contactPerson: "David Clark",
    downloadLink: "https://placehold.co/400x800/9b59b6/ffffff",
  },
  {
    id: 7,
    title: "Travel Bug",
    projectValue: 55,
    source: "Creative Market",
    companyLogo: "https://placehold.co/400x800/1abc9c/ffffff",
    imageUrl: "https://placehold.co/400x800/1abc9c/ffffff",
    logoShape: "square",
    completedOn: "2025-06-25",
    sells: "Travel",
    overallRating: 4.9,
    hoursSpent: 12,
    brandName: "Wanderlust",
    contactPerson: "Emily Davis",
    downloadLink: "https://placehold.co/400x800/1abc9c/ffffff",
  },
  {
    id: 8,
    title: "Pet Paradise",
    projectValue: 35,
    source: "Dribbble",
    companyLogo: "https://placehold.co/400x800/f1c40f/ffffff",
    imageUrl: "https://placehold.co/400x800/f1c40f/ffffff",
    logoShape: "circle",
    completedOn: "2025-06-20",
    sells: "Pet Care",
    overallRating: 4.7,
    hoursSpent: 6,
    brandName: "Pawfect",
    contactPerson: "Robert Taylor",
    downloadLink: "https://placehold.co/400x800/f1c40f/ffffff",
  },
  {
    id: 9,
    title: "BookWorm",
    projectValue: 28,
    source: "Behance",
    companyLogo: "https://placehold.co/400x800/e67e22/ffffff",
    imageUrl: "https://placehold.co/400x800/e67e22/ffffff",
    logoShape: "rectangle",
    completedOn: "2025-06-15",
    sells: "Books",
    overallRating: 4.3,
    hoursSpent: 5,
    brandName: "ReadMore",
    contactPerson: "Lisa Johnson",
    downloadLink: "https://placehold.co/400x800/e67e22/ffffff",
  },
  {
    id: 10,
    title: "Music Hub",
    projectValue: 42,
    source: "Themeforest",
    companyLogo: "https://placehold.co/400x800/e74c3c/ffffff",
    imageUrl: "https://placehold.co/400x800/e74c3c/ffffff",
    logoShape: "circle",
    completedOn: "2025-06-10",
    sells: "Music",
    overallRating: 4.5,
    hoursSpent: 8,
    brandName: "Melody",
    contactPerson: "Daniel White",
    downloadLink: "https://placehold.co/400x800/e74c3c/ffffff",
  },
  {
    id: 11,
    title: "Art Gallery",
    projectValue: 38,
    source: "Creative Market",
    companyLogo: "https://placehold.co/400x800/9b59b6/ffffff",
    imageUrl: "https://placehold.co/400x800/9b59b6/ffffff",
    logoShape: "square",
    completedOn: "2025-06-05",
    sells: "Art",
    overallRating: 4.6,
    hoursSpent: 7,
    brandName: "CreativeMinds",
    contactPerson: "Sophia Brown",
    downloadLink: "https://placehold.co/400x800/9b59b6/ffffff",
  },
  {
    id: 12,
    title: "Home Decor",
    projectValue: 32,
    source: "Dribbble",
    companyLogo: "https://placehold.co/400x800/1abc9c/ffffff",
    imageUrl: "https://placehold.co/400x800/1abc9c/ffffff",
    logoShape: "rectangle",
    completedOn: "2025-05-30",
    sells: "Home & Living",
    overallRating: 4.4,
    hoursSpent: 6,
    brandName: "CozyHome",
    contactPerson: "Michael Wilson",
    downloadLink: "https://placehold.co/400x800/1abc9c/ffffff",
  }
];

const CardsPorto = () => {
  const [visibleItems, setVisibleItems] = useState(6);
  const itemsPerPage = 6;

  const loadMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + itemsPerPage);
  };

  return (
    <div className="w-screen flex flex-col items-center py-10 min-w-[1100px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[1240px] place-items-center px-4">
        {cardData.slice(0, visibleItems).map((card) => (
          <div key={card.id} className="w-[340px]">
            <div className="flex items-center space-x-4">
              <div>
                <img src={defaultFile} alt="arrowDown" className="h-12" />
              </div>
              <div className="text-2xl">{card.title}</div>
            </div>
            <div className="flex items-center justify-between mx-auto py-5">
              <div>
                <div>${card.projectValue}</div>
                <div className="text-[#5B5B5B] text-sm">Project Value</div>
              </div>
              <div>
                <div className="text-right">{card.source}</div>
                <div className="text-right text-[#5B5B5B] text-sm">
                  Source
                </div>
              </div>
            </div>
            <div className="bg-[#E4E4E4] p-7 shadow-sm">
              <img src={card.imageUrl} alt={card.title} />
            </div>
            <div className="flex items-center justify-between mx-auto pt-5">
              <div>
                <div className="text-[#5B5B5B] text-sm">Branding name</div>
                <div>{card.brandName}</div>
              </div>
              <div>
                <div className="text-right text-[#5B5B5B] text-sm">
                  Client
                </div>
                <div className="text-right">{card.contactPerson}</div>
              </div>
            </div>
            <div className="flex items-center justify-between mx-auto py-5">
              <div>
                <div className="text-[#5B5B5B] text-sm">Hours spent</div>
                <div>{card.hoursSpent}</div>
              </div>
              <div>
                <div className="text-right text-[#5B5B5B] text-sm">
                  Completed on
                </div>
                <div className="text-right">{card.completedOn}</div>
              </div>
            </div>
            <div>
              <div className="text-[#5B5B5B] text-sm mb-1">Overall rating</div>
              <StarRating rating={card.overallRating} />
            </div>
            <div className="pt-5 pb-14">
              <CardButton
                text="DOWNLOAD"
              />
            </div>
          </div>
        ))}
      </div>
      {visibleItems < cardData.length && (
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
