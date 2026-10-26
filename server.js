const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

const { detect } = require('./controllers/safetyController');
app.post('/api/vision', detect);

// Recipe query API for 27-kitchen-companion-pro
app.get('/api/recipes', (req, res) => {
  const query = (req.query.q || '').toLowerCase();
  const recipes = [
    { id: '1', title: 'Avocado Toast with Poached Egg', prepTime: '10 mins', cuisine: 'Breakfast', ingredients: ['avocado', 'sourdough', 'egg', 'chili flakes'] },
    { id: '2', title: 'Creamy Tuscan Garlic Chicken', prepTime: '25 mins', cuisine: 'Italian', ingredients: ['chicken breast', 'spinach', 'sun-dried tomatoes', 'garlic', 'cream'] },
    { id: '3', title: 'Spicy Thai Basil Tofu Bowl', prepTime: '15 mins', cuisine: 'Thai', ingredients: ['firm tofu', 'thai basil', 'soy sauce', 'chili', 'jasmine rice'] },
    { id: '4', title: 'Classic Margherita Pizza', prepTime: '30 mins', cuisine: 'Italian', ingredients: ['pizza dough', 'san marzano tomatoes', 'fresh mozzarella', 'basil'] },
    { id: '5', title: 'Mediterranean Quinoa Salad', prepTime: '15 mins', cuisine: 'Mediterranean', ingredients: ['quinoa', 'cucumbers', 'cherry tomatoes', 'kalamata olives', 'feta'] }
  ];
  const filtered = query ? recipes.filter(r => r.title.toLowerCase().includes(query) || r.ingredients.some(i => i.toLowerCase().includes(query))) : recipes;
  res.status(200).json({ success: true, count: filtered.length, recipes: filtered });
});

app.post('/api/recipes/generate', (req, res) => {
  const { ingredients = [], preferences = 'balanced' } = req.body;
  res.status(200).json({
    success: true,
    recipe: {
      title: `Chef Special: Sautéed ${ingredients.slice(0, 2).join(' & ') || 'Market Harvest'} Medley`,
      prepTime: '20 mins',
      servings: 2,
      ingredients,
      instructions: [
        'Prep all ingredients and heat olive oil in a wide skillet.',
        'Sauté aromatics until fragrant, then fold in key ingredients.',
        'Season with sea salt, cracked black pepper, and fresh herbs.',
        'Garnish and serve immediately.'
      ]
    }
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`AI Vision & Culinary Engine Online on port ${port}`));