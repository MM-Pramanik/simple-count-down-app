import React from "react";

const ActionBtn = ({ btnName = "Start", onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-amber-400 px-6 py-2 rounded-md hover:scale-105 active:scale-95 transition-transform cursor-pointer font-bold shadow-md text-gray-800"
    >
      {btnName}
    </button>
  );
};

export default ActionBtn;
