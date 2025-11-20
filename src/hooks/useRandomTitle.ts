"use client";

import { useState, useEffect } from 'react';
import { TITLES, TitleData, getTitleLengthCategory, getTitleFontSizeClass } from '@/lib/utils';

interface UseRandomTitleReturn {
  currentTitle: TitleData;
  fontSizeClass: string;
  cycleToNextTitle: () => void;
  titleIndex: number;
}

export function useRandomTitle(): UseRandomTitleReturn {
  const [titleIndex, setTitleIndex] = useState(0);

  // Select random title on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * TITLES.length);
    setTitleIndex(randomIndex);
  }, []);

  const cycleToNextTitle = () => {
    setTitleIndex((prevIndex) => (prevIndex + 1) % TITLES.length);
  };

  const currentTitle = TITLES[titleIndex];
  const lengthCategory = getTitleLengthCategory(currentTitle.main);
  const fontSizeClass = getTitleFontSizeClass(lengthCategory);

  return {
    currentTitle,
    fontSizeClass,
    cycleToNextTitle,
    titleIndex,
  };
}