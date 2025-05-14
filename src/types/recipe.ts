
export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
  image: string;
  favorite: boolean;
}

export type RecipeCategory = 'All' | 'Breakfast' | 'Lunch' | 'Dinner' | 'Dessert' | 'Snack' | 'Vegetarian';

export interface RecipeCategoryFilter {
  name: RecipeCategory;
  color: string;
  icon?: string;
}
