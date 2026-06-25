
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './addRecipe.css';

function AddRecipe({ recipes, setRecipes }) {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: '',
    ingredients: '',
    instructions: '',
    cookingTime: '',
    servings: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      ...formData,
      ingredients: formData.ingredients
        .split(',')
        .map((i) => i.trim())
        .filter(Boolean),
      instructions: formData.instructions
        .split('.')
        .map((i) => i.trim())
        .filter(Boolean),
      cookingTime: Number(formData.cookingTime) || 0,
      servings: Number(formData.servings) || 0,
    };

    try {
      // Replace with your backend URL if needed
      const response = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      });

      if (!response.ok) {
        throw new Error('Failed to add recipe');
      }

      const newRecipe = await response.json();

      setRecipes([...recipes, newRecipe]);

      alert('Recipe added!');
      navigate('/');
    } catch (error) {
      alert('Error adding recipe: ' + error.message);
    }
  };

  return (
    <div className="add-recipe-container">
      <h2 style={{color: '#2c3e50'}}>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <br />
        <br />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <br />
        <br />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma-separated)"
          value={formData.ingredients}
          onChange={handleChange}
        />
        <br />
        <br />
        <textarea
          name="instructions"
          placeholder="Instructions (end with period)"
          value={formData.instructions}
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          type="number"
          name="cookingTime"
          placeholder="Cooking Time"
          value={formData.cookingTime}
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          type="number"
          name="servings"
          placeholder="Servings"
          value={formData.servings}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
}

export default AddRecipe;
