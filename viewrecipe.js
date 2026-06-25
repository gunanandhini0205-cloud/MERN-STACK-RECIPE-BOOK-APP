
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './viewRecipes.css'; // adjust relative path accordingly

function ViewRecipe({ recipes }) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        // Make sure backend URL is correct here
        const response = await fetch(`http://localhost:5000/api/recipes/${id}`);
        
        if (!response.ok) {
          throw new Error('Recipe not found');
        }

        // Try to parse JSON
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <p>Loading recipe...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

 return (
  <div className="view-recipe">
    <h1 style={{color: '#2c3e50'}}>{recipe.title}</h1>

    <div className="recipe-meta">
      <p><strong>Cooking time:</strong> {recipe.cookingTime ?? 'N/A'} minutes</p>
      <p><strong>Servings:</strong> {recipe.servings ?? 'N/A'}</p>
    </div>

    <div className="recipe-layout">
      <div className="left-side">
        <p>{recipe.description || 'No description available.'}</p>

        <section>
          <h2 style={{ color: '#34495e'}}>Ingredients</h2>
          <ul>
            {(recipe.ingredients && recipe.ingredients.length > 0) ? (
              recipe.ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))
            ) : (
              <li>No ingredients listed.</li>
            )}
          </ul>
        </section>

        <section>
          <h2>Instructions</h2>
          <ol>
            {(recipe.instructions && recipe.instructions.length > 0) ? (
              recipe.instructions.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))
            ) : (
              <li>No instructions provided.</li>
            )}
          </ol>
        </section>
      </div>

      <div className="right-side">
        <img
          src={recipe.image || 'https://via.placeholder.com/400x300?text=No+Image'}
          alt={recipe.title}
        />
      </div>
    </div>

    <div className="recipe-actions">
      <Link to={`/update/${recipe._id}`}>
        <button>Edit Recipe</button>
      </Link>
      <Link to="/" className="back-link">← Back to Home</Link>
    </div>
  </div>
);

}
export default ViewRecipe;
