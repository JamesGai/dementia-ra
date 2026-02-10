import React, { useEffect, useMemo, useState } from "react";
import { IonIcon } from "@ionic/react";
import { funnelOutline } from "ionicons/icons";
import { fetchAllVideos, Video } from "../services/videoService";
import Button from "../components/universal/Button";
import Pagination from "../components/video/Pagination";
import Segment from "../components/universal/Segment";
import VideoContent from "../components/video/VideoContent";
import VideoPlayerModal from "../components/video/VideoPlayerModal";

export type VideoSegment = "all" | "history";

interface VideoPageProps {
  addToVideoHistory: (video: Video) => void;
  historyVideos: Video[];
  scrollToTop: () => void;
}

const PAGE_SIZE = 5; // How many videos can be displayed per page

const VideoPage: React.FC<VideoPageProps> = ({
  addToVideoHistory,
  historyVideos,
  scrollToTop,
}) => {
  const instructionVideo: Video = {
    id: "dawd",
    title: "How to use the Videos page",
    description:
      "This short video explains how to browse videos, play them, and review your watch history.",
    durationText: "02:30",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  };

  const videoSegmentOptions = [
    { value: "all", label: "All videos" },
    { value: "history", label: "History" },
  ] as const;

  const [segment, setSegment] = useState<VideoSegment>("all");
  const [allVideos, setAllVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | undefined>(
    undefined,
  );
  const [page, setPage] = useState(1);

  const sourceList = segment === "all" ? allVideos : historyVideos;
  const totalPages = Math.max(1, Math.ceil(sourceList.length / PAGE_SIZE));

  // Slice current page items
  const pagedVideos = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sourceList.slice(start, start + PAGE_SIZE);
  }, [sourceList, page]);

  const goPrev = () => {
    setPage((prev) => {
      const next = Math.max(1, prev - 1);
      if (next !== prev) scrollToTop();
      return next;
    });
  };

  const goNext = () => {
    setPage((prev) => {
      const next = Math.min(totalPages, prev + 1);
      if (next !== prev) scrollToTop();
      return next;
    });
  };

  const handleOpenInstruction = () => {
    setSelectedVideo(instructionVideo);
    setIsVideoOpen(true);
  };

  const handleOpenVideo = (video: Video) => {
    addToVideoHistory(video);
    setSelectedVideo(video);
    setIsVideoOpen(true);
  };

  // Retrieve all videos from Firestore
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllVideos();
        setAllVideos(data);
      } catch (e) {
        console.error("❌ Failed to fetch videos:", e);
        setError("Failed to load videos. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Reset page when switching tabs between All Videos and History
  useEffect(() => {
    setPage(1);
  }, [segment]);

  // Clamp page if history shrinks, etc.
  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  // Scroll to top when segment or page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="p-4 space-y-6">
      <Segment
        value={segment}
        segmentOptions={videoSegmentOptions}
        setSegment={setSegment}
      />
      {/* Instruction video and filtering button */}
      <div className="flex items-stretch gap-3">
        <div className="flex-1">
          <Button text="User Instruction" onClick={handleOpenInstruction} />
        </div>
        <button
          type="button"
          onClick={() => console.log("TODO: open filter")}
          className="flex-1 bg-[#9CA3AF] text-white rounded-2xl shadow-md px-4 py-3 active:opacity-90"
          aria-label="Filter by category"
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold">Filter by category</span>
            <IonIcon icon={funnelOutline} className="text-xl" />
          </div>
        </button>
      </div>
      {/* Video list */}
      {loading && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-gray-600">
          Loading videos...
        </div>
      )}
      {error && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-red-600">
          {error}
        </div>
      )}
      {!loading && !error && (
        <VideoContent
          segment={segment}
          videos={segment === "all" ? pagedVideos : []}
          historyVideos={segment === "history" ? pagedVideos : historyVideos}
          playVideo={handleOpenVideo}
        />
      )}
      {!loading && sourceList.length > PAGE_SIZE && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
      <VideoPlayerModal
        isVideoOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        video={selectedVideo}
      />
    </div>
  );
};

export default VideoPage;
