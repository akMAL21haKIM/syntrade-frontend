import React from "react";
import { useState } from "react";

export default function RangeSlider() {
  const [sliderValue, setSliderValue] = useState(5);

  function updateSliderValue(value) {
    setSliderValue(value);
  }

  return (
    <div className="static mt-5 h-1/2 w-3/4 m-auto">
      <input
        type="range"
        min="0"
        max="10"
        value={sliderValue}
        className="range"
        step="1"
        onChange={(e) => updateSliderValue(e.target.value)}
      />
      <div
        id="tooltip-default"
        role="tooltip"
        className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
      >
        23
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
      <div className="w-full flex justify-between text-s px-2">
        <span className="font-bold">|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span className="font-bold">|</span>
      </div>
    </div>
  );
}
