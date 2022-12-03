import React from "react";

const RangeSlider = ({ sliderValue, setSliderValue }) => {
  function updateSliderValue(value) {
    setSliderValue(value);
  }

  return (
    <div className="select-none cursor-default">
      <div className="grid grid-flow-col justify-between">
        <p className="text-sm mb-1 mt-0 font-light text-gray-500 cursor-default select-none">
          Ticks
        </p>
        <p className="text-sm mb-1 mt-0 font-semibold text-gray-700 cursor-default select-none">
          {sliderValue}
        </p>
      </div>

      <input
        type="range"
        min="1"
        max="10"
        value={sliderValue}
        className="range-base w-full accent-indigo-600 focus:outline-none cursor-default select-none"
        step="1"
        list="ticks"
        onChange={(e) => updateSliderValue(e.target.value)}
      />
      <datalist id="ticks">
        <option value="1" className="text-gray-700">
          |
        </option>
        <option value="2" className="text-gray-700">
          |
        </option>
        <option value="3" className="text-gray-700">
          |
        </option>
        <option value="4" className="text-gray-700">
          |
        </option>
        <option value="5" className="text-gray-700">
          |
        </option>
        <option value="6" className="text-gray-700">
          |
        </option>
        <option value="7" className="text-gray-700">
          |
        </option>
        <option value="8" className="text-gray-700">
          |
        </option>
        <option value="9" className="text-gray-700">
          |
        </option>
        <option value="10" className="text-gray-700">
          |
        </option>
      </datalist>
    </div>
  );
};

export default RangeSlider;
