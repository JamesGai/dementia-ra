import React from "react";
import TopBar from "../components/universe/TopBar";
import { VideoItem } from "../pages/VideoPage";

interface VideoDetailPageProps {
  video?: VideoItem;
}

const VideoDetailPage: React.FC<VideoDetailPageProps> = ({ video }) => {
  if (!video) {
    return (
      <div className="p-4 space-y-6">
        <TopBar title="Video" />
        <div className="bg-white rounded-2xl p-4 shadow-md text-sm text-gray-500">
          No video selected.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Video player */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {video.src ? (
          <video
            controls
            playsInline
            className="w-full h-56 bg-black object-contain"
            src={video.src}
          />
        ) : (
          <div className="h-56 flex items-center justify-center text-sm text-gray-500">
            Video coming soon
          </div>
        )}
      </div>

      {/* Title + Description */}
      <div className="bg-white rounded-2xl p-4 shadow-md space-y-2">
        <div className="text-[#2e6f73] font-extrabold tracking-wide">
          {video.title}
        </div>
        <div className="h-px w-full bg-gray-400" />
        <div className="text-gray-700 leading-relaxed">{video.description}</div>
      </div>
    </div>
  );
};

export default VideoDetailPage;
