
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI (adjust if needed)
const mongoURI = 'mongodb://localhost:27017/recipebook';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected to recipebook'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Recipe Schema & Model
const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  ingredients: { type: [String], default: [] },
  instructions: { type: [String], default: [] },
  cookingTime: { type: Number, default: 0 },
  servings: { type: Number, default: 0 },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// Routes

// Get all recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    console.error('❌ GET /api/recipes error:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get recipe by ID
app.get('/api/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid recipe ID' });
    }

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (err) {
    console.error(`❌ GET /api/recipes/${req.params.id} error:`, err);
    res.status(500).json({ message: err.message });
  }
});

// Add new recipe
app.post('/api/recipes', async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    console.error('❌ POST /api/recipes error:', err);
    res.status(400).json({ message: err.message });
  }
});

// Update recipe by ID
app.put('/api/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid recipe ID' });
    }

    console.log('🔄 Update request body:', req.body);

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    console.log('✅ Recipe updated:', updatedRecipe);
    res.json(updatedRecipe);
  } catch (err) {
    console.error('❌ PUT /api/recipes/:id error:', err);
    res.status(400).json({ message: err.message, errors: err.errors });
  }
});

// Delete recipe by ID
app.delete('/api/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid recipe ID' });
    }

    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    console.error('❌ DELETE /api/recipes/:id error:', err);
    res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
