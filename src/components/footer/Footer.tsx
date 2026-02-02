import React from "react";
import { IonIcon } from "@ionic/react";
import { FooterItem, Page } from "../../App";

interface FooterProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  isLoggedIn: boolean;
  items: FooterItem[];
}

const Footer: React.FC<FooterProps> = ({
  activePage,
  setActivePage,
  isLoggedIn,
  items,
}) => {
  return (
    <div className="flex justify-around items-center bg-white border-t border-gray-100 py-3 px-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {items
        .filter((item) => item.show(isLoggedIn))
        .map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setActivePage(item.to)}
            className={`flex flex-col items-center flex-1 py-1 transition-all ${
              item.isActive(activePage) ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <IonIcon
              icon={
                item.isActive(activePage) ? item.iconFilled : item.iconOutline
              }
              className="text-2xl mb-1"
            />
            <span className="text-[10px] font-medium">{item.label}</span>
            {item.isActive(activePage) && (
              <div className="w-1 h-1 bg-blue-600 rounded-full mt-1" />
            )}
          </button>
        ))}
    </div>
  );
};

export default Footer;
