import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";

interface SegmentOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentProps<T extends string> {
  value: T;
  segmentOptions: readonly SegmentOption<T>[];
  setSegment: (value: T) => void;
}

const Segment = <T extends string>({
  value,
  segmentOptions,
  setSegment,
}: SegmentProps<T>) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <IonSegment
        value={value}
        style={{ fontSize: "1rem" }}
        onIonChange={(e) => {
          const nextValue = e.detail.value as T | null;
          if (nextValue) setSegment(nextValue);
        }}
      >
        {segmentOptions.map((segmentOption) => (
          <IonSegmentButton
            key={segmentOption.value}
            value={segmentOption.value}
            style={{ fontSize: "1rem" }}
          >
            <IonLabel>{segmentOption.label}</IonLabel>
          </IonSegmentButton>
        ))}
      </IonSegment>
    </div>
  );
};

export default Segment;
