import React from "react";
import { IonSearchbar } from "@ionic/react";

interface KeywordSearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<KeywordSearchBarProps> = ({
  placeholder = "Search videos, articles, resources...",
}) => {
  return (
    <div className="bg-white rounded-2xl p-1 shadow-sm border border-gray-100">
      <IonSearchbar
        placeholder={placeholder}
        className="custom-searchbar"
        style={
          {
            "--background": "transparent",
            "--box-shadow": "none",
            padding: "0",
          } as any
        }
      />
    </div>
  );
};

export default SearchBar;
