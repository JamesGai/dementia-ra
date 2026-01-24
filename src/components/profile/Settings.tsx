import React, { useEffect, useMemo, useState } from "react";
import AccordionCard from "../universe/AccordionCard";
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
    <AccordionCard
      title="FONT SIZE"
    >
      <div className="pt-5 space-y-4">
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
    </AccordionCard>
  );
};

export default Settings;
