
import React from 'react';
import { IonIcon } from '@ionic/react';
import { play, bookmarkOutline, eyeOutline } from 'ionicons/icons';

const VIDEOS = [
  {
    id: 1,
    title: 'Understanding Dementia: The Basics',
    thumbnail: 'https://picsum.photos/seed/dementia1/800/450',
    category: 'Education',
    views: '2.3k',
    duration: '12:45'
  },
  {
    id: 2,
    title: 'Effective Communication Strategies',
    thumbnail: 'https://picsum.photos/seed/dementia2/800/450',
    category: 'Communication',
    views: '1.8k',
    duration: '8:30'
  },
  {
    id: 3,
    title: 'Managing Challenging Behaviors',
    thumbnail: 'https://picsum.photos/seed/dementia3/800/450',
    category: 'Education',
    views: '3.1k',
    duration: '15:20'
  }
];

const VideoLibrary: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Video Library</h2>

      <div className="space-y-6">
        {VIDEOS.map(video => (
          <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="relative aspect-video">
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="bg-white/90 p-3 rounded-full shadow-lg">
                  <IonIcon icon={play} className="text-blue-600 text-xl ml-1" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-bold">
                {video.duration}
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-800 flex-1 leading-tight">{video.title}</h3>
                <button className="text-gray-400 p-1">
                  <IonIcon icon={bookmarkOutline} className="text-xl" />
                </button>
              </div>
              <div className="flex items-center text-xs text-gray-500 space-x-3">
                <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-semibold">
                  {video.category}
                </span>
                <span className="flex items-center">
                  <IonIcon icon={eyeOutline} className="mr-1" />
                  {video.views}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoLibrary;
