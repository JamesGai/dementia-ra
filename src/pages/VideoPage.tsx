import React, { useState } from "react";
import {
  IonButton,
  IonIcon,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";
import TopBar from "../components/universe/TopBar";

const VideoPage: React.FC = () => {
  const [segment, setSegment] = useState<"all" | "history">("all");
  const [page, setPage] = useState(1);
  const totalPages = 5;

  const goPrev = () => setPage((prev) => Math.max(1, prev - 1));
  const goNext = () => setPage((prev) => Math.min(totalPages, prev + 1));

  return (
    <div className="p-4 space-y-6">
      <TopBar title="Videos" />
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <IonSegment
          value={segment}
          onIonChange={(e) =>
            setSegment((e.detail.value as "all" | "history") || "all")
          }
        >
          <IonSegmentButton value="all">
            <IonLabel>All videos</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="history">
            <IonLabel>History</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-md text-center text-sm text-gray-500">
        {segment === "all" ? "All videos content" : "History content"}{" "}
        placeholder
      </div>

      <div className="flex items-center justify-center gap-4">
        <IonButton
          fill="clear"
          onClick={goPrev}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <IonIcon icon={chevronBackOutline} />
        </IonButton>
        <div className="text-sm font-semibold text-gray-700">
          Page {page} of {totalPages}
        </div>
        <IonButton
          fill="clear"
          onClick={goNext}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          <IonIcon icon={chevronForwardOutline} />
        </IonButton>
      </div>
    </div>
  );
};

export default VideoPage;
