import React from "react";

const CardTemplate = ({ cardValues, onSelectCard, onDeleteCard }) => {
  if (cardValues.length === 0) return null;

  return (
    <div className="mb-4 flex flex-wrap justify-center gap-2">
      {cardValues.map((value) => (
        <div key={value} className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onSelectCard(value)}
            className="bg-amber-400 px-6 py-2 rounded-md hover:scale-105 active:scale-95 transition-transform cursor-pointer font-bold shadow-md text-gray-800"
          >
            {value}
          </button>
          <button
            type="button"
            aria-label={`Delete ${value} minute template`}
            onClick={() => onDeleteCard(value)}
            className="h-8 w-8 rounded-md border border-red-300 text-red-600 font-bold hover:bg-red-50 cursor-pointer"
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
};

export default CardTemplate;
