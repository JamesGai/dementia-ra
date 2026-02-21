import React from "react";
import { IonSearchbar } from "@ionic/react";

interface KeywordSearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const SearchBar: React.FC<KeywordSearchBarProps> = ({
  placeholder = "Search",
  onSearch,
}) => {
  return (
    <div className="bg-white rounded-2xl p-1 shadow-sm border border-gray-100">
      <IonSearchbar
        placeholder={placeholder}
        debounce={400} // Ionic built-in debounce
        onIonChange={(e) => {
          const value = e.detail.value ?? "";
          onSearch?.(value);
        }}
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
