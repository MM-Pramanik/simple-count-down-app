import React from "react";
import InputComponent from "./InputComponent";
import ActionBtn from "./ActionBtn";

const CustomTemplate = ({ customValue, onCustomChange, onAddCustom }) => {
  return (
    <div className="relative flex flex-col gap-2 border-2 border-gray-300 p-3 rounded-sm">
      <InputComponent
        value={customValue}
        onChange={onCustomChange}
        placeholder="Custom minutes..."
      />
      <ActionBtn btnName="Add" onClick={onAddCustom} />
    </div>
  );
};

export default CustomTemplate;
