import { Edit3, Trash2, Search } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../PatientNutritionPlanPage/PatientNutritionPlanPage.css";
import Sidebar_Nut from "../../Sidebar_Nut/Sidebar_Nut";
import img1 from '../../../../assets/img-Nu/Depth 5, Frame 0 (4).png';
import img2 from '../../../../assets/img-Nu/Depth 5, Frame 0 (5).png';
import img3 from '../../../../assets/img-Nu/Depth 5, Frame 0 (6).png';
import img4 from '../../../../assets/img-Nu/Depth 5, Frame 0 (7).png';
import img5 from '../../../../assets/img-Nu/Depth 5, Frame 0 (8).png';
import img6 from '../../../../assets/img-Nu/Depth 5, Frame 0 (9).png';

import img7 from '../../../../assets/img-Nu/Depth 6, Frame 0 (2).png';
import img8 from '../../../../assets/img-Nu/Depth 6, Frame 0 (3).png';
import img9 from '../../../../assets/img-Nu/Depth 6, Frame 0 (4).png';
import img10 from'../../../../assets/img-Nu/Depth 6, Frame 0 (5).png';
  const mealImages = {
    breakfast: img7,
    lunch: img8,
    dinner: img9,
    snacks: img10,
  };
function PatientNutritionPlanPage() {
  const location = useLocation();
  const { nutId, id } = useParams();

  const { selectedPlan } = location.state || {};
  const [plan, setPlan] = useState(selectedPlan || {});
  const [loading, setLoading] = useState(true);
  const patientName = plan.patientName || "Unknown Patient";

  const [foodLibrary, setFoodLibrary] = useState({
    Vegetables: [
      { name: "Spinach", calories: 30, protein: 2, carbs: 10, fat: 0, image: img3 },
      { name: "Broccoli", calories: 40, protein: 3, carbs: 7, fat: 0, image: img4 }
    ],
    Fruits: [
      { name: "Apple", calories: 52, protein: 0, carbs: 14, fat: 0, image: img5 },
      { name: "Banana", calories: 89, protein: 1, carbs: 23, fat: 0, image: img2 }
    ],
    Protein: [
      { name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 4, image: img2 },
      { name: "Beef Steak", calories: 250, protein: 26, carbs: 0, fat: 15, image: img2 }
    ],
    Carbs: [
      { name: "Rice", calories: 130, protein: 2, carbs: 28, fat: 0, image: "/foods/rice.jpg" },
      { name: "Pasta", calories: 131, protein: 5, carbs: 25, fat: 1, image: "/foods/pasta.jpg" }
    ],
    "Healthy Fats": [
      { name: "Avocado", calories: 160, protein: 2, carbs: 9, fat: 15, image: "/foods/avocado.jpg" },
      { name: "Almonds", calories: 579, protein: 21, carbs: 22, fat: 50, image: "/foods/almonds.jpg" }
    ],
    Dairy: [
      { name: "Milk", calories: 42, protein: 3, carbs: 5, fat: 1, image: "/foods/milk.jpg" },
      { name: "Cheese", calories: 402, protein: 25, carbs: 1, fat: 33, image: "/foods/cheese.jpg" }
    ]
  });

  const [selectedCategory, setSelectedCategory] = useState("Vegetables");
  const [selectedMealForAdd, setSelectedMealForAdd] = useState("lunch");
  const [editingMeal, setEditingMeal] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", calories: "", protein: "", carbs: "", fat: "" });

  useEffect(() => {
    if (!plan.meals) {
      setPlan(prev => ({
        ...prev,
        title: prev.title || "New Nutrition Plan",
        description: prev.description || "Please customize the plan",
        meals: { breakfast: [], lunch: [], dinner: [], snacks: [] },
        patientName: prev.patientName || patientName,
      }));
    }
    setLoading(false);
  }, []);

  const calculateSummary = () => {
    const summary = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    if (!plan.meals) return summary;
    Object.values(plan.meals).forEach(mealArray => {
      mealArray.forEach(meal => {
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
    const mealType = selectedMealForAdd;
    setPlan(prev => {
      const updatedMeals = { ...prev.meals };
      updatedMeals[mealType] = [...(updatedMeals[mealType] || []), foodItem];
      return { ...prev, meals: updatedMeals };
    });
  };

  const startEditing = (mealType, index) => {
    const mealItem = plan.meals[mealType][index];
    setEditingMeal({ mealType, index });
    setEditValues({
      name: mealItem.name || "",
      calories: mealItem.calories || "",
      protein: mealItem.protein || "",
      carbs: mealItem.carbs || "",
      fat: mealItem.fat || "",
    });
  };

  const cancelEditing = () => {
    setEditingMeal(null);
    setEditValues({ name: "", calories: "", protein: "", carbs: "", fat: "" });
  };

  const saveEdit = () => {
    if (!editingMeal) return;
    const { mealType, index } = editingMeal;
    setPlan(prev => {
      const updatedMeals = { ...prev.meals };
      updatedMeals[mealType][index] = {
        name: editValues.name,
        calories: Number(editValues.calories),
        protein: Number(editValues.protein),
        carbs: Number(editValues.carbs),
        fat: Number(editValues.fat),
        image: updatedMeals[mealType][index].image || "/placeholder.svg",
      };
      return { ...prev, meals: updatedMeals };
    });
    cancelEditing();
  };
useEffect(() => {
  if (!plan.meals) {
    setPlan(prev => ({
      ...prev,
      title: prev.title || "New Nutrition Plan",
      description: prev.description || "Please customize the plan",
      meals: { breakfast: [], lunch: [], dinner: [], snacks: [] },
      patientName: prev.patientName || patientName,
    }));
  }
  setLoading(false);
}, []);
  const deleteMealItem = (mealType, index) => {
    setPlan(prev => {
      const updatedMeals = { ...prev.meals };
      updatedMeals[mealType] = updatedMeals[mealType].filter((_, i) => i !== index);
      return { ...prev, meals: updatedMeals };
    });
  };

  const handlePublish = async () => {
    alert("Publish function is not available now (no backend).");
  };

  if (loading) return <p style={{ padding: 20 }}>Loading meals...</p>;
  if (!plan.title) return <p style={{ padding: 20 }}>No plan selected.</p>;

  return (
    <div className="pnp-app">
      <div className="pnp-main-layout">
        <Sidebar_Nut />
        <div className="pnp-flex">
        <div className="pnp-main-content">
          <div className="pnp-page-header">
            <h1 className="pnp-page-title">Create Nutritional Plan for Patient: {patientName}</h1>
            <p className="pnp-page-description">Based on: <strong>{plan.title}</strong> – {plan.description}</p>
          </div>

          <div className="pnp-daily-plan-header">
            <span className="pnp-daily-plan-text">Daily Plan</span>
          </div>

          <div className="pnp-meal-sections">
            <h2 className="pnp-section-title">Meal Plan Editor</h2>

           {Object.entries(plan.meals || {}).map(([mealType, mealArray], idx) => (
  <div className="pnp-meal-section" key={idx}>
    <div className="pnp-meal-header">
      <div className="pnp-meal-info">
        <h3 className="pnp-meal-title">{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h3>
        <p className="pnp-meal-description">Customize your {mealType} with healthy options.</p>
        <img src={mealImages[mealType] || "/placeholder.svg"} alt={mealType} className="pnp-meal-image" />
      </div>
    </div>

    <div className="pnp-meal-content">
      
      <div className="pnp-meal-items">
        {mealArray.map((meal, idx2) => (
          <div className="pnp-meal-item" key={idx2}>
            {editingMeal && editingMeal.mealType === mealType && editingMeal.index === idx2 ? (
              <div className="pnp-edit-form">
                <input
                  type="text"
                  value={editValues.name}
                  onChange={e => setEditValues(v => ({ ...v, name: e.target.value }))}
                  placeholder="Name"
                />
                <input
                  type="number"
                  value={editValues.calories}
                  onChange={e => setEditValues(v => ({ ...v, calories: e.target.value }))}
                  placeholder="Calories"
                />
                <input
                  type="number"
                  value={editValues.protein}
                  onChange={e => setEditValues(v => ({ ...v, protein: e.target.value }))}
                  placeholder="Protein"
                />
                <input
                  type="number"
                  value={editValues.carbs}
                  onChange={e => setEditValues(v => ({ ...v, carbs: e.target.value }))}
                  placeholder="Carbs"
                />
                <input
                  type="number"
                  value={editValues.fat}
                  onChange={e => setEditValues(v => ({ ...v, fat: e.target.value }))}
                  placeholder="Fat"
                />
                <div className="pnp-edit-actions">
                  <button onClick={saveEdit} className="pnp-save-btn">Save</button>
                  <button onClick={cancelEditing} className="pnp-cancel-btn">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="pnp-item-details">
                  <h4 className="pnp-item-name">{meal.name}</h4>
                  <p className="pnp-item-nutrition">
                    {meal.calories} kcal | {meal.protein}g Protein | {meal.carbs}g Carbs | {meal.fat}g Fat
                  </p>
                </div>
                <div className="pnp-item-actions">
                  <Edit3 className="pnp-edit-icon" onClick={() => startEditing(mealType, idx2)} title="Edit" />
                  <Trash2 className="pnp-delete-icon" onClick={() => deleteMealItem(mealType, idx2)} title="Delete" />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
))}


            <div className="pnp-daily-summary">
              <h3 className="pnp-summary-title">Daily Summary</h3>
              <div className="pnp-summary-grid">
                <div className="pnp-summary-item"><p className="pnp-summary-label">Total Calories</p><p className="pnp-summary-value">{summary.calories} kcal</p></div>
                <div className="pnp-summary-item"><p className="pnp-summary-label">Total Protein</p><p className="pnp-summary-value">{summary.protein}g</p></div>
                <div className="pnp-summary-item"><p className="pnp-summary-label">Total Carbs</p><p className="pnp-summary-value">{summary.carbs}g</p></div>
                <div className="pnp-summary-item"><p className="pnp-summary-label">Total Fats</p><p className="pnp-summary-value">{summary.fat}g</p></div>
              </div>
            </div>

            <div className="pnp-action-buttons">
              <button className="pnp-draft-btn">Save as Draft</button>
              <button className="pnp-publish-btn" onClick={handlePublish}>Publish Plan</button>
            </div>
          </div>
        </div>

        <div className="pnp-sidebar">
          <h3 className="pnp-sidebar-title">Food Library</h3>
          <div className="pnp-search-container">
            <Search className="pnp-search-icon" />
            <input type="text" placeholder="Search for food items" className="pnp-search-input" />
          </div>
          <div style={{ margin: "10px 0" }}>
            <label htmlFor="meal-select" style={{ marginRight: 8, fontWeight: "bold" }}>Choose meal:</label>
            <select id="meal-select" value={selectedMealForAdd} onChange={e => setSelectedMealForAdd(e.target.value)}>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snacks">Snacks</option>
            </select>
          </div>
          <div className="pnp-category-tags">
            {Object.keys(foodLibrary).map(category => (
              <span key={category} className={`pnp-tag ${selectedCategory === category ? "active" : ""}`} onClick={() => setSelectedCategory(category)}>{category}</span>
            ))}
          </div>
          <div className="pnp-food-list">
            {foodLibrary[selectedCategory].map((item, idx) => (
              <div className="pnp-food-item" key={idx}>
                <div className="pnp-food-image">
                  <img src={item.image || "/placeholder.svg?height=48&width=48"} alt={item.name} />
                </div>
                <div className="pnp-food-details">
                  <h4 className="pnp-food-name">{item.name}</h4>
                  <p className="pnp-food-nutrition">{item.calories} kcal | {item.protein}g Protein | {item.carbs}g Carbs | {item.fat}g Fat</p>
                </div>
                <button onClick={() => handleAddFood(item)} className="pnp-add-food-btn-small">Add</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default PatientNutritionPlanPage;
