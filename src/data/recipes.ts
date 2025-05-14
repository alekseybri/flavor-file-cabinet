
import { Recipe, RecipeCategory, RecipeCategoryFilter } from "../types/recipe";

export const recipeCategories: RecipeCategoryFilter[] = [
  { name: 'All', color: 'bg-gray-400' },
  { name: 'Breakfast', color: 'bg-yellow-400' },
  { name: 'Lunch', color: 'bg-blue-400' },
  { name: 'Dinner', color: 'bg-recipe-terracotta' },
  { name: 'Dessert', color: 'bg-pink-400' },
  { name: 'Snack', color: 'bg-purple-400' },
  { name: 'Vegetarian', color: 'bg-recipe-green' },
];

export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Avocado Toast with Poached Egg',
    description: 'Creamy avocado spread on toasted sourdough bread topped with a perfectly poached egg and red pepper flakes.',
    category: 'Breakfast',
    prepTime: 10,
    cookTime: 5,
    servings: 1,
    ingredients: [
      '1 slice sourdough bread',
      '1/2 ripe avocado',
      '1 egg',
      'Salt and pepper to taste',
      'Red pepper flakes',
      '1 tsp lemon juice',
      '1 tbsp chopped fresh herbs (optional)'
    ],
    instructions: [
      'Toast the sourdough bread until golden and crisp.',
      'In a small bowl, mash the avocado with lemon juice, salt, and pepper.',
      'Spread the avocado mixture on the toast.',
      'Bring a small pot of water to a simmer. Add a splash of vinegar and create a gentle whirlpool.',
      'Crack the egg into the water and poach for 3-4 minutes until whites are set but yolk is runny.',
      'Place poached egg on avocado toast, sprinkle with red pepper flakes and fresh herbs if using.',
      'Serve immediately.'
    ],
    image: '/placeholder.svg',
    favorite: true
  },
  {
    id: '2',
    title: 'Hearty Vegetable Soup',
    description: 'A warming vegetable soup packed with seasonal veggies, herbs, and a rich vegetable broth.',
    category: 'Lunch',
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    ingredients: [
      '1 onion, diced',
      '2 carrots, diced',
      '2 celery stalks, diced',
      '1 zucchini, diced',
      '2 garlic cloves, minced',
      '1 can (14 oz) diced tomatoes',
      '4 cups vegetable broth',
      '1 tsp dried thyme',
      '1 bay leaf',
      'Salt and pepper to taste',
      '2 tbsp olive oil',
      '1/4 cup chopped fresh parsley'
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat.',
      'Add onion, carrots, and celery. Cook for 5 minutes until softened.',
      'Add garlic and cook for another minute until fragrant.',
      'Add diced tomatoes, vegetable broth, thyme, bay leaf, salt, and pepper.',
      'Bring to a boil, then reduce heat and simmer for 15 minutes.',
      'Add zucchini and simmer for another 10 minutes until all vegetables are tender.',
      'Remove bay leaf, stir in fresh parsley, and adjust seasonings.',
      'Serve hot with crusty bread.'
    ],
    image: '/placeholder.svg',
    favorite: false
  },
  {
    id: '3',
    title: 'Lemon Garlic Roast Chicken',
    description: 'Juicy roast chicken flavored with lemon, garlic, and herbs for a classic dinner option.',
    category: 'Dinner',
    prepTime: 20,
    cookTime: 75,
    servings: 4,
    ingredients: [
      '1 whole chicken (4-5 lbs)',
      '3 lemons',
      '1 head of garlic, halved crosswise',
      '4 tbsp butter, softened',
      '2 tbsp olive oil',
      '1 tbsp chopped fresh rosemary',
      '1 tbsp chopped fresh thyme',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Preheat oven to 425°F (220°C).',
      'Rinse chicken and pat dry with paper towels.',
      'In a small bowl, mix softened butter with zest of 1 lemon, half the herbs, salt, and pepper.',
      'Carefully loosen skin on chicken breast and thighs and spread butter mixture underneath.',
      'Cut 2 lemons in half and stuff inside chicken cavity along with half head of garlic and remaining herbs.',
      'Rub outside of chicken with olive oil and season with more salt and pepper.',
      'Place in roasting pan and roast for 1 hour and 15 minutes, until internal temperature reaches 165°F.',
      'Let rest for 15 minutes before carving and serve with roasted vegetables.'
    ],
    image: '/placeholder.svg',
    favorite: true
  },
  {
    id: '4',
    title: 'Classic Apple Pie',
    description: 'Homemade apple pie with flaky crust and cinnamon-spiced apple filling.',
    category: 'Dessert',
    prepTime: 40,
    cookTime: 50,
    servings: 8,
    ingredients: [
      '2 1/2 cups all-purpose flour',
      '1 tsp salt',
      '1 tbsp sugar',
      '1 cup cold unsalted butter, cubed',
      '4-6 tbsp ice water',
      '6 large apples, peeled and sliced',
      '3/4 cup sugar',
      '2 tbsp all-purpose flour',
      '1 tsp cinnamon',
      '1/4 tsp nutmeg',
      '1 tbsp lemon juice',
      '2 tbsp butter, cubed',
      '1 egg for egg wash'
    ],
    instructions: [
      'For the crust: Mix flour, salt, and sugar. Cut in butter until crumbly. Gradually add ice water until dough forms. Divide in half, wrap in plastic, and chill for 1 hour.',
      'Preheat oven to 375°F (190°C).',
      'In a large bowl, combine sliced apples, sugar, flour, cinnamon, nutmeg, and lemon juice.',
      'Roll out half the dough and fit into a 9-inch pie plate.',
      'Add apple mixture and dot with butter.',
      'Roll out remaining dough, cut into lattice strips, and arrange over filling.',
      'Trim and crimp edges. Brush with beaten egg.',
      'Bake for 50 minutes until crust is golden and filling is bubbling.',
      'Cool before serving with vanilla ice cream.'
    ],
    image: '/placeholder.svg',
    favorite: false
  },
  {
    id: '5',
    title: 'Spiced Chickpea Salad',
    description: 'A protein-rich salad with roasted chickpeas, fresh vegetables, and a tangy dressing.',
    category: 'Vegetarian',
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    ingredients: [
      '1 can (15 oz) chickpeas, drained and rinsed',
      '2 tbsp olive oil',
      '1 tsp cumin',
      '1 tsp paprika',
      '1/2 tsp turmeric',
      'Salt and pepper to taste',
      '4 cups mixed salad greens',
      '1 cucumber, diced',
      '1 bell pepper, diced',
      '1/4 red onion, thinly sliced',
      '1/4 cup feta cheese, crumbled',
      '2 tbsp lemon juice',
      '3 tbsp olive oil',
      '1 tsp honey',
      '1 clove garlic, minced'
    ],
    instructions: [
      'Preheat oven to 400°F (200°C).',
      'Pat chickpeas dry with paper towels. Toss with olive oil, cumin, paprika, turmeric, salt, and pepper.',
      'Spread on baking sheet and roast for 20 minutes, shaking halfway through, until crispy.',
      'For the dressing, whisk together lemon juice, olive oil, honey, and garlic.',
      'In a large bowl, combine salad greens, cucumber, bell pepper, and red onion.',
      'Add roasted chickpeas and drizzle with dressing.',
      'Top with crumbled feta cheese and serve immediately.'
    ],
    image: '/placeholder.svg',
    favorite: true
  },
  {
    id: '6',
    title: 'Trail Mix Energy Bites',
    description: 'No-bake energy bites packed with oats, nuts, dried fruit, and honey.',
    category: 'Snack',
    prepTime: 15,
    cookTime: 0,
    servings: 12,
    ingredients: [
      '1 cup rolled oats',
      '1/2 cup natural peanut butter',
      '1/3 cup honey',
      '1/4 cup ground flaxseed',
      '1/4 cup mini chocolate chips',
      '1/4 cup dried cranberries',
      '1/4 cup chopped nuts (almonds, walnuts)',
      '1 tsp vanilla extract',
      '1/2 tsp cinnamon'
    ],
    instructions: [
      'In a large bowl, mix all ingredients until well combined.',
      'Cover and chill in the refrigerator for 30 minutes.',
      'Roll mixture into 1-inch balls.',
      'Store in an airtight container in the refrigerator for up to one week.'
    ],
    image: '/placeholder.svg',
    favorite: false
  }
];
