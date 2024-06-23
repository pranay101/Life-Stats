import React, { useState } from "react";

interface GenderPickerProps {
  onChange: (date: string) => void;
  value: string;
}

const GenderPicker: React.FC<GenderPickerProps> = ({ onChange, value }) => {
  const handleOnChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative inline-block text-left">
      <select
        className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onChange={handleOnChange}
        value={value}
        name="gender"
        id="gender"
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
  );
};

export default GenderPicker;
