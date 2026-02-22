import React from "react";
import CardTemplate from "./CardTemplate";
import CustomTemplate from "./CustomTemplate";
const TemplateContainer = ({
  isCustom,
  setIsCustom,
  customValue,
  onCustomChange,
  onAddCustom,
  cardValues,
  onSelectCard,
  onDeleteCard,
}) => {
  return (
    <div>
      <CardTemplate
        cardValues={cardValues}
        onSelectCard={onSelectCard}
        onDeleteCard={onDeleteCard}
      />
      <div className="relative flex flex-col items-center">
        <button
          type="button"
          onClick={() => setIsCustom((prev) => !prev)}
          className="bg-amber-400 px-3 py-1 rounded-sm hover:scale-105 active:scale-100 cursor-pointer font-semibold"
        >
          Custom
        </button>
        {isCustom && (
          <CustomTemplate
            customValue={customValue}
            onCustomChange={onCustomChange}
            onAddCustom={onAddCustom}
          />
        )}
      </div>
    </div>
  );
};

export default TemplateContainer;
