import React, { useState, useEffect } from "react";
import "./NutritionDashboard.css";
import Sidebar_Nut from "../../Sidebar_Nut/Sidebar_Nut";

const NutritionDashboard = () => {
  const [recipes, setRecipes] = useState([
    {
      name: "Mediterranean Quinoa Salad",
      category: "Salad",
      ingredients: "Quinoa, cucumber, tomatoes, feta cheese, olives",
      time: "20 minutes",
    },
    {
      name: "Chicken Stir-Fry with Brown Rice",
      category: "Main Course",
      ingredients:
        "Chicken breast, broccoli, carrots, bell peppers, soy sauce",
      time: "30 minutes",
    },
    {
      name: "Lentil Soup",
      category: "Soup",
      ingredients: "Lentils, carrots, celery, onions, vegetable broth",
      time: "45 minutes",
    },
    {
      name: "Baked Salmon with Asparagus",
      category: "Main Course",
      ingredients: "Salmon fillets, asparagus, lemon, olive oil",
      time: "25 minutes",
    },
    {
      name: "Fruit Smoothie",
      category: "Breakfast",
      ingredients: "Banana, berries, spinach, almond milk",
      time: "5 minutes",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // مثال على جلب البيانات من API مستقبلاً
  useEffect(() => {
    // fetch("https://api.example.com/recipes")
    //   .then((res) => res.json())
    //   .then((data) => setRecipes(data))
    //   .catch((err) => console.error(err));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="main-content--NDj">
        <Sidebar_Nut/>
        <div className="flex-nu">
        <div className="header_Nut_b">
          <div className="header-top">
            <h1 className="page-title">Recipes</h1>
            <button className="new-recipe-btn">New Recipe</button>
          </div>

          {/* Search */}
          <div className="search-container">
            <svg
              className="search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search recipes"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="recipes-table">
            <thead>
              <tr>
                <th>Recipe Name</th>
                <th>Category</th>
                <th>Ingredients</th>
                <th>Preparation Time</th>
                <th className="actions-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe, index) => (
                  <tr key={index}>
                    <td className="recipe-name">{recipe.name}</td>
                    <td className="recipe-category">{recipe.category}</td>
                    <td className="recipe-ingredients">{recipe.ingredients}</td>
                    <td className="recipe-time">{recipe.time}</td>
                    <td>
                      <button className="view-btn">View</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No recipes found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionDashboard;
