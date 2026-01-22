import React from "react";

interface TextButtonProps {
  text: string;
  onClick: () => void;
}

const TextButton: React.FC<TextButtonProps> = ({ text, onClick }) => {
  return (
    <div className="space-y-2">
      <button
        onClick={onClick}
        type="button"
        className="text-sm font-semibold text-[#2e6f73] mt-1 active:opacity-70"
      >
        {text}
      </button>
    </div>
  );
};

export default TextButton;
