import React, { useMemo, useState } from "react";
import Button from "../components/universe/Button";
import Pagination from "../components/video/Pagination";
import Segment from "../components/video/Segment";
import TopBar from "../components/universe/TopBar";

type Segment = "all" | "history";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
}

const VideoPage: React.FC = () => {
  const [segment, setSegment] = useState<Segment>("all");
  const [page, setPage] = useState(1);
  const totalPages = 5;
  const goPrev = () => setPage((prev) => Math.max(1, prev - 1));
  const goNext = () => setPage((prev) => Math.min(totalPages, prev + 1));

  const dummyVideos: VideoItem[] = useMemo(
    () => [
      {
        id: "1",
        title: "Understanding Dementia",
        description: "A gentle introduction to dementia and what to expect.",
        duration: "08:45",
        thumbnail: "https://picsum.photos/seed/dementia1/640/360",
      },
      {
        id: "2",
        title: "Communication Tips for Care Partners",
        description: "Practical ways to reduce frustration and connect.",
        duration: "06:12",
        thumbnail: "https://picsum.photos/seed/dementia2/640/360",
      },
      {
        id: "3",
        title: "Daily Routines That Help",
        description: "Small routine changes that can support wellbeing.",
        duration: "10:03",
        thumbnail: "https://picsum.photos/seed/dementia3/640/360",
      },
      {
        id: "4",
        title: "Managing Stress as a Carer",
        description: "Simple strategies to prevent burnout and stay balanced.",
        duration: "07:28",
        thumbnail: "https://picsum.photos/seed/dementia4/640/360",
      },
      {
        id: "5",
        title: "Safety at Home Checklist",
        description: "A quick checklist to reduce risks and improve safety.",
        duration: "05:50",
        thumbnail: "https://picsum.photos/seed/dementia5/640/360",
      },
    ],
    [],
  );

  return (
    <div className="p-4 space-y-6">
      <TopBar title="Videos" />
      <Segment value={segment} onChange={setSegment} />
      <Button
        text="User Instruction"
        onClick={() => console.log("Instruction of video page presented")}
      />
      {/* Video content */}
      {segment === "all" ? (
        <div className="space-y-4">
          {dummyVideos.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => console.log("Open video:", v.id)}
              className="w-full bg-white rounded-2xl shadow-md overflow-hidden text-left active:opacity-90"
            >
              <div className="relative">
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg">
                  {v.duration}
                </div>
              </div>
              <div className="p-4">
                <div className="font-bold text-gray-900">{v.title}</div>
                {/* <div className="mt-1 text-xs text-gray-600 leading-relaxed">
                  {v.description}
                </div> */}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-4 shadow-md text-center text-sm text-gray-500">
          No videos watched yet
        </div>
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={goPrev}
        onNext={goNext}
      />
    </div>
  );
};

export default VideoPage;
