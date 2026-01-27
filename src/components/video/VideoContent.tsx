import React from "react";
import { VideoSegment, VideoItem } from "../../pages/VideoPage";

interface VideoContentProps {
  segment: VideoSegment;
  videos: VideoItem[];
  historyVideos: VideoItem[];
  playVideo: (video: VideoItem) => void;
}

const VideoContent: React.FC<VideoContentProps> = ({
  segment,
  videos,
  historyVideos,
  playVideo,
}) => {
  // All videos
  if (segment === "all") {
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
  }
  // History
  if (historyVideos.length > 0) {
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
  }
  // Empty history
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md text-center text-sm text-gray-500">
      No videos watched yet
    </div>
  );
};

export default VideoContent;
