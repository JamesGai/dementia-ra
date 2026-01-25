import React from "react";
import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";

export type VideoSegmentValue = "all" | "history";

interface VideoSegmentProps {
  value: VideoSegmentValue;
  onChange: (value: VideoSegmentValue) => void;
}

const Segment: React.FC<VideoSegmentProps> = ({ value, onChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <IonSegment
        value={value}
        style={{ fontSize: "1rem" }}
        onIonChange={(e) =>
          onChange((e.detail.value as VideoSegmentValue) || "all")
        }
      >
        <IonSegmentButton value="all" style={{ fontSize: "1rem" }}>
          <IonLabel>All videos</IonLabel>
        </IonSegmentButton>

        <IonSegmentButton value="history" style={{ fontSize: "1rem" }}>
          <IonLabel>History</IonLabel>
        </IonSegmentButton>
      </IonSegment>
    </div>
  );
};

export default Segment;
