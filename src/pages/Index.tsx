
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { RecipeCategory } from '@/types/recipe';
import RecipeCard from '@/components/RecipeCard';
import CategoryFilter from '@/components/CategoryFilter';
import Header from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { recipeCategories } from '@/data/recipes';
import { fetchRecipes } from '@/services/recipeService';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  
  const { data: recipes = [], isLoading, error } = useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });

  useEffect(() => {
    if (location.pathname === '/favorites') {
      document.title = 'Favorite Recipes';
    } else {
      document.title = 'All Recipes';
    }
  }, [location]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch recipes. Please try again.",
        variant: "destructive",
      });
    }
  }, [error]);

  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFavorites = location.pathname === '/favorites' ? recipe.favorite : true;
    return matchesCategory && matchesSearch && matchesFavorites;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-display font-semibold">
            {location.pathname === '/favorites' ? 'Favorite Recipes' : 'All Recipes'}
          </h2>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <CategoryFilter 
          categories={recipeCategories} 
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => setSelectedCategory(category as RecipeCategory)}
        />
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No recipes found</h3>
            <p className="text-muted-foreground">
              Try changing your search or category filters
            </p>
          </div>
        )}
      </main>
      
      <footer className="mt-auto py-6 border-t">
        <div className="container max-w-7xl mx-auto px-4">
          <p className="text-sm text-center text-muted-foreground">
            My Recipe Collection &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
