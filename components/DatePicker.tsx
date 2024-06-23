import React, { useState } from 'react';

interface DatePickerProps {
  onChange: (date: Date) => void;
  value:Date
}

const DatePicker: React.FC<DatePickerProps> = ({ onChange,value }) => {

    const handleOnChange:React.ChangeEventHandler<HTMLInputElement> = (e) =>{
        onChange(new Date(e.target.value))
    }

  return (
    <div className="relative inline-block text-left">
        <input
          type="date"
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onChange={handleOnChange}
          value={value.toISOString()}
        />
    </div>
  );
};

export default DatePicker;