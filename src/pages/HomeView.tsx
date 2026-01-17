
import React from 'react';
import { IonIcon } from '@ionic/react';
import { 
  videocam, 
  search, 
  heart, 
  chatbubbleEllipses 
} from 'ionicons/icons';

interface HomeViewProps {
  onNavigate: (tab: 'videos' | 'search' | 'foryou' | 'chat') => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="p-4 space-y-6">
      {/* Welcome Card */}
      <div className="bg-[#0061f2] rounded-2xl p-6 text-white shadow-md">
        <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
        <p className="text-blue-100 leading-relaxed">
          Your comprehensive support resource for dementia care
        </p>
      </div>

      {/* Quick Access Section */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 px-1">Quick Access</h3>
        <div className="space-y-4">
          <button 
            onClick={() => onNavigate('videos')}
            className="w-full bg-white rounded-2xl p-4 flex items-center shadow-sm border border-gray-100 active:scale-95 transition-transform"
          >
            <div className="bg-purple-500 p-3 rounded-xl mr-4 shadow-sm">
              <IonIcon icon={videocam} className="text-white text-2xl" />
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-gray-800">Video Library</h4>
              <p className="text-sm text-gray-500">Educational videos and tutorials</p>
            </div>
          </button>

          <button 
            onClick={() => onNavigate('search')}
            className="w-full bg-white rounded-2xl p-4 flex items-center shadow-sm border border-gray-100 active:scale-95 transition-transform"
          >
            <div className="bg-blue-500 p-3 rounded-xl mr-4 shadow-sm">
              <IonIcon icon={search} className="text-white text-2xl" />
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-gray-800">Search</h4>
              <p className="text-sm text-gray-500">Find videos, articles, and resources</p>
            </div>
          </button>

          <button 
            onClick={() => onNavigate('foryou')}
            className="w-full bg-white rounded-2xl p-4 flex items-center shadow-sm border border-gray-100 active:scale-95 transition-transform"
          >
            <div className="bg-pink-500 p-3 rounded-xl mr-4 shadow-sm">
              <IonIcon icon={heart} className="text-white text-2xl" />
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-gray-800">For You</h4>
              <p className="text-sm text-gray-500">Personalized recommendations</p>
            </div>
          </button>

          <button 
            onClick={() => onNavigate('chat')}
            className="w-full bg-white rounded-2xl p-4 flex items-center shadow-sm border border-gray-100 active:scale-95 transition-transform"
          >
            <div className="bg-green-500 p-3 rounded-xl mr-4 shadow-sm">
              <IonIcon icon={chatbubbleEllipses} className="text-white text-2xl" />
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-gray-800">Chat Assistant</h4>
              <p className="text-sm text-gray-500">Get instant help and support</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
