import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import AddRecipe from './pages/addRecipe';
import ViewRecipe from './pages/viewRecipes';
import UpdateRecipe from './pages/updateRecipe';
import DeleteRecipe from './pages/deleteRecipe';  // Import DeleteRecipe
function App() {	
  const [recipes, setRecipes] = useState([
    {
      id: '1',
      title: 'Spaghetti',
      description: 'Delicious spaghetti with tomato sauce.',
      image: '',
      ingredients: ['Spaghetti pasta', 'Tomato sauce', 'Garlic', 'Olive oil', 'Salt'],
      instructions: [
        'Boil water in a large pot.',
        'Cook spaghetti until al dente.',
        'Heat olive oil and sauté garlic.',
        'Add tomato sauce and simmer.',
        'Mix spaghetti with sauce and serve.'
      ],
      cookingTime: 30,
      servings: 4,
    },
    {
      id: '2',
      title: 'Pancakes',
      description: 'Fluffy pancakes with syrup.',
      image: '',
      ingredients: ['Flour', 'Milk', 'Eggs', 'Baking powder', 'Sugar', 'Butter'],
      instructions: [
        'Mix dry ingredients in a bowl.',
        'Whisk in milk and eggs until smooth.',
        'Heat a skillet and melt butter.',
        'Pour batter and cook until bubbles form.',
        'Flip and cook the other side until golden.'
      ],
      cookingTime: 20,
      servings: 3,
    },
  ]);

  return (
    <Routes>
      <Route path="/" element={<HomePage recipes={recipes} setRecipes={setRecipes} />} />
      <Route path="/addrecipe" element={<AddRecipe recipes={recipes} setRecipes={setRecipes} />} />
      <Route path="/view/:id" element={<ViewRecipe recipes={recipes} />} />
      <Route path="/update/:id" element={<UpdateRecipe recipes={recipes} setRecipes={setRecipes} />} />
      <Route path="/delete/:id" element={<DeleteRecipe recipes={recipes} setRecipes={setRecipes} />} />  {/* Added route for delete */}
    </Routes>
  );
}
export default App;
