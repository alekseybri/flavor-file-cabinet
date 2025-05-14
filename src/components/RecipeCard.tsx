
import React from 'react';
import { Recipe } from '@/types/recipe';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Breakfast': return 'bg-yellow-400';
      case 'Lunch': return 'bg-blue-400';
      case 'Dinner': return 'bg-recipe-terracotta';
      case 'Dessert': return 'bg-pink-400';
      case 'Snack': return 'bg-purple-400';
      case 'Vegetarian': return 'bg-recipe-green';
      default: return 'bg-gray-400';
    }
  };
  
  const totalTime = recipe.prepTime + recipe.cookTime;
  
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <Card className="recipe-card h-full overflow-hidden border border-muted hover:border-primary/20">
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-full object-cover" 
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className={cn("text-xs font-semibold text-white px-2 py-1 rounded-full", getCategoryColor(recipe.category))}>
              {recipe.category}
            </span>
            {recipe.favorite && (
              <span className="text-rose-500">♥</span>
            )}
          </div>
          <h3 className="font-display font-medium text-lg mb-2 line-clamp-2">{recipe.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{recipe.description}</p>
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-0 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{totalTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{recipe.servings} serving{recipe.servings > 1 ? 's' : ''}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RecipeCard;
