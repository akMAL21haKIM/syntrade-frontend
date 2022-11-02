import React from "react";
import { useState } from "react";

export default function RangeSliderT() {
  const [sliderValue, setSliderValue] = useState(5);

  function updateSliderValue(value) {
    setSliderValue(value);
  }

  return (
    <div className="static mt-5">
      <input
        type="range"
        min="0"
        max="10"
        value={sliderValue}
        className="range"
        step="1"
        onChange={(e) => updateSliderValue(e.target.value)}
      />
      <div className="w-full flex justify-between text-xs px-2">
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
      </div>
    </div>
  );
}
