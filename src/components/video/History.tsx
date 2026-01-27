import React from "react";
import type { VideoItem } from "../../pages/VideoPage";

interface HistoryVideosProps {
  historyVideos: VideoItem[];
  playVideo: (video: VideoItem) => void;
}

const History: React.FC<HistoryVideosProps> = ({
  historyVideos,
  playVideo,
}) => {
  return (
    <div className="space-y-4">
      {historyVideos.map((v) => (
        <button
          key={v.id}
          type="button"
          onClick={() => playVideo(v)}
          className="w-full bg-white rounded-2xl shadow-md overflow-hidden text-left active:opacity-90"
        >
          <div className="flex items-center gap-4 p-4">
            <img
              src={v.image}
              alt={v.title}
              className="w-24 h-16 object-cover rounded-lg"
              loading="lazy"
            />
            <div className="flex-1">
              <div className="text-[#2e6f73] font-bold">{v.title}</div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default History;
