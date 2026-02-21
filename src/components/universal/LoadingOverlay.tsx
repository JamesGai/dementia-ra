import React from "react";

interface LoadingOverlayProps {
  text?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  text = "Loading...",
}) => {
  return (
    <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-white px-6 py-5 shadow-lg">
        <span className="inline-block h-10 w-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
        <span className="text-sm font-medium text-gray-700">{text}</span>
      </div>
    </div>
  );
};

export default LoadingOverlay;
