import React, { useEffect, useRef } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { VideoItem } from "../../pages/VideoPage";

interface VideoPlayerModalProps {
  isVideoOpen: boolean;
  onClose: () => void;
  video?: VideoItem;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isVideoOpen,
  onClose,
  video,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleClose = () => {
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
    onClose();
  };

  // Stop playback when closing
  useEffect(() => {
    if (!isVideoOpen) {
      videoRef.current?.pause();
      if (videoRef.current) videoRef.current.currentTime = 0;
    }
  }, [isVideoOpen]);

  return (
    <IonModal isOpen={isVideoOpen} onDidDismiss={handleClose}>
      {/* Header */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton
              onClick={handleClose}
              aria-label="Close"
              className="w-11 h-11 rounded-full flex items-center justify-center"
            >
              <IonIcon icon={closeOutline} className="text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {/* Content */}
      <IonContent className="ion-padding">
        {!video ? (
          <div className="bg-white rounded-2xl p-4 shadow-md text-sm text-gray-500">
            No video selected.
          </div>
        ) : (
          <div className="space-y-4">
            {/* Player */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              {video.src ? (
                <video
                  ref={videoRef}
                  controls
                  playsInline
                  className="w-full h-56 bg-black object-contain"
                  src={video.src}
                />
              ) : (
                <div className="h-56 flex items-center justify-center text-sm text-gray-500">
                  Video coming soon
                </div>
              )}
            </div>
            {/* Title + Description */}
            <div className="bg-white rounded-2xl p-4 shadow-md space-y-3">
              <div className="text-[#2e6f73] font-extrabold tracking-wide">
                {video.title}
              </div>
              <div className="h-px w-full bg-gray-300" />
              <div className="text-gray-700 leading-relaxed">
                {video.description}
              </div>
            </div>
          </div>
        )}
      </IonContent>
    </IonModal>
  );
};

export default VideoPlayerModal;
