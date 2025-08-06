import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../EditNutrition_Dashboard/EditNutrition_Dashboard.css";
import Sidebar_Nut from "../Sidebar_Nut/Sidebar_Nut";

// بيانات تجريبية مؤقتة
const patientsData = [
  { id: "1", name: "Ethan Bennett" },
  { id: "2", name: "Chloe Carter" },
  { id: "3", name: "Liam Harper" },
  { id: "4", name: "Ava Thompson" },
  { id: "5", name: "Noah Walker" },
];

const EditNutrition_Dashboard = () => {
  const { id } = useParams();

  const [planTitle, setPlanTitle] = useState("Modify Current Plan");
  const [tempPlanTitle, setTempPlanTitle] = useState(planTitle);
  const [patientName, setPatientName] = useState("Loading...");
  const [createdOn, setCreatedOn] = useState("July 15, 2024");

  useEffect(() => {
    const patient = patientsData.find(p => p.id === id);
    if (patient) {
      setPatientName(patient.name);
    } else {
      setPatientName("Unknown Patient");
    }
  }, [id]);

  const [meals, setMeals] = useState({
    breakfast: [
      {
        name: "Oatmeal with Berries",
        description: "1 cup oatmeal, 1/2 cup mixed berries, 1 tbsp almonds",
        image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=120&h=80&fit=crop&crop=center",
      },
    ],
    lunch: [
      {
        name: "Grilled Chicken Salad",
        description: "4 oz grilled chicken, 2 cups mixed greens, 1/4 avocado, 2 tbsp vinaigrette",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=120&h=80&fit=crop&crop=center",
      },
    ],
    dinner: [
      {
        name: "Baked Salmon with Quinoa",
        description: "4 oz baked salmon, 1/2 cup quinoa, 1 cup steamed broccoli",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=120&h=80&fit=crop&crop=center",
      },
    ],
    snacks: [
      {
        name: "Apple Slices with Almond Butter",
        description: "1 apple, 2 tbsp almond butter",
        image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=120&h=80&fit=crop&crop=center",
      },
    ],
  });

  const [foodLibrary] = useState([
    {
      name: "Avocado Toast",
      description: "1 slice whole grain bread, 1/2 avocado",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=120&h=80&fit=crop&crop=center",
    },
    {
      name: "Fruit Smoothie",
      description: "1 banana, 1 cup milk, 1/2 cup strawberries",
      image: "https://images.unsplash.com/photo-1589308078050-0287b5e8c598?w=120&h=80&fit=crop&crop=center",
    },
    {
      name: "Boiled Eggs",
      description: "2 boiled eggs, pinch of salt",
      image: "https://images.unsplash.com/photo-1604908177531-03012ac8f16c?w=120&h=80&fit=crop&crop=center",
    },
  ]);

  const [editingMeal, setEditingMeal] = useState({ type: "", index: null });
  const [selectedMealType, setSelectedMealType] = useState("breakfast");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSave = () => {
    setPlanTitle(tempPlanTitle);
    alert("Changes Saved ✅");
  };

  const handleMealChange = (mealType, index, field, value) => {
    const updatedMeals = { ...meals };
    updatedMeals[mealType][index][field] = value;
    setMeals(updatedMeals);
  };

  const handleAddFood = (foodItem) => {
    const updatedMeals = { ...meals };
    updatedMeals[selectedMealType].push({ ...foodItem });
    setMeals(updatedMeals);
  };

  const handleImageUpload = (mealType, index, file) => {
    if (!file) return;
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      alert("❌ Only PNG, JPG, JPEG images are allowed!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      handleMealChange(mealType, index, "image", e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const filteredLibrary = foodLibrary.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const triggerSearch = () => {
    setSearchTerm(searchTerm.trim());
  };

  return (
    <div className="editnutri-container">
      <Sidebar_Nut />
      <div className="editnutri-layout">
        <div className="editnutri-main-content">
          <div className="editnutri-content-wrapper">
            <div className="editnutri-form-group">
              <h1>{planTitle}</h1>
              <label className="editnutri-form-label">Plan Title</label>
              <input
                type="text"
                value={tempPlanTitle}
                onChange={(e) => setTempPlanTitle(e.target.value)}
                className="editnutri-form-input"
              />
            </div>
            <p className="editnutri-patient-info">Patient: {patientName}</p>
            <p className="editnutri-created-date">Created on: {createdOn}</p>

            {Object.keys(meals).map((mealType) => (
              <section key={mealType} className="editnutri-meal-section">
                <h2 className="editnutri-meal-title">
                  {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                </h2>

                {meals[mealType].map((meal, idx) => (
                  <div key={idx} className="editnutri-meal-card">
                    {editingMeal.type === mealType && editingMeal.index === idx ? (
                      <div className="editnutri-meal-content">
                        <input
                          className="editnutri-form-input"
                          value={meal.name}
                          onChange={(e) =>
                            handleMealChange(mealType, idx, "name", e.target.value)
                          }
                        />
                        <input
                          className="editnutri-form-input"
                          value={meal.description}
                          onChange={(e) =>
                            handleMealChange(mealType, idx, "description", e.target.value)
                          }
                        />
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/jpg"
                          className="editnutri-form-input"
                          onChange={(e) =>
                            handleImageUpload(mealType, idx, e.target.files[0])
                          }
                        />
                        <button
                          className="editnutri-btn-outline"
                          onClick={() => setEditingMeal({ type: "", index: null })}
                        >
                          Done
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="editnutri-meal-content">
                          <h3 className="editnutri-meal-name">{meal.name}</h3>
                          <p className="editnutri-meal-description">{meal.description}</p>
                          <button
                            className="editnutri-edit-btn"
                            onClick={() => setEditingMeal({ type: mealType, index: idx })}
                          >
                            Edit
                          </button>
                        </div>
                        <img
                          src={meal.image}
                          alt={meal.name}
                          className="editnutri-meal-img"
                        />
                      </>
                    )}
                  </div>
                ))}
              </section>
            ))}

            <div className="editnutri-action-buttons">
              <button type="button" className="editnutri-btn-outline">
                Cancel
              </button>
              <button
                type="button"
                className="editnutri-btn-primary"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <aside className="editnutri-sidebar">
        <div className="editnutri-sidebar-content">
          <h3 className="editnutri-food-library-title">Food Library</h3>

          <div className="editnutri-form-group">
            <label className="editnutri-form-label">Select Meal Type</label>
            <select
              className="editnutri-form-input"
              value={selectedMealType}
              onChange={(e) => setSelectedMealType(e.target.value)}
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snacks">Snacks</option>
            </select>
          </div>

          <div className="editnutri-form-group search-wrapper">
            <input
              type="text"
              placeholder="Search food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="editnutri-form-input"
            />
            <button
              type="button"
              className="editnutri-search-btn"
              onClick={triggerSearch}
            >
              🔍
            </button>
          </div>

          <div className="editnutri-food-items">
            {filteredLibrary.map((food, idx) => (
              <div key={idx} className="editnutri-meal-card1">
                <div className="felx-img222">
                  <div className="editnutri-meal-content1">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="editnutri-meal-img"
                      loading="lazy"
                    />
                    <h3 className="editnutri-meal-name1">{food.name}</h3>
                  </div>
                  <p className="editnutri-meal-description">{food.description}</p>
                </div>
                <button
                  className="editnutri-edit-btn"
                  onClick={() => handleAddFood(food)}
                >
                  + Add to {selectedMealType}
                </button>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default EditNutrition_Dashboard;
