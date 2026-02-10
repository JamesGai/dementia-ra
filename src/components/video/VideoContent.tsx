import React from "react";
import { Video } from "../../services/videoService";
import { VideoSegment } from "../../pages/VideoPage";

interface VideoContentProps {
  segment: VideoSegment;
  videos: Video[];
  historyVideos: Video[];
  playVideo: (video: Video) => void;
}

const formatPublishDate = (input: any): string => {
  if (!input) return "";
  if (typeof input?.toDate === "function") {
    return input.toDate().toLocaleDateString("en-NZ", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
  if (input instanceof Date) {
    return input.toLocaleDateString("en-NZ", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
  if (typeof input === "string") {
    const d = new Date(input);
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleDateString("en-NZ", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }
    return input;
  }
  return "";
};

const VideoContent: React.FC<VideoContentProps> = ({
  segment,
  videos,
  historyVideos,
  playVideo,
}) => {
  const list = segment === "all" ? videos : historyVideos;

  if (segment !== "all" && historyVideos.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-md text-center text-sm text-gray-500">
        No videos watched yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {list.map((v) => (
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
          <div className="p-4 space-y-1">
            <div className="text-[#2e6f73] font-extrabold tracking-wide">
              {v.title}
            </div>
            <div className="text-sm text-gray-500">
              {(v as any).numOfViewed ?? 0} view
              {(v as any).numOfViewed === 1 ? "" : "s"}
              {formatPublishDate((v as any).createdAt)
                ? ` • ${formatPublishDate((v as any).createdAt)}`
                : ""}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default VideoContent;
