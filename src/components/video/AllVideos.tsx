import React from "react";
import { Video } from "../../services/videoService";

interface AllVideosProps {
  videos: Video[];
  playVideo: (video: Video) => void;
}

const AllVideos: React.FC<AllVideosProps> = ({ videos, playVideo }) => {
  return (
    <div className="space-y-4">
      {videos.map((v) => (
        <button
          key={v.id}
          type="button"
          onClick={() => playVideo(v)}
          className="w-full bg-white rounded-2xl shadow-md overflow-hidden text-left active:opacity-90"
        >
          <div className="relative">
            {v.thumbnailUrl ? (
              <img
                src={v.thumbnailUrl}
                alt={v.title}
                className="w-full h-40 object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200" />
            )}
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg">
              {v.durationText}
            </div>
          </div>
          <div className="p-4">
            <div className="text-[#2e6f73] font-extrabold tracking-wide">
              {v.title}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default AllVideos;
