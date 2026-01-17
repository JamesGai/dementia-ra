
import React from 'react';
import { IonIcon, IonSearchbar } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';

const POPULAR_SEARCHES = [
  'Communication tips',
  'Daily routines',
  'Memory loss',
  'Behavioral changes',
  'Safety at home',
  'Self-care for carers'
];

const SearchView: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-2xl p-1 shadow-sm border border-gray-100">
        <IonSearchbar 
          placeholder="Search videos, articles, resources..." 
          className="custom-searchbar"
          style={{ '--background': 'transparent', '--box-shadow': 'none', padding: '0' }}
        />
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 px-1">Popular Searches</h3>
        <div className="space-y-3">
          {POPULAR_SEARCHES.map(term => (
            <button
              key={term}
              className="w-full bg-white rounded-xl p-4 flex items-center shadow-sm border border-gray-100 active:bg-gray-50 text-left transition-colors"
            >
              <IonIcon icon={searchOutline} className="text-gray-400 mr-3" />
              <span className="text-gray-700 font-medium">{term}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
        <h4 className="text-[#0061f2] font-bold text-lg mb-3">Search Tips</h4>
        <ul className="space-y-2 text-[#0061f2] text-sm font-medium">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Use keywords like "communication", "safety", or "activities"</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Check out popular searches above for inspiration</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Search for specific topics or symptoms</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SearchView;
