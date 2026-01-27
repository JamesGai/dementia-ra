import React from "react";
import type { VideoItem } from "../../pages/VideoPage";

interface AllVideosProps {
  videos: VideoItem[];
  playVideo: (video: VideoItem) => void;
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
            <img
              src={v.image}
              alt={v.title}
              className="w-full h-40 object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg">
              {v.duration}
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
