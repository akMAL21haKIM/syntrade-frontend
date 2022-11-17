import React from "react";
import { useState } from "react";

export default function RangeSlider() {
  const [sliderValue, setSliderValue] = useState(5);

  function updateSliderValue(value) {
    setSliderValue(value);
  }

  return (
    <div className="static mt-3 h-1/2 w-10/12 m-auto">
      <div className="grid grid-flow-col justify-between">
        <p className="text-base mb-2 mt-0 font-bold">Ticks</p>
        <p className="text-base mb-2 mt-0 font-semibold text-gray-700">
          {sliderValue}
        </p>
      </div>

      <input
        type="range"
        min="1"
        max="10"
        value={sliderValue}
        className="range-base w-full accent-blue-700"
        step="1"
        list="ticks"
        onChange={(e) => updateSliderValue(e.target.value)}
      />
      <datalist id="ticks">
        <option value="1">|</option>
        <option value="2">|</option>
        <option value="3">|</option>
        <option value="4">|</option>
        <option value="5">|</option>
        <option value="6">|</option>
        <option value="7">|</option>
        <option value="8">|</option>
        <option value="9">|</option>
        <option value="10">|</option>
      </datalist>
    </div>
  );
}
