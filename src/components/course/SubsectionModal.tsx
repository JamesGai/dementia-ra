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
import { auth } from "../../firebase";
import {
  fetchActivityAnswer,
  saveActivityAnswer,
  Subsection,
} from "../../services/courseService";
import Button from "../universal/Button";

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
  const [activityAnswers, setActivityAnswers] = React.useState<
    Record<string, string>
  >({});
  const [activitySaveStates, setActivitySaveStates] = React.useState<
    Record<string, "idle" | "saving" | "saved" | "error">
  >({});

  React.useEffect(() => {
    let isCancelled = false;

    setActivityAnswers({});
    setActivitySaveStates({});

    if (!isOpen || !subsection?.content) {
      return () => {
        isCancelled = true;
      };
    }

    const activityBlocks = subsection.content
      .map((block, index) => ({ block, index }))
      .filter(({ block }) => block.type === "activity");

    if (activityBlocks.length === 0) {
      return () => {
        isCancelled = true;
      };
    }

    const uid = auth.currentUser?.uid;

    if (!uid) {
      return () => {
        isCancelled = true;
      };
    }

    void fetchActivityAnswer({ uid, subsectionId: subsection.id })
      .then((activityAnswer) => {
        if (isCancelled || !activityAnswer) {
          return;
        }

        setActivityAnswers(
          activityBlocks.reduce<Record<string, string>>(
            (answers, { index }) => ({
              ...answers,
              [`${subsection.id}-${index}`]: activityAnswer.answer,
            }),
            {},
          ),
        );
      })
      .catch((error) => {
        console.error("Failed to load activity answer:", error);
      });

    return () => {
      isCancelled = true;
    };
  }, [isOpen, subsection]);

  const handleClose = () => {
    onClose();
  };

  const handleSubmitActivity = async (params: {
    answerKey: string;
    inputType: "textarea";
    answer: string;
  }) => {
    if (!subsection) {
      return;
    }

    const uid = auth.currentUser?.uid;

    if (!uid) {
      setActivitySaveStates((states) => ({
        ...states,
        [params.answerKey]: "error",
      }));
      return;
    }

    setActivitySaveStates((states) => ({
      ...states,
      [params.answerKey]: "saving",
    }));

    try {
      await saveActivityAnswer({
        uid,
        subsection,
        inputType: params.inputType,
        answer: params.answer,
      });
      setActivitySaveStates((states) => ({
        ...states,
        [params.answerKey]: "saved",
      }));
    } catch (error) {
      console.error("Failed to save activity answer:", error);
      setActivitySaveStates((states) => ({
        ...states,
        [params.answerKey]: "error",
      }));
    }
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
                {subsection.isCourseSubsection === false ||
                subsection.subsectionNumber === undefined
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
                    // Heading
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
                    // Subheading
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
                    // List
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
                    // Image
                    if (block.type === "image") {
                      return (
                        <div
                          key={index}
                          className="overflow-hidden rounded-2xl"
                        >
                          <img
                            src={block.src}
                            alt={block.alt}
                            className="w-full h-auto object-cover"
                            loading="lazy"
                          />
                        </div>
                      );
                    }
                    // Table
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
                    // Activity
                    if (block.type === "activity") {
                      const answerKey = `${subsection.id}-${index}`;
                      const answer = activityAnswers[answerKey] ?? "";
                      const saveState = activitySaveStates[answerKey] ?? "idle";

                      return (
                        <div key={index} className="space-y-3">
                          <label
                            htmlFor={answerKey}
                            className="block text-[#2e6f73] font-semibold leading-relaxed"
                          >
                            {block.prompt}
                          </label>
                          <textarea
                            id={answerKey}
                            value={answer}
                            onChange={(event) =>
                              setActivityAnswers((answers) => ({
                                ...answers,
                                [answerKey]: event.target.value,
                              }))
                            }
                            rows={5}
                            className="w-full resize-y rounded-lg border border-gray-300 bg-white p-3 text-gray-800 leading-relaxed outline-none focus:border-[#2e6f73] focus:ring-2 focus:ring-[#2e6f73]/20"
                          />
                          <div className="w-full">
                            <Button
                              text={
                                saveState === "saving" ? "Saving..." : "Submit"
                              }
                              onClick={() =>
                                handleSubmitActivity({
                                  answerKey,
                                  inputType: block.inputType,
                                  answer,
                                })
                              }
                            />
                          </div>
                          {saveState === "saved" && (
                            <div className="text-sm font-semibold text-[#2e6f73]">
                              Saved
                            </div>
                          )}
                          {saveState === "error" && (
                            <div className="text-sm font-semibold text-red-600">
                              Unable to save. Please sign in and try again.
                            </div>
                          )}
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
