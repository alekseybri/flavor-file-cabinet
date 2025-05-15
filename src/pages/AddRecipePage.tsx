
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/components/ui/use-toast';
import { createRecipe } from '@/services/recipeService';
import { RecipeCategory } from '@/types/recipe';
import { recipeCategories } from '@/data/recipes';
import Header from '@/components/Header';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PlusCircle, X } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Define the form schema with Zod
const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters' }),
  description: z.string().optional(),
  category: z.string(),
  prepTime: z.number().min(1, { message: 'Preparation time must be at least 1 minute' }),
  cookTime: z.number().min(0, { message: 'Cooking time must be at least 0 minutes' }),
  servings: z.number().min(1, { message: 'Servings must be at least 1' }),
  ingredients: z.array(z.string().min(2, { message: 'Ingredient must be at least 2 characters' })),
  instructions: z.array(z.string().min(5, { message: 'Instruction must be at least 5 characters' })),
  image: z.string().default('/placeholder.svg'),
});

type FormValues = z.infer<typeof formSchema>;

const AddRecipePage: React.FC = () => {
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'Dinner',
      prepTime: 15,
      cookTime: 30,
      servings: 4,
      ingredients: [''],
      instructions: [''],
      image: '/placeholder.svg',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Filter out any empty ingredients or instructions
      const filteredData = {
        ...data,
        ingredients: data.ingredients.filter(item => item.trim() !== ''),
        instructions: data.instructions.filter(item => item.trim() !== ''),
      };
      
      await createRecipe({
        ...filteredData,
        favorite: false
      });
      
      toast({
        title: "Success",
        description: "Recipe created successfully!",
      });
      
      navigate('/');
    } catch (error) {
      console.error('Error creating recipe:', error);
      toast({
        title: "Error",
        description: "Failed to create recipe. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addIngredient = () => {
    const currentIngredients = form.getValues('ingredients');
    form.setValue('ingredients', [...currentIngredients, '']);
  };

  const removeIngredient = (index: number) => {
    const currentIngredients = form.getValues('ingredients');
    if (currentIngredients.length > 1) {
      currentIngredients.splice(index, 1);
      form.setValue('ingredients', [...currentIngredients]);
    }
  };

  const addInstruction = () => {
    const currentInstructions = form.getValues('instructions');
    form.setValue('instructions', [...currentInstructions, '']);
  };

  const removeInstruction = (index: number) => {
    const currentInstructions = form.getValues('instructions');
    if (currentInstructions.length > 1) {
      currentInstructions.splice(index, 1);
      form.setValue('instructions', [...currentInstructions]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-semibold mb-8">Add New Recipe</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipe Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter recipe title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Briefly describe your recipe"
                          className="min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full border border-input rounded-md h-10 px-3 bg-background"
                        >
                          {recipeCategories
                            .filter(cat => cat.name !== 'All')
                            .map((category) => (
                              <option key={category.name} value={category.name}>
                                {category.name}
                              </option>
                            ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="prepTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prep Time (mins)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cookTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cook Time (mins)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="servings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Servings</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipe Image URL</FormLabel>
                      <div className="space-y-3">
                        <FormControl>
                          <Input {...field} placeholder="Enter image URL" />
                        </FormControl>
                        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md border bg-muted">
                          <img
                            src={field.value || '/placeholder.svg'}
                            alt="Recipe preview"
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder.svg';
                            }}
                          />
                        </AspectRatio>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Ingredients Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Ingredients</h3>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addIngredient}
                  className="flex items-center gap-2"
                >
                  <PlusCircle size={16} /> Add Ingredient
                </Button>
              </div>
              
              {form.watch('ingredients').map((_, index) => (
                <div key={`ingredient-${index}`} className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input {...field} placeholder={`Ingredient ${index + 1}`} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeIngredient(index)}
                    disabled={form.watch('ingredients').length <= 1}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))}
            </div>
            
            {/* Instructions Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Instructions</h3>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addInstruction}
                  className="flex items-center gap-2"
                >
                  <PlusCircle size={16} /> Add Step
                </Button>
              </div>
              
              {form.watch('instructions').map((_, index) => (
                <div key={`instruction-${index}`} className="flex items-start gap-2">
                  <div className="mt-3 flex-shrink-0 font-medium text-muted-foreground">
                    {index + 1}.
                  </div>
                  <FormField
                    control={form.control}
                    name={`instructions.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Textarea {...field} placeholder={`Step ${index + 1}`} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeInstruction(index)}
                    disabled={form.watch('instructions').length <= 1}
                    className="mt-2"
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button type="submit">Create Recipe</Button>
            </div>
          </form>
        </Form>
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

export default AddRecipePage;
