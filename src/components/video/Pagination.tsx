import React from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPrev,
  onNext,
}) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <IonButton
        fill="clear"
        onClick={onPrev}
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
        onClick={onNext}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <IonIcon icon={chevronForwardOutline} />
      </IonButton>
    </div>
  );
};

export default Pagination;
