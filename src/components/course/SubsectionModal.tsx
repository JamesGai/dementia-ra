import React from "react";
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
import { Subsection } from "../../services/courseService";

interface SubsectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subsection?: Subsection;
}

const SubsectionModal: React.FC<SubsectionModalProps> = ({
  isOpen,
  onClose,
  subsection,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleClose}>
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
      {/* Subsection content */}
      <IonContent className="ion-padding">
        {!subsection ? (
          <div className="bg-white rounded-2xl p-4 shadow-md text-gray-500">
            No subsection selected.
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-md space-y-3">
              <div className="text-[#2e6f73] font-extrabold tracking-wide">
                {subsection.sectionNumber === 99 &&
                subsection.subsectionNumber === 99
                  ? subsection.title
                  : `${subsection.moduleNumber}.${subsection.sectionNumber}.${subsection.subsectionNumber}. ${subsection.title}`}
              </div>
              <div className="h-px w-full bg-gray-300" />
              {!subsection.content || subsection.content.length === 0 ? (
                <div className="text-gray-700 leading-relaxed">
                  Content coming soon
                </div>
              ) : (
                <div className="space-y-4">
                  {subsection.content.map((block, index) => {
                    if (block.type === "heading") {
                      return (
                        <h2
                          key={index}
                          className="text-[#2e6f73] font-extrabold text-2xl"
                        >
                          {block.text}
                        </h2>
                      );
                    }
                    if (block.type === "subheading") {
                      return (
                        <h3
                          key={index}
                          className="text-gray-800 font-extrabold text-lg pt-4"
                        >
                          {block.text}
                        </h3>
                      );
                    }
                    if (block.type === "list") {
                      return (
                        <ol
                          key={index}
                          className="list-decimal pl-6 text-gray-700 leading-relaxed space-y-1"
                        >
                          {block.items.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ol>
                      );
                    }
                    if (block.type === "table") {
                      return (
                        <div key={index} className="overflow-x-auto">
                          <table className="w-full border border-gray-300 text-sm">
                            <thead>
                              <tr className="bg-gray-100">
                                {block.headers.map((header, headerIndex) => (
                                  <th
                                    key={headerIndex}
                                    className="p-2 text-left border border-gray-300 align-top"
                                  >
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {block.rows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                  <td className="p-2 border border-gray-300 align-top text-gray-700">
                                    {row.left}
                                  </td>
                                  <td className="p-2 border border-gray-300 align-top text-gray-700">
                                    <ul className="list-disc pl-5 space-y-1">
                                      {row.right.map((item, itemIndex) => (
                                        <li key={itemIndex}>{item}</li>
                                      ))}
                                    </ul>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    }
                    return (
                      <p
                        key={index}
                        className="text-gray-700 leading-relaxed whitespace-pre-line"
                      >
                        {block.text}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </IonContent>
    </IonModal>
  );
};

export default SubsectionModal;
