import React from "react";

const InputComponent = ({
  value = "",
  onChange,
  placeholder = "Enter minutes...",
  className = "",
}) => {
  const handleInputChange = onChange ?? (() => {});

  return (
    <div className="flex justify-center">
      <input
        type="number"
        min="1"
        inputMode="numeric"
        value={value}
        onChange={handleInputChange}
        className={`border-2 h-10 px-3 border-gray-400 rounded-md focus:border-[#355872] outline-none transition-colors ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputComponent;
