
import React from 'react';
import { RecipeCategoryFilter } from '@/types/recipe';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: RecipeCategoryFilter[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="w-full py-4">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onSelectCategory(category.name)}
            className={cn(
              "category-pill px-4 py-2 rounded-full text-white font-medium text-sm transition-all",
              category.color,
              selectedCategory === category.name ? "ring-2 ring-offset-2 ring-opacity-50 ring-black" : "opacity-80 hover:opacity-100"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
