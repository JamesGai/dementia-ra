import React from "react";

const Image: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <img
        src="Carers.png"
        alt="Carer supporting an older adult"
        className="w-full h-56 object-cover"
      />
    </div>
  );
};

export default Image;
