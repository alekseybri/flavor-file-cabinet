
import { supabase } from '@/integrations/supabase/client';
import { Recipe } from '@/types/recipe';

export interface SupabaseRecipe {
  id: string;
  title: string;
  description: string;
  category: string;
  prep_time: number; 
  cook_time: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
  image: string;
  favorite: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

// Convert from Supabase format to our app format
export const mapToAppRecipe = (dbRecipe: SupabaseRecipe): Recipe => {
  return {
    id: dbRecipe.id,
    title: dbRecipe.title,
    description: dbRecipe.description || '',
    category: dbRecipe.category,
    prepTime: dbRecipe.prep_time,
    cookTime: dbRecipe.cook_time,
    servings: dbRecipe.servings,
    ingredients: dbRecipe.ingredients,
    instructions: dbRecipe.instructions,
    image: dbRecipe.image || '/placeholder.svg',
    favorite: dbRecipe.favorite || false,
  };
};

// Convert from our app format to Supabase format
export const mapToDbRecipe = (appRecipe: Recipe): Omit<SupabaseRecipe, 'id' | 'created_at' | 'updated_at'> => {
  return {
    title: appRecipe.title,
    description: appRecipe.description,
    category: appRecipe.category,
    prep_time: appRecipe.prepTime,
    cook_time: appRecipe.cookTime,
    servings: appRecipe.servings,
    ingredients: appRecipe.ingredients,
    instructions: appRecipe.instructions,
    image: appRecipe.image,
    favorite: appRecipe.favorite,
    user_id: '', // This will be populated in the createRecipe function
  };
};

export const fetchRecipes = async (): Promise<Recipe[]> => {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .order('updated_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
  
  return (data as SupabaseRecipe[]).map(mapToAppRecipe);
};

export const fetchRecipeById = async (id: string): Promise<Recipe> => {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching recipe:', error);
    throw error;
  }
  
  return mapToAppRecipe(data as SupabaseRecipe);
};

export const createRecipe = async (recipe: Omit<Recipe, 'id'>): Promise<Recipe> => {
  // Get the current user
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error('User must be logged in to create a recipe');
  }
  
  const userId = session.user.id;
  
  // Map the recipe and add the user_id
  const dbRecipe = {
    ...mapToDbRecipe(recipe as Recipe),
    user_id: userId
  };
  
  const { data, error } = await supabase
    .from('recipes')
    .insert(dbRecipe)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating recipe:', error);
    throw error;
  }
  
  return mapToAppRecipe(data as SupabaseRecipe);
};

export const updateRecipe = async (id: string, recipe: Partial<Recipe>): Promise<Recipe> => {
  const dbRecipe = mapToDbRecipe(recipe as Recipe);
  
  // Remove user_id from update operation as it shouldn't change
  const { user_id, ...updateData } = dbRecipe;
  
  const { data, error } = await supabase
    .from('recipes')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }
  
  return mapToAppRecipe(data as SupabaseRecipe);
};

export const deleteRecipe = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('recipes')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting recipe:', error);
    throw error;
  }
};

export const toggleFavorite = async (id: string, isFavorite: boolean): Promise<Recipe> => {
  const { data, error } = await supabase
    .from('recipes')
    .update({ favorite: isFavorite })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
  
  return mapToAppRecipe(data as SupabaseRecipe);
};
