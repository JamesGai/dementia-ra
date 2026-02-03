import React from "react";

interface AvatarProps {
  avatarUrl?: string | null;
  placeholder: string;
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const Avatar: React.FC<AvatarProps> = ({
  avatarUrl,
  placeholder,
  onClick,
  onChange,
  inputRef,
}) => {
  return (
    <div className="flex justify-center py-4">
      <button
        type="button"
        onClick={onClick}
        className="relative w-24 h-24 rounded-full overflow-hidden shadow-md active:scale-95 transition"
        aria-label="Update profile picture"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Profile avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-3xl font-semibold">
              {placeholder}
            </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-black/30 text-white text-xs py-1">
          Edit
        </div>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
    </div>
  );
};

export default Avatar;
