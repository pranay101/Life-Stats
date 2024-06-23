import React, { useState } from "react";

interface TimeFramePickerProps {
  onChange: (value: string) => void;
  value: string;
}

const TimeFramePicker: React.FC<TimeFramePickerProps> = ({
  onChange,
  value,
}) => {
  return (
    <div className="relative inline-block text-left rounded-md border border-gray-300 shadow-sm px-4 py-2">
      <div className="flex items-center space-x-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-indigo-600"
            name="timeFrame"
            value="weeks"
            checked={value === "weeks"}
            onChange={(e) => onChange(e.target.value)}
          />
          <span className="ml-2 text-sm font-medium text-gray-700">Weeks</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-indigo-600"
            name="timeFrame"
            value="months"
            checked={value === "months"}
            onChange={(e) => onChange(e.target.value)}
          />
          <span className="ml-2 text-sm font-medium text-gray-700">Months</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-indigo-600"
            name="timeFrame"
            value="years"
            checked={value === "years"}
            onChange={(e) => onChange(e.target.value)}
          />
          <span className="ml-2 text-sm font-medium text-gray-700">Years</span>
        </label>
      </div>
    </div>
  );
};

export default TimeFramePicker;
