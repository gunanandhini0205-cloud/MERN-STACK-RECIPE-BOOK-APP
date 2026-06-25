
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import homeBg from '../images/home.jpg';
const API_BASE = 'http://localhost:5000';  // <-- Set your backend API base URL here

const HomePage = ({ recipes, setRecipes }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  // Fetch recipes from backend on component mount
  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch(`${API_BASE}/api/recipes`);
        if (!response.ok) throw new Error('Failed to fetch recipes');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
    fetchRecipes();
  }, [setRecipes]);

  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      const filtered = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(query)
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipes);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setFilteredRecipes(recipes);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        const response = await fetch(`${API_BASE}/api/recipes/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete recipe');

        // Update local state only after successful backend delete
        const updatedRecipes = recipes.filter(recipe => recipe._id !== id);
        setRecipes(updatedRecipes);
        setFilteredRecipes(updatedRecipes);
      } catch (error) {
        console.error('Error deleting recipe:', error);
        alert('Could not delete recipe. Please try again.');
      }
    }
  };

  // Keep filteredRecipes updated if recipes prop changes externally
  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

  return (
    <div className="home-wrapper" style={{ backgroundImage: `url(${homeBg})` }}>
      <h1 style={{color:' #2c3e50'}}>🍽️ Recipe Book App</h1>
      <h2 style={{ color:' #34495e'}}>Welcome to Recipe Management</h2>

      <div>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClear} style={{ marginLeft: '10px' }}>Clear</button>
      </div>

      <p style={{color:"555"}}>Manage and search your favorite recipes</p>

      <div>
        <Link to="/addrecipe">
          <button>Add Recipe</button>
        </Link>
      </div>

      <div>
        <h2 style={{ color:' #34495e'}}>Your Recipes</h2>
        {filteredRecipes.length === 0 ? (
          <p style={{color:"555"}}>No recipes found.</p>
        ) : (
          <ul>
            {filteredRecipes.map(recipe => (
              <li key={recipe._id}>
                {recipe.title}{' '}
                <Link to={`/view/${recipe._id}`}>
                  <button>View</button>
                </Link>{' '}
                <Link to={`/update/${recipe._id}`}>
                  <button>Edit</button>
                </Link>{' '}
                <button onClick={() => handleDelete(recipe._id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
