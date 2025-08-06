import { useState, useEffect } from "react"
import "../MealPlanDashboard/MealPlanDashboard.css"
import Sidebar_Nut from "../../Sidebar_Nut/Sidebar_Nut"
import img1 from '../../../../assets/img-Nu/Depth 5, Frame 0 (2).png'
import img2 from '../../../../assets/img-Nu/Depth 5, Frame 0 (1).png'

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]

const MealPlanDashboard = () => {
  const [recipes, setRecipes] = useState([
    { id: 1, name: "Grilled Chicken Salad", image: img1, calories: 350 },
    { id: 2, name: "Oatmeal with Berries", image: img2, calories: 250 },
    { id: 3, name: "Salmon & Veggies", image: img1, calories: 400 },
  ])

  const [mealPlan, setMealPlan] = useState(
    daysOfWeek.reduce(
      (acc, day) => ({
        ...acc,
        [day]: day === "Monday"
          ? [{ id: 1, name: "Grilled Chicken Salad", image: img1, calories: 350 }]
          : [],
      }),
      {}
    )
  )

  const [newRecipe, setNewRecipe] = useState({ id: null, name: "", image: "", calories: "" })
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[0])
  const [previewImage, setPreviewImage] = useState("")
  const [planName, setPlanName] = useState("")

  // جلب اسم الخطة من الباك
  useEffect(() => {
    const fetchPlanName = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/meal-plan-name") 
        const data = await response.json()
        setPlanName(data.name || "Meal Plan")
      } catch (error) {
        console.error("Error fetching plan name:", error)
        setPlanName("Meal Plan") // fallback
      }
    }

    fetchPlanName()
  }, [])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreviewImage(imageUrl)
      setNewRecipe({ ...newRecipe, image: imageUrl })
    }
  }

  const handleSaveRecipe = () => {
    if (!newRecipe.name || !newRecipe.calories || !newRecipe.image) return

    if (newRecipe.id) {
      setRecipes((prev) => prev.map((r) => (r.id === newRecipe.id ? newRecipe : r)))
    } else {
      const recipeToAdd = { ...newRecipe, id: Date.now() }
      setRecipes((prev) => [...prev, recipeToAdd])
    }

    setNewRecipe({ id: null, name: "", image: "", calories: "" })
    setPreviewImage("")
  }

  const handleEditRecipe = (recipe) => {
    setNewRecipe(recipe)
    setPreviewImage(recipe.image)
  }

  const handleAddToDay = (recipe) => {
    setMealPlan((prev) => ({
      ...prev,
      [selectedDay]: [...prev[selectedDay], recipe],
    }))
  }

  const handleDeleteFromDay = (day, mealId) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: prev[day].filter((meal) => meal.id !== mealId),
    }))
  }

  const handleSaveMealPlan = () => {
    alert("Meal Plan Saved (Local Data Only)!")
    console.log(mealPlan)
  }

  return (
    <div className="meal-plan-dashboard-container">
      <Sidebar_Nut />

      <div className="main-layout">
        <div className="main-content-mealplan">
          {/* عرض اسم الخطة */}
          <h1 className="main-title-mealplan">{planName}</h1>

          {daysOfWeek.map((day) => (
            <div key={day} className="day-section--mealplan">
              <h2 className="day-title">{day}</h2>
              <div className="meal-list">
                {mealPlan[day].length === 0 && <p className="empty-day">No meals yet</p>}
                {mealPlan[day].map((meal) => (
                  <div key={meal.id} className="meal-item--mealplan">
                    <img
                      src={meal.image}
                      alt=""
                      className="meal-image"
                      width={45}
                      height={45}
                    />
                    <div>
                      <h3 className="meal-name--mealplan">{meal.name}</h3>
                      <p className="meal-calories">{meal.calories} calories</p>
                    </div>
                    <button
                      className="delete-meal-button"
                      onClick={() => handleDeleteFromDay(day, meal.id)}
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="save-button-wrapper">
            <button className="save-button" onClick={handleSaveMealPlan}>
              Save Meal Plan
            </button>
          </div>
        </div>

        <div className="sidebar-mealplan">
          <h3 className="sidebar-title">Recipes</h3>

          <div className="recipe-list">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-item">
                <img
                  src={recipe.image}
                  alt=""
                  width={40}
                  height={40}
                  className="recipe-image"
                />
                <div>
                  <h4 className="recipe-title">{recipe.name}</h4>
                  <p className="recipe-calories">{recipe.calories} calories</p>
                </div>
                <button className="add-to-day-button" onClick={() => handleAddToDay(recipe)}>
                  + Add
                </button>
                <button className="edit-recipe-button" onClick={() => handleEditRecipe(recipe)}>
                  Edit
                </button>
              </div>
            ))}
          </div>

          <div className="add-recipe-form">
            <input
              type="text"
              placeholder="Recipe name"
              value={newRecipe.name}
              onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Calories"
              value={newRecipe.calories}
              onChange={(e) => setNewRecipe({ ...newRecipe, calories: e.target.value })}
            />

            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                style={{ width: "50px", height: "50px", marginTop: "5px", borderRadius: "8px" }}
              />
            )}

            <button className="add-recipe-button" onClick={handleSaveRecipe}>
              {newRecipe.id ? "Update Recipe" : "Add Recipe"}
            </button>
          </div>

          <select
            className="day-selector"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default MealPlanDashboard
