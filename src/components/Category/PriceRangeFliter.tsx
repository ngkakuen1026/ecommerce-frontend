import React from "react";

interface Props {
  tempMin: number;
  tempMax: number;
  onTempMinChange: (val: number) => void;
  onTempMaxChange: (val: number) => void;
  onApply: () => void;
}

const PriceRangeFilter: React.FC<Props> = ({
  tempMin,
  tempMax,
  onTempMinChange,
  onTempMaxChange,
  onApply,
}) => {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">PRICE RANGE</h1>

      <div className="relative h-8">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded -translate-y-1/2 z-0" />
        <input
          type="range"
          min={0}
          max={100000}
          step={100}
          value={tempMin}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (val <= tempMax) onTempMinChange(val);
          }}
        />
        <input
          type="range"
          min={0}
          max={100000}
          step={100}
          value={tempMax}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (val >= tempMin) onTempMaxChange(val);
          }}
        />
      </div>

      <div className="flex justify-between mt-2 text-sm text-gray-700">
        <span>Min Price: ${tempMin}</span>
        <span>Max Price: ${tempMax}</span>
      </div>

      <button
        onClick={onApply}
        className="mt-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
      >
        Apply Filter
      </button>
    </div>
  );
};

export default PriceRangeFilter;