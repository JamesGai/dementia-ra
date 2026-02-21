import React, { useEffect, useMemo, useState } from "react";
import { funnelOutline, playCircleOutline } from "ionicons/icons";
import {
  fetchAllVideos,
  fetchVideoInstructionVideo,
  Video,
} from "../services/videoService";
import Button from "../components/universal/Button";
import LabeledSelectionInput from "../components/profile/LabeledSelectionInput";
import Pagination from "../components/video/Pagination";
import LoadingOverlay from "../components/universal/LoadingOverlay";
import Segment from "../components/universal/Segment";
import VideoContent from "../components/video/VideoContent";
import VideoPlayerModal from "../components/video/VideoPlayerModal";

export type VideoSegment = "all" | "history";

interface VideoPageProps {
  scrollToTop: () => void;
}

const PAGE_SIZE = 5; // How many videos can be displayed per page

const VideoPage: React.FC<VideoPageProps> = ({ scrollToTop }) => {
  const videoSegmentOptions = [
    { value: "all", label: "All videos" },
    { value: "history", label: "History" },
  ] as const;

  const moduleOptions = [
    { value: 1, label: "Module 1" },
    { value: 2, label: "Module 2" },
    { value: 3, label: "Module 3" },
    { value: 4, label: "Module 4" },
    { value: 5, label: "Module 5" },
  ];

  const [segment, setSegment] = useState<VideoSegment>("all");
  const [instructionVideo, setInstructionVideo] = useState<Video | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | undefined>(
    undefined,
  );
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [allVideos, setAllVideos] = useState<Video[]>([]);
  const [historyVideos, setHistoryVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const baseList = segment === "all" ? allVideos : historyVideos;

  /**
   * Filter video list based on module number
   */
  const sourceList = useMemo(() => {
    /**
     * Get publish date before sorting in descending order
     */
    const toMillis = (createdAt: any): number => {
      if (!createdAt) return 0;
      if (typeof createdAt?.toDate === "function") {
        return createdAt.toDate().getTime();
      }
      if (createdAt instanceof Date) {
        return createdAt.getTime();
      }
      const d = new Date(createdAt);
      if (!Number.isNaN(d.getTime())) {
        return d.getTime();
      }
      return 0;
    };
    const filtered =
      selectedModules.length === 0
        ? baseList
        : baseList.filter((v: any) => selectedModules.includes(v.module));
    return [...filtered].sort(
      (a: any, b: any) => toMillis(b.createdAt) - toMillis(a.createdAt),
    );
  }, [baseList, selectedModules]);

  const totalPages = Math.max(1, Math.ceil(sourceList.length / PAGE_SIZE));

  /**
   * Slice current page items
   */
  const pagedVideos = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sourceList.slice(start, start + PAGE_SIZE);
  }, [sourceList, page]);

  const handleOpenInstruction = () => {
    if (!instructionVideo) return;
    setSelectedVideo(instructionVideo);
    setIsVideoOpen(true);
  };

  const handleOpenVideo = (video: Video) => {
    setHistoryVideos((prev) => {
      const filtered = prev.filter((v) => v.id !== video.id);
      return [video, ...filtered];
    });
    setSelectedVideo(video);
    setIsVideoOpen(true);
  };

  const handleOpenFilter = () => {
    const el = document.querySelector(
      "ion-select",
    ) as HTMLIonSelectElement | null;
    el?.open();
  };

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

  /**
   * Retrieve all videos from Firestore
   */
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const [instruction, data] = await Promise.all([
          fetchVideoInstructionVideo(),
          fetchAllVideos(),
        ]);
        setAllVideos(data);
        setInstructionVideo(instruction);
      } catch (e) {
        console.error("❌ Failed to fetch videos:", e);
        setError("Failed to load videos. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /**
   * Reset page when switching tabs between All Videos and History
   */
  useEffect(() => {
    setPage(1);
  }, [segment]);

  /**
   * Clamp page if history shrinks, etc.
   */
  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  /**
   * Scroll to top when segment or page changes
   */
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
        <div className="flex-1 relative">
          <Button
            text="User Instruction"
            icon={playCircleOutline}
            onClick={handleOpenInstruction}
          />
        </div>
        <div className="flex-1 relative">
          <Button
            text="Filter by module"
            isFilter
            icon={funnelOutline}
            iconPosition="right"
            onClick={handleOpenFilter}
          />
        </div>
      </div>
      {/* Video list */}
      {loading && <LoadingOverlay text="Loading videos..." />}
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
      <div className="hidden">
        <LabeledSelectionInput
          label="Filter by module"
          placeholder="Select a module"
          value={selectedModules}
          options={moduleOptions}
          isMultiple
          onChange={(value) => {
            setSelectedModules(value);
            setPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default VideoPage;
