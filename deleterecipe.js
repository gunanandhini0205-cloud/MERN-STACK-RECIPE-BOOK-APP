
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
function DeleteRecipe({ recipes, setRecipes }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔁 Updated to match backend (_id instead of id)
  const recipe = recipes.find(r => r._id === id);

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  const handleDelete = async () => {
    try {
      // ✅ Backend API call
      const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete recipe');
      }

      // ✅ Remove from local state using _id
      const updatedList = recipes.filter(r => r._id !== id);
      setRecipes(updatedList);

      alert(`Deleted recipe: ${recipe.title}`);
      navigate('/'); // Redirect to home or recipes list
    } catch (error) {
      alert('Error deleting recipe: ' + error.message);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h2>Delete Recipe</h2>
      <p>Are you sure you want to delete <strong>{recipe.title}</strong>?</p>
      <button
        onClick={handleDelete}
        style={{ marginRight: 10, backgroundColor: 'red', color: 'white' }}
      >
        Yes, Delete
      </button>
      <button onClick={() => navigate(-1)}>Cancel</button>
    </div>
  );
}

export default DeleteRecipe;

