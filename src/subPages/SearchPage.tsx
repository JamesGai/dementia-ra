import React, { useRef, useState } from "react";
import { searchVideos, Video } from "../services/videoService";
import SearchBar from "../components/home/SearchBar";
import VideoContent from "../components/video/VideoContent";
import VideoPlayerModal from "../components/video/VideoPlayerModal";

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

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | undefined>();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const requestIdRef = useRef(0);

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    const trimmed = value.trim();

    if (!trimmed) {
      requestIdRef.current += 1;
      setLoading(false);
      setError(null);
      setResults([]);
      return;
    }

    const requestId = ++requestIdRef.current;

    try {
      setLoading(true);
      setError(null);
      const data = await searchVideos(trimmed);

      if (requestId !== requestIdRef.current) {
        return;
      }

      const sorted = [...data].sort(
        (a, b) =>
          toMillis((b as any).createdAt) - toMillis((a as any).createdAt),
      );
      setResults(sorted);
    } catch (e) {
      console.error("Failed to search videos:", e);
      if (requestId === requestIdRef.current) {
        setError("Failed to search videos. Please try again.");
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  };

  const handleOpenVideo = (video: Video) => {
    setSelectedVideo(video);
    setIsVideoOpen(true);
  };

  const hasQuery = Boolean(searchTerm.trim());

  return (
    <div className="p-4 space-y-6">
      <SearchBar
        placeholder="Search videos by keyword"
        onSearch={handleSearch}
      />

      {!hasQuery && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-gray-600">
          Start typing to search for videos.
        </div>
      )}

      {hasQuery && loading && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-gray-600">
          Searching videos...
        </div>
      )}

      {hasQuery && error && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-red-600">
          {error}
        </div>
      )}

      {hasQuery && !loading && !error && results.length === 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-gray-600">
          No videos found for "{searchTerm.trim()}".
        </div>
      )}

      {hasQuery && !loading && !error && results.length > 0 && (
        <VideoContent
          segment="all"
          videos={results}
          historyVideos={[]}
          playVideo={handleOpenVideo}
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

export default SearchPage;
