import React, { useEffect, useMemo, useState } from "react";
import Button from "../components/universal/Button";
import Pagination from "../components/video/Pagination";
import Segment from "../components/universal/Segment";
import TopBar from "../components/universal/TopBar";
import VideoContent from "../components/video/VideoContent";
import VideoPlayerModal from "../components/video/VideoPlayerModal";

type VideoSegment = "all" | "history";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  src: string;
}

interface VideoPageProps {
  addToVideoHistory: (video: VideoItem) => void;
  historyVideos: VideoItem[];
  scrollToTop: () => void;
}

// How many videos can be displayed per page
const PAGE_SIZE = 5;

const VideoPage: React.FC<VideoPageProps> = ({
  addToVideoHistory,
  historyVideos,
  scrollToTop,
}) => {
  const instructionVideo: VideoItem = {
    id: "instruction",
    title: "How to use the Videos page",
    description:
      "This short video explains how to browse videos, play them, and review your watch history.",
    duration: "02:30",
    thumbnail: "",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  };

  const dummyVideos: VideoItem[] = useMemo(
    () => [
      {
        id: "1",
        title: "Understanding Dementia",
        description: "A gentle introduction to dementia and what to expect.",
        duration: "08:45",
        thumbnail: "https://picsum.photos/seed/dementia1/640/360",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "2",
        title: "Communication Tips for Care Partners",
        description: "Practical ways to reduce frustration and connect.",
        duration: "06:12",
        thumbnail: "https://picsum.photos/seed/dementia2/640/360",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "3",
        title: "Daily Routines That Help",
        description: "Small routine changes that can support wellbeing.",
        duration: "10:03",
        thumbnail: "https://picsum.photos/seed/dementia3/640/360",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "4",
        title: "Managing Stress as a Carer",
        description: "Simple strategies to prevent burnout and stay balanced.",
        duration: "07:28",
        thumbnail: "https://picsum.photos/seed/dementia4/640/360",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "5",
        title: "Safety at Home Checklist",
        description: "A quick checklist to reduce risks and improve safety.",
        duration: "05:50",
        thumbnail: "https://picsum.photos/seed/dementia5/640/360",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "6",
        title: "Eating and Nutrition Basics",
        description: "Helpful tips for meals, hydration, and routine.",
        duration: "09:10",
        thumbnail: "https://picsum.photos/seed/dementia6/640/360",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "7",
        title: "Supporting Sleep and Night Routine",
        description: "Common sleep issues and what can help.",
        duration: "07:05",
        thumbnail: "https://picsum.photos/seed/dementia7/640/360",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "8",
        title: "What to Do During Sundowning",
        description: "Steps to reduce agitation in late afternoon and evening.",
        duration: "06:40",
        thumbnail: "https://picsum.photos/seed/dementia8/640/360",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "9",
        title: "Medication Safety Tips",
        description: "How to organize and safely manage medications.",
        duration: "04:55",
        thumbnail: "https://picsum.photos/seed/dementia9/640/360",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "10",
        title: "Handling Repetition and Memory Gaps",
        description: "Communication strategies for repeated questions.",
        duration: "08:02",
        thumbnail: "https://picsum.photos/seed/dementia10/640/360",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "11",
        title: "Activities That Build Connection",
        description: "Simple activity ideas for different energy levels.",
        duration: "11:20",
        thumbnail: "https://picsum.photos/seed/dementia11/640/360",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "12",
        title: "Preparing for Appointments",
        description: "What to bring and how to communicate concerns.",
        duration: "05:35",
        thumbnail: "https://picsum.photos/seed/dementia12/640/360",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "13",
        title: "Home Safety: Bathroom and Kitchen",
        description: "Practical changes to reduce accidents at home.",
        duration: "07:58",
        thumbnail: "https://picsum.photos/seed/dementia13/640/360",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "14",
        title: "When to Ask for Help",
        description: "Recognizing burnout and accessing support services.",
        duration: "06:30",
        thumbnail: "https://picsum.photos/seed/dementia14/640/360",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "15",
        title: "Self-care Micro Habits",
        description: "Tiny daily habits that reduce stress over time.",
        duration: "04:20",
        thumbnail: "https://picsum.photos/seed/dementia15/640/360",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
    ],
    [],
  );

  const videoSegmentOptions = [
    { value: "all", label: "All videos" },
    { value: "history", label: "History" },
  ] as const;

  const [segment, setSegment] = useState<VideoSegment>("all");
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | undefined>(
    undefined,
  );
  const [page, setPage] = useState(1);

  const sourceList = segment === "all" ? dummyVideos : historyVideos;
  const totalPages = Math.max(1, Math.ceil(sourceList.length / PAGE_SIZE));

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

  // Slice current page items
  const pagedVideos = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sourceList.slice(start, start + PAGE_SIZE);
  }, [sourceList, page]);

  const handleOpenInstruction = () => {
    setSelectedVideo(instructionVideo);
    setIsVideoOpen(true);
  };

  const handleOpenVideo = (video: VideoItem) => {
    addToVideoHistory(video);
    setSelectedVideo(video);
    setIsVideoOpen(true);
  };

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
      <TopBar title="Videos" />
      <Segment
        value={segment}
        segmentOptions={videoSegmentOptions}
        setSegment={setSegment}
      />
      <Button text="User Instruction" onClick={handleOpenInstruction} />
      <VideoContent
        segment={segment}
        videos={segment === "all" ? pagedVideos : dummyVideos}
        historyVideos={segment === "history" ? pagedVideos : historyVideos}
        playVideo={handleOpenVideo}
      />
      {sourceList.length > PAGE_SIZE && (
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
