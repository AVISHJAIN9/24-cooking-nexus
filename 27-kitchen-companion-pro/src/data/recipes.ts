import butterChicken from "@/assets/butter-chicken.jpg";
import pokeBowl from "@/assets/poke-bowl.jpg";
import pizza from "@/assets/pizza.jpg";
import lavaCake from "@/assets/lava-cake.jpg";
import padThai from "@/assets/pad-thai.jpg";
import acaiBowl from "@/assets/acai-bowl.jpg";
import dishPlated from "@/assets/dish-plated.jpg";
import smoothieBowl from "@/assets/smoothie-bowl.jpg";
import steakGrill from "@/assets/steak-grill.jpg";
import sushiPlatter from "@/assets/sushi-platter.jpg";

export interface Recipe {
  id: string;
  title: string;
  chef: string;
  chefAvatar: string;
  image: string;
  duration: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  calories: number;
  rating: number;
  likes: string;
  comments: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  ingredients: string[];
  steps: string[];
  tags: string[];
}

export const recipes: Recipe[] = [
  {
    id: "butter-chicken", title: "Creamy Butter Chicken", chef: "Chef Priya", chefAvatar: "🧑‍🍳",
    image: butterChicken, duration: "0:58", prepTime: "15 min", cookTime: "30 min", servings: 4,
    calories: 520, rating: 4.9, likes: "42.3K", comments: "2.1K", category: "Indian", difficulty: "Medium",
    description: "Rich, creamy butter chicken with aromatic spices.",
    ingredients: ["500g chicken thighs", "1 cup yogurt", "2 tbsp garam masala", "400g tomatoes", "1 cup cream", "3 tbsp butter"],
    steps: ["Marinate chicken", "Sear chicken", "Make sauce", "Simmer together"],
    tags: ["Curry", "Chicken", "Dinner"],
  },
  {
    id: "poke-bowl", title: "Hawaiian Tuna Poke Bowl", chef: "Chef Kai", chefAvatar: "👨‍🍳",
    image: pokeBowl, duration: "0:42", prepTime: "20 min", cookTime: "10 min", servings: 2,
    calories: 380, rating: 4.8, likes: "31.7K", comments: "1.5K", category: "Hawaiian", difficulty: "Easy",
    description: "Fresh poke bowl with sashimi-grade tuna.",
    ingredients: ["300g tuna", "2 cups sushi rice", "1 avocado", "Soy sauce", "Sesame oil"],
    steps: ["Cook rice", "Cube tuna", "Assemble bowl", "Drizzle dressing"],
    tags: ["Healthy", "Bowl", "Lunch"],
  },
  {
    id: "margherita-pizza", title: "Neapolitan Margherita Pizza", chef: "Chef Marco", chefAvatar: "👨‍🍳",
    image: pizza, duration: "1:15", prepTime: "2 hours", cookTime: "8 min", servings: 2,
    calories: 680, rating: 4.9, likes: "56.1K", comments: "3.2K", category: "Italian", difficulty: "Hard",
    description: "Authentic Neapolitan pizza with San Marzano tomatoes.",
    ingredients: ["500g Tipo 00 flour", "San Marzano tomatoes", "Fresh mozzarella", "Basil"],
    steps: ["Make dough", "Let rise", "Shape and top", "Bake at max heat"],
    tags: ["Pizza", "Italian", "Baking"],
  },
  {
    id: "chocolate-lava-cake", title: "Chocolate Lava Cake", chef: "Chef Marie", chefAvatar: "👩‍🍳",
    image: lavaCake, duration: "0:50", prepTime: "10 min", cookTime: "12 min", servings: 4,
    calories: 450, rating: 4.9, likes: "67.8K", comments: "4.1K", category: "Dessert", difficulty: "Medium",
    description: "Decadent lava cake with molten center.",
    ingredients: ["200g dark chocolate", "100g butter", "3 eggs", "75g sugar", "40g flour"],
    steps: ["Melt chocolate", "Whisk eggs", "Fold together", "Bake 12 min"],
    tags: ["Dessert", "Chocolate"],
  },
  {
    id: "pad-thai", title: "Shrimp Pad Thai", chef: "Chef Siri", chefAvatar: "👩‍🍳",
    image: padThai, duration: "0:48", prepTime: "15 min", cookTime: "10 min", servings: 2,
    calories: 410, rating: 4.7, likes: "28.4K", comments: "1.8K", category: "Thai", difficulty: "Medium",
    description: "Classic Thai stir-fried noodles with shrimp.",
    ingredients: ["200g rice noodles", "250g shrimp", "Tamarind paste", "Fish sauce"],
    steps: ["Soak noodles", "Stir-fry shrimp", "Add noodles and sauce", "Garnish"],
    tags: ["Noodles", "Seafood", "Quick"],
  },
  {
    id: "acai-bowl", title: "Dragon Fruit Açaí Bowl", chef: "Chef Luna", chefAvatar: "👩‍🍳",
    image: acaiBowl, duration: "0:35", prepTime: "10 min", cookTime: "0 min", servings: 1,
    calories: 320, rating: 4.6, likes: "19.2K", comments: "980", category: "Healthy", difficulty: "Easy",
    description: "Vibrant superfood bowl with tropical fruits.",
    ingredients: ["2 açaí packets", "1 banana", "Dragon fruit", "Granola"],
    steps: ["Blend base", "Pour into bowl", "Add toppings"],
    tags: ["Breakfast", "Vegan", "Superfood"],
  },
  {
    id: "seared-duck", title: "Seared Duck Breast", chef: "Chef Aiko", chefAvatar: "🧑‍🍳",
    image: dishPlated, duration: "1:20", prepTime: "20 min", cookTime: "25 min", servings: 2,
    calories: 580, rating: 4.9, likes: "24.3K", comments: "1.6K", category: "Fine Dining", difficulty: "Hard",
    description: "Restaurant-quality seared duck breast.",
    ingredients: ["2 duck breasts", "Orange juice", "Honey", "Baby carrots"],
    steps: ["Score skin", "Sear skin-side down", "Roast", "Make glaze"],
    tags: ["Fine Dining", "Elegant"],
  },
  {
    id: "sushi-platter", title: "Sushi Platter Deluxe", chef: "Chef Tanaka", chefAvatar: "👨‍🍳",
    image: sushiPlatter, duration: "1:30", prepTime: "45 min", cookTime: "20 min", servings: 4,
    calories: 520, rating: 4.8, likes: "38.5K", comments: "2.4K", category: "Japanese", difficulty: "Hard",
    description: "Assorted sushi platter with nigiri and maki.",
    ingredients: ["Sushi rice", "Nori sheets", "Salmon", "Tuna", "Avocado"],
    steps: ["Prepare rice", "Slice fish", "Shape nigiri", "Roll maki"],
    tags: ["Sushi", "Japanese", "Elegant"],
  },
];

export interface VideoData {
  id: string; title: string; description: string; video_url: string; thumbnail_url: string;
  category: string; difficulty: string; duration: string; chef_name: string; chef_avatar: string;
  view_count: number; like_count: number; comment_count: number; calories: number;
  ingredients: string[]; steps: string[]; tags: string[]; created_at: string;
}

export const mockVideos: VideoData[] = recipes.map((r, i) => ({
  id: r.id, title: r.title, description: r.description,
  video_url: `https://res.cloudinary.com/demo/video/upload/v1/cooking/${r.id}.mp4`,
  thumbnail_url: r.image, category: r.category, difficulty: r.difficulty, duration: r.duration,
  chef_name: r.chef, chef_avatar: r.chefAvatar,
  view_count: Math.floor(Math.random() * 50000) + 5000,
  like_count: parseInt(r.likes.replace(/[^\d]/g, "")) * (r.likes.includes("K") ? 1000 : 1),
  comment_count: parseInt(r.comments.replace(/[^\d]/g, "")) * (r.comments.includes("K") ? 1000 : 1),
  calories: r.calories, ingredients: r.ingredients, steps: r.steps, tags: r.tags,
  created_at: new Date(Date.now() - i * 86400000 * 3).toISOString(),
}));
