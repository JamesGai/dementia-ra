import React from "react";
import AllVideos from "./AllVideos";
import History from "./History";
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
  if (segment === "all") {
    return <AllVideos videos={videos} playVideo={playVideo} />;
  }
  if (historyVideos.length > 0) {
    return <History historyVideos={historyVideos} playVideo={playVideo} />;
  }
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md text-center text-sm text-gray-500">
      No videos watched yet
    </div>
  );
};

export default VideoContent;
