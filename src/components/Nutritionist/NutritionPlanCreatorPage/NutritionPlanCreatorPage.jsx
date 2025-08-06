import { useState } from "react";
import { Edit3, Trash2, Plus, Check, X } from "lucide-react";
import Sidebar_Nut from "../Sidebar_Nut/Sidebar_Nut";
import '../NutritionPlanCreatorPage/NutritionPlanCreatorPage.css'

import img1 from '../../../assets/img-Nu/Depth 6, Frame 0 (2).png';
import img2 from '../../../assets/img-Nu/Depth 6, Frame 0 (3).png';
import img3 from '../../../assets/img-Nu/Depth 6, Frame 0 (4).png';
import img4 from '../../../assets/img-Nu/Depth 6, Frame 0 (5).png';

function NutritionPlanCreatorPage({ readOnly = false }) {
  const [plan, setPlan] = useState({
    title: "",
    description: "",
    meals: { breakfast: [], lunch: [], dinner: [], snacks: [] },
  });

  const [selectedCategory, setSelectedCategory] = useState("Vegetables");
  const [selectedMealForAdd, setSelectedMealForAdd] = useState("lunch");
  const [editingMeal, setEditingMeal] = useState(null);
  const [editValues, setEditValues] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  const [foodLibrary, setFoodLibrary] = useState({
    Vegetables: [
      {
        name: "Spinach",
        calories: 30,
        protein: 2,
        carbs: 10,
        fat: 0,
        image: "/foods/spinach.jpg",
      },
      {
        name: "Broccoli",
        calories: 40,
        protein: 3,
        carbs: 7,
        fat: 0,
        image: "/foods/broccoli.jpg",
      },
    ],
    Fruits: [
      { name: "Apple", calories: 52, protein: 0, carbs: 14, fat: 0, image: "/foods/apple.jpg" },
      { name: "Banana", calories: 89, protein: 1, carbs: 23, fat: 0, image: "/foods/banana.jpg" },
    ],
    Protein: [
      {
        name: "Chicken Breast",
        calories: 165,
        protein: 31,
        carbs: 0,
        fat: 4,
        image: "/foods/chicken.jpg",
      },
      { name: "Beef Steak", calories: 250, protein: 26, carbs: 0, fat: 15, image: "/foods/steak.jpg" },
    ],
    Carbs: [
      { name: "Rice", calories: 130, protein: 2, carbs: 28, fat: 0, image: "/foods/rice.jpg" },
      { name: "Pasta", calories: 131, protein: 5, carbs: 25, fat: 1, image: "/foods/pasta.jpg" },
    ],
    "Healthy Fats": [
      { name: "Avocado", calories: 160, protein: 2, carbs: 9, fat: 15, image: "/foods/avocado.jpg" },
      { name: "Almonds", calories: 579, protein: 21, carbs: 22, fat: 50, image: "/foods/almonds.jpg" },
    ],
  });

  const [newFood, setNewFood] = useState({
    name: "",
    description: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    imageFile: null,
    imagePreview: "",
    category: "Vegetables",
  });

  const [editingFood, setEditingFood] = useState(null); // {category, index}
  const [editFoodValues, setEditFoodValues] = useState({
    name: "",
    description: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    image: "",
  });

  const mealImages = {
    breakfast: img1,
    lunch: img2,
    dinner: img3,
    snacks: img4,
  };

  const handleNewFoodChange = (e) => {
    if (readOnly) return; // منع التعديل في وضع العرض فقط
    const { name, value, files } = e.target;
    if (name === "imageFile" && files && files[0]) {
      const file = files[0];
      setNewFood((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      }));
    } else {
      setNewFood((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addNewFoodToLibrary = () => {
    if (readOnly) return; // منع الإضافة في وضع العرض فقط
    if (!newFood.name || (!newFood.imageFile && !newFood.imagePreview)) {
      alert("Please add name and image.");
      return;
    }
    const newFoodItem = {
      name: newFood.name,
      description: newFood.description,
      calories: Number(newFood.calories),
      protein: Number(newFood.protein),
      carbs: Number(newFood.carbs),
      fat: Number(newFood.fat),
      image: newFood.imagePreview,
    };
    setFoodLibrary((prev) => {
      const updatedCategory = [...(prev[newFood.category] || []), newFoodItem];
      return { ...prev, [newFood.category]: updatedCategory };
    });
    setNewFood({
      name: "",
      description: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      imageFile: null,
      imagePreview: "",
      category: "Vegetables",
    });
  };

  const calculateSummary = () => {
    const summary = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    Object.values(plan.meals).forEach((mealArray) => {
      mealArray.forEach((meal) => {
        summary.calories += meal.calories || 0;
        summary.protein += meal.protein || 0;
        summary.carbs += meal.carbs || 0;
        summary.fat += meal.fat || 0;
      });
    });
    return summary;
  };

  const summary = calculateSummary();

  const handleAddFood = (foodItem) => {
    if (readOnly) return; // منع الإضافة في وضع العرض فقط
    const mealType = selectedMealForAdd;
    setPlan((prev) => {
      const updatedMeals = { ...prev.meals };
      updatedMeals[mealType] = [...updatedMeals[mealType], foodItem];
      return { ...prev, meals: updatedMeals };
    });
  };

  const startEditing = (mealType, index) => {
    if (readOnly) return; // منع التعديل في وضع العرض فقط
    const meal = plan.meals[mealType][index];
    setEditingMeal({ mealType, index });
    setEditValues(meal);
  };

  const saveEdit = () => {
    if (readOnly) return; // منع الحفظ في وضع العرض فقط
    if (!editingMeal) return;
    const { mealType, index } = editingMeal;
    setPlan((prev) => {
      const updatedMeals = { ...prev.meals };
      updatedMeals[mealType][index] = { ...editValues };
      return { ...prev, meals: updatedMeals };
    });
    setEditingMeal(null);
  };

  const deleteMealItem = (mealType, index) => {
    if (readOnly) return; // منع الحذف في وضع العرض فقط
    setPlan((prev) => {
      const updatedMeals = { ...prev.meals };
      updatedMeals[mealType] = updatedMeals[mealType].filter((_, i) => i !== index);
      return { ...prev, meals: updatedMeals };
    });
  };

  const startEditingFood = (category, index) => {
    if (readOnly) return; // منع التعديل في وضع العرض فقط
    const food = foodLibrary[category][index];
    setEditingFood({ category, index });
    setEditFoodValues(food);
  };

  const saveFoodEdit = () => {
    if (readOnly) return; // منع الحفظ في وضع العرض فقط
    if (!editingFood) return;
    const { category, index } = editingFood;
    setFoodLibrary((prev) => {
      const updatedCategory = [...prev[category]];
      updatedCategory[index] = {
        ...editFoodValues,
        calories: Number(editFoodValues.calories),
        protein: Number(editFoodValues.protein),
        carbs: Number(editFoodValues.carbs),
        fat: Number(editFoodValues.fat),
      };
      return { ...prev, [category]: updatedCategory };
    });
    setEditingFood(null);
  };

  const deleteFood = (category, index) => {
    if (readOnly) return; // منع الحذف في وضع العرض فقط
    setFoodLibrary((prev) => {
      const updatedCategory = prev[category].filter((_, i) => i !== index);
      return { ...prev, [category]: updatedCategory };
    });
    if (editingFood && editingFood.category === category && editingFood.index === index) {
      setEditingFood(null);
    }
  };

  const cancelFoodEdit = () => {
    setEditingFood(null);
  };

  const savePlan = () => {
    if (readOnly) return; // منع الحفظ في وضع العرض فقط
    console.log("Saved plan:", plan);
    alert("Plan saved successfully!");
  };

  return (
    <div className="pnp-app">
      <div className="pnp-main-layout">
        <Sidebar_Nut />
        <div className="pnp-flex">
          <div className="pnp-main-content">
            <div className="pnp-page-header">
              <input
                className="pnp-page-title"
                style={{ border: "none", fontSize: "1.5rem", width: "100%" }}
                placeholder="Enter Plan Title"
                value={plan.title}
                onChange={(e) => !readOnly && setPlan({ ...plan, title: e.target.value })}
                disabled={readOnly}
              />
              <div className="pnp-image-header">
                <img
                  src="/plan-cover.jpg"
                  alt="Plan cover"
                  style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                />
              </div>
              <input
                className="pnp-page-description"
                style={{ border: "none", fontSize: "1rem", width: "100%" }}
                placeholder="Enter Description"
                value={plan.description}
                onChange={(e) => !readOnly && setPlan({ ...plan, description: e.target.value })}
                disabled={readOnly}
              />
            </div>

            <div className="pnp-daily-plan-header">
              <span className="pnp-daily-plan-text">Customize Meal Plan</span>
            </div>

            {Object.entries(plan.meals).map(([mealType, mealArray]) => (
              <div className="pnp-meal-section-create" key={mealType}>
                <div className="pnp-meal-header-create">
                  <div>
                    <h3 className="pnp-meal-title-create">
                      <img
                        src={mealImages[mealType]}
                        alt={mealType}
                      />
                      {mealType}
                    </h3>
                    <p className="pnp-meal-description">Customize your {mealType} items.</p>
                  </div>
                </div>

                <div className="pnp-meal-items">
                  {mealArray.map((item, index) => (
                    <div className="pnp-meal-item" key={index}>
                      {editingMeal?.mealType === mealType && editingMeal?.index === index && !readOnly ? (
                        <div className="pnp-edit-form">
                          <input
                            type="text"
                            value={editValues.name}
                            onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                          />
                          <input
                            type="number"
                            value={editValues.calories}
                            onChange={(e) => setEditValues({ ...editValues, calories: Number(e.target.value) })}
                          />
                          <input
                            type="number"
                            value={editValues.protein}
                            onChange={(e) => setEditValues({ ...editValues, protein: Number(e.target.value) })}
                          />
                          <input
                            type="number"
                            value={editValues.carbs}
                            onChange={(e) => setEditValues({ ...editValues, carbs: Number(e.target.value) })}
                          />
                          <input
                            type="number"
                            value={editValues.fat}
                            onChange={(e) => setEditValues({ ...editValues, fat: Number(e.target.value) })}
                          />
                          <button className="pnp-save-btn" onClick={saveEdit}>
                            Save
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="pnp-item-details">
                            <h4 className="pnp-item-name">{item.name}</h4>
                            <p className="pnp-item-nutrition">
                              {item.calories} kcal | {item.protein}g P | {item.carbs}g C | {item.fat}g F
                            </p>
                          </div>
                          {!readOnly && (
                            <div className="pnp-item-actions">
                              <Edit3 className="pnp-edit-icon" onClick={() => startEditing(mealType, index)} />
                              <Trash2 className="pnp-delete-icon" onClick={() => deleteMealItem(mealType, index)} />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="pnp-daily-summary">
              <h3 className="pnp-summary-title">Summary</h3>
              <div className="pnp-summary-grid">
                <div className="pnp-summary-item">
                  <p>Total Calories</p>
                  <p>{summary.calories}</p>
                </div>
                <div className="pnp-summary-item">
                  <p>Total Protein</p>
                  <p>{summary.protein}g</p>
                </div>
                <div className="pnp-summary-item">
                  <p>Total Carbs</p>
                  <p>{summary.carbs}g</p>
                </div>
                <div className="pnp-summary-item">
                  <p>Total Fat</p>
                  <p>{summary.fat}g</p>
                </div>
              </div>
              {!readOnly && (
                <button className="pnp-add-food-btn-save" onClick={savePlan}>
                  Save Plan
                </button>
              )}
            </div>
          </div>

          <div className="pnp-sidebar">
            <h3>Food Library</h3>
            <select
              id="meal-select"
              value={selectedMealForAdd}
              onChange={(e) => !readOnly && setSelectedMealForAdd(e.target.value)}
              disabled={readOnly}
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snacks">Snacks</option>
            </select>
            <div className="pnp-category-tags">
              {Object.keys(foodLibrary).map((category) => (
                <span
                  key={category}
                  className={`pnp-tag ${selectedCategory === category ? "active" : ""}`}
                  onClick={() => !readOnly && setSelectedCategory(category)}
                  style={{ cursor: readOnly ? "default" : "pointer" }}
                >
                  {category}
                </span>
              ))}
            </div>
            <div className="pnp-food-list">
              {foodLibrary[selectedCategory].map((item, idx) => (
                <div className="pnp-food-item" key={idx}>
                  {editingFood?.category === selectedCategory && editingFood?.index === idx && !readOnly ? (
                    <div className="pnp-edit-food-form">
                      <input
                        type="text"
                        value={editFoodValues.name}
                        onChange={(e) => setEditFoodValues({ ...editFoodValues, name: e.target.value })}
                        placeholder="Name"
                      />
                      <input
                        type="text"
                        value={editFoodValues.description}
                        onChange={(e) => setEditFoodValues({ ...editFoodValues, description: e.target.value })}
                        placeholder="Description"
                      />
                      <input
                        type="number"
                        value={editFoodValues.calories}
                        onChange={(e) => setEditFoodValues({ ...editFoodValues, calories: e.target.value })}
                        placeholder="Calories"
                      />
                      <input
                        type="number"
                        value={editFoodValues.protein}
                        onChange={(e) => setEditFoodValues({ ...editFoodValues, protein: e.target.value })}
                        placeholder="Protein"
                      />
                      <input
                        type="number"
                        value={editFoodValues.carbs}
                        onChange={(e) => setEditFoodValues({ ...editFoodValues, carbs: e.target.value })}
                        placeholder="Carbs"
                      />
                      <input
                        type="number"
                        value={editFoodValues.fat}
                        onChange={(e) => setEditFoodValues({ ...editFoodValues, fat: e.target.value })}
                        placeholder="Fat"
                      />
                      <input
                        type="text"
                        value={editFoodValues.image}
                        onChange={(e) => setEditFoodValues({ ...editFoodValues, image: e.target.value })}
                        placeholder="Image URL"
                      />
                      <div style={{ marginTop: "8px" }}>
                        <button onClick={saveFoodEdit} title="Save" style={{ marginRight: 8 }}>
                          <Check size={18} color="green" />
                        </button>
                        <button onClick={cancelFoodEdit} title="Cancel">
                          <X size={18} color="red" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="pnp-food-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="pnp-food-details">
                        <h4 className="pnp-food-name">{item.name}</h4>
                        <p className="pnp-food-nutrition">
                          {item.calories} kcal | {item.protein}g P | {item.carbs}g C | {item.fat}g F
                        </p>
                      </div>
                      <div className="pnp-item-actions">
                      <button
                        onClick={() => handleAddFood(item)}
                        className="icon-btn pnp-add-food-icon-btn"
                        title={`Add to ${selectedMealForAdd}`}
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => startEditingFood(selectedCategory, idx)}
                        className="icon-btn pnp-edit-food-btn"
                        title="Edit Food"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => deleteFood(selectedCategory, idx)}
                        className="icon-btn pnp-delete-food-btn"
                        title="Delete Food"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    </>
                  )}
                </div>
              ))}
{/* Add New Food Form */}
{!readOnly && (
  <div className="pnp-add-food-form">
    <h4>Add New Food</h4>
    <input
      type="text"
      placeholder="Name"
      name="name"
      value={newFood.name}
      onChange={handleNewFoodChange}
      className="pnp-input"
    />
    <input
      type="text"
      placeholder="Description"
      name="description"
      value={newFood.description}
      onChange={handleNewFoodChange}
      className="pnp-input"
    />
    <input
      type="number"
      placeholder="Calories"
      name="calories"
      value={newFood.calories}
      onChange={handleNewFoodChange}
      className="pnp-input"
    />
    <input
      type="number"
      placeholder="Protein"
      name="protein"
      value={newFood.protein}
      onChange={handleNewFoodChange}
      className="pnp-input"
    />
    <input
      type="number"
      placeholder="Carbs"
      name="carbs"
      value={newFood.carbs}
      onChange={handleNewFoodChange}
      className="pnp-input"
    />
    <input
      type="number"
      placeholder="Fat"
      name="fat"
      value={newFood.fat}
      onChange={handleNewFoodChange}
      className="pnp-input"
    />
    <select
      name="category"
      value={newFood.category}
      onChange={handleNewFoodChange}
      className="pnp-select"
    >
      {Object.keys(foodLibrary).map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
    <input
      type="file"
      accept="image/*"
      name="imageFile"
      onChange={handleNewFoodChange}
      className="pnp-file-input"
    />
    {newFood.imagePreview && (
      <img
        src={newFood.imagePreview}
        alt="Preview"
        className="pnp-image-preview"
      />
    )}
    <button onClick={addNewFoodToLibrary} className="pnp-add-food-btn">
      Add Food
    </button>
  </div>
)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NutritionPlanCreatorPage;
