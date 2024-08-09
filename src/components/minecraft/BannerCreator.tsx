"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const BannerCreator = () => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedPattern, setSelectedPattern] = useState(0);

  const handleColorChange = (colorId: number) => {
    setSelectedColor(colorId);
  };

  const handlePatternChange = (patternId: number) => {
    setSelectedPattern(patternId);
  };

  const getBackgroundPosition = (colorId: number, patternId: number) => {
    const size = 2; // Assuming large size
    const colorIndex = 15 - colorId;
    const patternX = patternId * 80;
    const patternY = colorIndex * 156;
    return `-${patternX}px -${patternY}px`;
  };

  return (
    <div>
      <h2>Banner Creator</h2>
      <div>
        <h3>Select Color</h3>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((colorId) => (
          <button
            key={colorId}
            onClick={() => handleColorChange(colorId)}
            style={{
              backgroundColor: `rgb(${bannerColors[colorId].join(',')})`,
              border: selectedColor === colorId ? '2px solid black' : 'none',
            }}
          />
        ))}
      </div>
      <div>
        <h3>Select Pattern</h3>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40].map(
          (patternId) => (
            <button
              key={patternId}
              onClick={() => handlePatternChange(patternId)}
              style={{
                border: selectedPattern === patternId ? '2px solid black' : 'none',
              }}
            >
              <Image
                src='/banner-patterns.png'
                alt={`Pattern ${patternId}`}
                width={80}
                height={156}
                style={{
                  backgroundPosition: getBackgroundPosition(selectedColor, patternId),
                }}
              />
            </button>
          )
        )}
      </div>
    </div>
  );
};

const bannerColors = [
  [21, 21, 23], // Black
  [133, 34, 28], // Red
  [71, 94, 15], // Green
  [99, 63, 37], // Brown
  [44, 50, 129], // Blue
  [104, 37, 139], // Purple
  [15, 118, 118], // Cyan
  [118, 118, 114], // Light Gray
  [53, 60, 62], // Gray
  [183, 105, 128], // Pink
  [97, 150, 21], // Lime
  [192, 163, 45], // Yellow
  [43, 136, 165], // Light Blue
  [151, 58, 143], // Magenta
  [189, 97, 21], // Orange
  [189, 193, 193], // White
];

export default BannerCreator;