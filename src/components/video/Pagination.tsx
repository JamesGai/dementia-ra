import React from "react";
import { IonButton, IonIcon, IonSelect, IonSelectOption } from "@ionic/react";
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPrev,
  onNext,
  onPageChange,
}) => {
  const pageOptions = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

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

      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <span>Page</span>
        <IonSelect
          value={page}
          interface="popover"
          aria-label="Select page"
          onIonChange={(event) => onPageChange(Number(event.detail.value))}
          className="min-w-[72px] rounded-lg border border-gray-200 px-2"
        >
          {pageOptions.map((pageNumber) => (
            <IonSelectOption key={pageNumber} value={pageNumber}>
              {pageNumber}
            </IonSelectOption>
          ))}
        </IonSelect>
        <span>{totalPages}</span>
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
