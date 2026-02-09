import React from "react";
import { Video } from "../../services/videoService";
import VideoList from "./VideoList";
import { VideoSegment } from "../../pages/VideoPage";

interface VideoContentProps {
  segment: VideoSegment;
  videos: Video[];
  historyVideos: Video[];
  playVideo: (video: Video) => void;
}

const VideoContent: React.FC<VideoContentProps> = ({
  segment,
  videos,
  historyVideos,
  playVideo,
}) => {
  if (segment === "all") {
    return <VideoList videos={videos} playVideo={playVideo} />;
  }
  if (historyVideos.length > 0) {
    return <VideoList videos={historyVideos} playVideo={playVideo} />;
  }
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md text-center text-sm text-gray-500">
      No videos watched yet
    </div>
  );
};

export default VideoContent;
