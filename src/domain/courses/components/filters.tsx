"use client";

import { useState } from "react";
import { BespokeCard, BespokeButton, BespokeBadge } from "@/components/ui/bespoke";

interface FiltersProps {
  filters?: {
    level: string[];
    category: string[];
    duration: string[];
    price: string[];
  };
  onFilterChange?: (filters: any) => void;
}

export default function Filters({ filters, onFilterChange }: FiltersProps) {
  const [selectedLevel, setSelectedLevel] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string[]>([]);

  const levels = ["Beginner", "Intermediate", "Advanced"];
  const categories = [
    "Web Development",
    "Mobile Development",
    "Artificial Intelligence",
    "Data Science",
    "Cloud Computing",
    "DevOps",
    "UI/UX Design",
    "Blockchain"
  ];
  const durations = ["Under 8 weeks", "8-12 weeks", "3-6 months", "6+ months"];
  const priceRanges = ["Free", "Under $1000", "$1000-$3000", "$3000+"];

  const handleLevelToggle = (level: string) => {
    const newLevels = selectedLevel.includes(level)
      ? selectedLevel.filter(l => l !== level)
      : [...selectedLevel, level];
    setSelectedLevel(newLevels);
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategory.includes(category)
      ? selectedCategory.filter(c => c !== category)
      : [...selectedCategory, category];
    setSelectedCategory(newCategories);
  };

  const clearAllFilters = () => {
    setSelectedLevel([]);
    setSelectedCategory([]);
    setSelectedDuration([]);
    setSelectedPrice([]);
  };

  return (
    <div className="sticky top-24 space-y-6">
      <BespokeCard variant="glass-card" className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <button
            onClick={clearAllFilters}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Clear all
          </button>
        </div>

        {/* Level Filter */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Level</h4>
          <div className="space-y-2">
            {levels.map((level) => (
              <label key={level} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedLevel.includes(level)}
                  onChange={() => handleLevelToggle(level)}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <span className="text-gray-700">{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategory.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <span className="text-gray-700 text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Duration Filter */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Duration</h4>
          <div className="space-y-2">
            {durations.map((duration) => (
              <label key={duration} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedDuration.includes(duration)}
                  onChange={() => {
                    const newDuration = selectedDuration.includes(duration)
                      ? selectedDuration.filter(d => d !== duration)
                      : [...selectedDuration, duration];
                    setSelectedDuration(newDuration);
                  }}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <span className="text-gray-700 text-sm">{duration}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
          <div className="space-y-2">
            {priceRanges.map((price) => (
              <label key={price} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedPrice.includes(price)}
                  onChange={() => {
                    const newPrice = selectedPrice.includes(price)
                      ? selectedPrice.filter(p => p !== price)
                      : [...selectedPrice, price];
                    setSelectedPrice(newPrice);
                  }}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <span className="text-gray-700 text-sm">{price}</span>
              </label>
            ))}
          </div>
        </div>
      </BespokeCard>

      <BespokeCard variant="premium-card" className="p-6 text-center">
        <div className="text-4xl mb-3">🎯</div>
        <h4 className="font-semibold text-gray-900 mb-2">Not sure where to start?</h4>
        <p className="text-sm text-gray-600 mb-4">
          Get personalized course recommendations based on your goals and experience
        </p>
        <BespokeButton variant="bespoke-primary" className="w-full">
          Get Recommendations
        </BespokeButton>
      </BespokeCard>
    </div>
  );
}