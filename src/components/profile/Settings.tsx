import React, { useEffect, useMemo, useState } from "react";

type FontSizeOption = "standard" | "large" | "xlarge";

const STORAGE_KEY = "settings.fontSize";

const FONT_SIZE_OPTIONS: Array<{
  id: FontSizeOption;
  label: string;
  description: string;
  value: string;
}> = [
  {
    id: "standard",
    label: "Standard",
    description: "Default text size.",
    value: "16px",
  },
  {
    id: "large",
    label: "Large",
    description: "Easier to read.",
    value: "18px",
  },
  {
    id: "xlarge",
    label: "Extra large",
    description: "Best for low vision.",
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
      }
    );
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = sizeMap[fontSize];
    localStorage.setItem(STORAGE_KEY, fontSize);
  }, [fontSize, sizeMap]);

  const resetSettings = () => {
    setFontSize("standard");
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md space-y-5">
      <div className="text-[#2e6f73] font-extrabold tracking-wide uppercase">
        Settings
      </div>
      <div className="space-y-4">
        <div className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase">
          Display
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-4 space-y-2">
          <div className="text-gray-900 font-semibold">Text size</div>
          <p className="text-sm text-gray-600">
            Make the content easier to read.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {FONT_SIZE_OPTIONS.map((option) => {
              const isActive = fontSize === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setFontSize(option.id)}
                  className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                    isActive
                      ? "border-[#2e6f73] bg-[#e6f3f4] text-[#2e6f73]"
                      : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  <div className="text-base font-semibold">
                    {option.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {option.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={resetSettings}
          className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-600 transition active:opacity-80"
        >
          Reset to default
        </button>
      </div>
    </div>
  );
};

export default Settings;
