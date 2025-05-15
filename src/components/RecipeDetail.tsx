
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Clock, Edit, ArrowLeft, Users, Trash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { fetchRecipeById, deleteRecipe } from '@/services/recipeService';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data: recipe, isLoading, error } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipeById(id!),
    enabled: !!id
  });

  const deleteMutation = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      toast({
        title: "Recipe deleted",
        description: "Recipe has been successfully removed",
      });
      navigate('/');
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete recipe. Please try again.",
        variant: "destructive",
      });
      console.error('Error deleting recipe:', error);
    }
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteMutation.mutate(id!);
    }
  };
  
  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (error || !recipe) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Recipe not found</h2>
        <Button variant="outline" asChild>
          <Link to="/">Return to recipes</Link>
        </Button>
      </div>
    );
  }
  
  const { title, description, category, prepTime, cookTime, servings, ingredients, instructions, image, favorite } = recipe;
  
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

  return (
    <>
      <Header />
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          asChild 
          className="mb-6 hover:bg-background"
        >
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to recipes
          </Link>
        </Button>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className={cn("text-sm font-semibold text-white px-3 py-1 rounded-full", getCategoryColor(category))}>
              {category}
            </span>
            {favorite && (
              <span className="text-rose-500 text-lg">♥</span>
            )}
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">{title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{description}</p>
          
          <div className="flex flex-wrap gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-recipe-terracotta" />
              <div>
                <p className="text-sm font-medium">Time</p>
                <p className="text-sm text-muted-foreground">{prepTime + cookTime} min</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-recipe-terracotta" />
              <div>
                <p className="text-sm font-medium">Servings</p>
                <p className="text-sm text-muted-foreground">{servings}</p>
              </div>
            </div>
          </div>
          
          <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div className="flex items-center justify-end gap-4 mb-6">
            <Button variant="outline" asChild>
              <Link to={`/edit/${id}`} className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                <span>Edit Recipe</span>
              </Link>
            </Button>
            <Button 
              variant="destructive" 
              className="flex items-center gap-2"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              <Trash className="h-4 w-4" />
              <span>{deleteMutation.isPending ? "Deleting..." : "Delete"}</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-xl font-display font-semibold mb-4">Ingredients</h2>
              <Separator className="mb-4" />
              <ul className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="inline-block w-2 h-2 mt-2 rounded-full bg-recipe-terracotta" />
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="md:col-span-2">
              <h2 className="text-xl font-display font-semibold mb-4">Instructions</h2>
              <Separator className="mb-4" />
              <ol className="space-y-4">
                {instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-recipe-sage text-white font-medium text-sm flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
