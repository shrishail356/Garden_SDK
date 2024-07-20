import React from "react";

interface BoxContent {
  type: "hero" | "villain";
  image: string;
}

interface BoxProps {
  index: number;
  opened: boolean;
  isMine: boolean;
  onClick: (index: number) => void;
  gameOver: boolean;
  content: BoxContent;
}

const Box: React.FC<BoxProps> = ({
  index,
  opened,
  isMine,
  onClick,
  gameOver,
  content,
}) => {
  const handleClick = () => {
    if (!opened && !gameOver) {
      onClick(index);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`h-24 w-24 bg-slate-600 rounded-md flex items-center justify-center cursor-pointer transform transition-transform hover:scale-105 ${
        opened
          ? isMine
            ? "border-red-500 border-2"
            : "border-green-500 border-2"
          : ""
      }`}
    >
      {opened && (
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={content.image}
            alt={content.type}
            className="h-full w-full object-cover rounded-md animate-fade-in"
          />
          <div
            className={`absolute bottom-1 text-xs font-bold text-white animate-fade-in ${
              isMine ? "bg-red-500" : "bg-green-500"
            } px-1 py-0.5 rounded-sm`}
          >
            {isMine ? "Villain" : "Hero"}
          </div>
        </div>
      )}
    </div>
  );
};

export default Box;
