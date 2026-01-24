import React, { useEffect, useMemo, useState } from "react";
import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
} from "@ionic/react";
import Button from "../universe/Button";
import TextButton from "../universe/TextButton";

type FontSizeOption = "standard" | "large" | "xlarge";
const STORAGE_KEY = "settings.fontSize";
const FONT_SIZE_OPTIONS: Array<{
  id: FontSizeOption;
  label: string;
  value: string;
}> = [
  {
    id: "standard",
    label: "Standard",
    value: "16px",
  },
  {
    id: "large",
    label: "Large",
    value: "18px",
  },
  {
    id: "xlarge",
    label: "Extra large",
    value: "20px",
  },
];

const Settings: React.FC = () => {
  const [fontSize, setFontSize] = useState<FontSizeOption>(() => {
    const storedFontSize = localStorage.getItem(STORAGE_KEY);
    if (
      storedFontSize === "standard" ||
      storedFontSize === "large" ||
      storedFontSize === "xlarge"
    ) {
      return storedFontSize;
    }
    return "standard";
  });
  const sizeMap = useMemo(() => {
    return FONT_SIZE_OPTIONS.reduce<Record<FontSizeOption, string>>(
      (acc, option) => {
        acc[option.id] = option.value;
        return acc;
      },
      {
        standard: "16px",
        large: "18px",
        xlarge: "20px",
      },
    );
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = sizeMap[fontSize];
    localStorage.setItem(STORAGE_KEY, fontSize);
  }, [fontSize, sizeMap]);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <IonAccordionGroup value="font-size">
        <IonAccordion value="font-size">
          <IonItem
            slot="header"
            lines="none"
            className="text-[#2e6f73] font-extrabold tracking-wide uppercase"
          >
            <IonLabel className="pl-2">FONT SIZE</IonLabel>
          </IonItem>
          <div slot="content" className="pt-6 px-6 pb-6 space-y-4">
            <div className="space-y-3">
              {FONT_SIZE_OPTIONS.map((option) => (
                <Button
                  key={option.id}
                  text={option.label}
                  onClick={() => setFontSize(option.id)}
                />
              ))}
            </div>
            <div className="text-center">
              <TextButton
                text="Reset to default"
                onClick={() => setFontSize("standard")}
              />
            </div>
          </div>
        </IonAccordion>
      </IonAccordionGroup>
    </div>
  );
};

export default Settings;
