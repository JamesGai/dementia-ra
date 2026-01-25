import React, { useMemo } from "react";
import { useLocation, useParams, useHistory } from "react-router";

type RouteParams = { id: string };

interface VideoItem {
  id: string;
  title: string;
  description: string;
  src: string;
}

const VideoDetailPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const location = useLocation<{ video?: VideoItem }>();
  const history = useHistory();

  // if user refreshed, router state might be gone
  // fallback: find from local dummy list
  const fallbackVideos: VideoItem[] = useMemo(
    () => [
      {
        id: "1",
        title: "Understanding Dementia",
        description: "A gentle introduction to dementia and what to expect.",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "2",
        title: "Communication Tips for Care Partners",
        description: "Practical ways to reduce frustration and connect.",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "3",
        title: "Daily Routines That Help",
        description: "Small routine changes that can support wellbeing.",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "4",
        title: "Managing Stress as a Carer",
        description: "Simple strategies to prevent burnout and stay balanced.",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      {
        id: "5",
        title: "Safety at Home Checklist",
        description: "A quick checklist to reduce risks and improve safety.",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
    ],
    [],
  );

  const video =
    location.state?.video || fallbackVideos.find((v) => v.id === id);

  if (!video) {
    return (
      <div className="p-4">
        <div className="text-lg font-bold text-gray-900">Video not found</div>
        <button
          className="mt-4 px-4 py-2 rounded-xl bg-gray-900 text-white"
          onClick={() => history.goBack()}
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Simple header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => history.goBack()}
          className="px-3 py-2 rounded-xl bg-white shadow-md text-sm font-semibold text-gray-800"
        >
          Back
        </button>
        <div className="text-lg font-bold text-gray-900">Video</div>
      </div>

      {/* Player */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <video
          controls
          playsInline
          className="w-full h-56 bg-black object-contain"
          src={video.src}
        />
      </div>

      {/* Title + Description */}
      <div className="bg-white rounded-2xl shadow-md p-4 space-y-2">
        <div className="text-base font-bold text-gray-900">{video.title}</div>
        <div className="text-sm text-gray-600 leading-relaxed">
          {video.description}
        </div>
      </div>
    </div>
  );
};

export default VideoDetailPage;
