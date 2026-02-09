import React from "react";
import { Video } from "../../services/videoService";

interface HistoryVideosProps {
  historyVideos: Video[];
  playVideo: (video: Video) => void;
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
