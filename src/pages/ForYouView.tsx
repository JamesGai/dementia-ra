import React from "react";
import { IonIcon } from "@ionic/react";
import {
  sparkles,
  timeOutline,
  thumbsUpOutline,
  thumbsDownOutline,
  bookmarkOutline,
} from "ionicons/icons";

const ForYouView: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#d946ef] to-[#f43f5e] rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center mb-2">
          <IonIcon icon={sparkles} className="text-xl mr-2" />
          <h2 className="text-2xl font-bold">For You</h2>
        </div>
        <p className="text-white/90 leading-relaxed font-medium">
          Personalized recommendations based on your interests and activity
        </p>
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800 px-1">
          Recommended for You
        </h3>

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <div className="bg-purple-50 px-4 py-2 flex justify-between items-center">
            <div className="flex items-center text-purple-700 text-[10px] font-bold uppercase tracking-wider">
              <IonIcon icon={sparkles} className="mr-1.5" />
              Based on recent searches
            </div>
            <span className="text-purple-600 font-bold text-[10px]">
              95% match
            </span>
          </div>

          <div className="p-4">
            <div className="flex gap-4">
              <div className="w-1/3 aspect-[4/3] rounded-lg overflow-hidden relative">
                <img
                  src="https://picsum.photos/seed/care1/400/300"
                  className="w-full h-full object-cover"
                  alt="Care content"
                />
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[8px] px-1 rounded font-bold">
                  11:20
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 mb-1 leading-tight">
                  Managing Sundowning Syndrome
                </h4>
                <p className="text-xs text-gray-500 line-clamp-2">
                  Learn how to manage agitation and confusion that occurs in the
                  late afternoon...
                </p>
                <div className="flex items-center mt-2 text-[10px] text-gray-400">
                  <IonIcon icon={timeOutline} className="mr-1" />
                  11:20
                </div>
              </div>
            </div>

            <div className="flex mt-4 pt-4 border-t border-gray-50 gap-2">
              <button className="flex-1 flex items-center justify-center bg-gray-50 text-gray-700 py-2 rounded-lg text-xs font-bold active:bg-gray-100">
                <IonIcon icon={bookmarkOutline} className="mr-2" />
                Save
              </button>
              <button
                className="p-2 bg-gray-50 text-gray-400 rounded-lg active:bg-gray-100"
                aria-label="Like"
              >
                <IonIcon icon={thumbsUpOutline} />
              </button>
              <button
                className="p-2 bg-gray-50 text-gray-400 rounded-lg active:bg-gray-100"
                aria-label="Dislike"
              >
                <IonIcon icon={thumbsDownOutline} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <div className="bg-pink-50 px-4 py-2 flex justify-between items-center">
            <div className="flex items-center text-pink-700 text-[10px] font-bold uppercase tracking-wider">
              <IonIcon icon={sparkles} className="mr-1.5" />
              Popular in Activities
            </div>
            <span className="text-pink-600 font-bold text-[10px]">
              88% match
            </span>
          </div>
          <div className="p-4 flex gap-4">
            <div className="w-1/3 aspect-[4/3] rounded-lg bg-gray-100 flex items-center justify-center">
              <IonIcon icon={timeOutline} className="text-gray-300 text-3xl" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 mb-1 leading-tight">
                Creating a Memory Box
              </h4>
              <p className="text-xs text-gray-500 line-clamp-2">
                Step-by-step guide to creating a meaningful memory box with your
                loved one.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForYouView;
