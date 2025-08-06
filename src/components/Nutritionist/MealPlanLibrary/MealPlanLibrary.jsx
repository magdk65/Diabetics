import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../MealPlanLibrary/MealPlanLibrary.css";
import Sidebar_Nut from "../Sidebar_Nut/Sidebar_Nut";

export default function MealPlanLibrary() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [mealPlans, setMealPlans] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // بيانات ثابتة مؤقتاً مع وجبات
    setMealPlans([
      {
        id: 1,
        title: "Balanced Diet Plan",
        description:
          "A comprehensive plan focusing on balanced macronutrient intake for general health and well-being.",
        image: "/placeholder.svg?height=120&width=200",
        meals: {
          breakfast: [{ name: "Oatmeal with berries", calories: 200, protein: 10, carbs: 30, fat: 5 }],
          lunch: [{ name: "Grilled chicken salad", calories: 400, protein: 30, carbs: 20, fat: 10 }],
          dinner: [{ name: "Baked salmon", calories: 350, protein: 25, carbs: 10, fat: 20 }],
          snacks: [{ name: "Almonds", calories: 100, protein: 4, carbs: 4, fat: 9 }],
        },
      },
      {
        id: 2,
        title: "Low-Carb Plan",
        description:
          "Designed to reduce carbohydrate intake, promoting weight loss and improved blood sugar control.",
        image: "/placeholder.svg?height=120&width=200",
        meals: {
          breakfast: [{ name: "Boiled eggs", calories: 150, protein: 12, carbs: 1, fat: 10 }],
          lunch: [{ name: "Grilled chicken with greens", calories: 350, protein: 28, carbs: 5, fat: 12 }],
          dinner: [{ name: "Beef steak with salad", calories: 450, protein: 35, carbs: 4, fat: 18 }],
          snacks: [{ name: "Cheese sticks", calories: 120, protein: 8, carbs: 1, fat: 9 }],
        },
      },
      {
        id: 3,
        title: "High-Protein Plan",
        description: "Focuses on increasing protein intake to support muscle growth and satiety.",
        image: "/placeholder.svg?height=120&width=200",
        meals: {
          breakfast: [{ name: "Protein shake", calories: 250, protein: 30, carbs: 10, fat: 5 }],
          lunch: [{ name: "Turkey sandwich", calories: 400, protein: 35, carbs: 30, fat: 10 }],
          dinner: [{ name: "Grilled chicken breast", calories: 300, protein: 40, carbs: 5, fat: 8 }],
          snacks: [{ name: "Greek yogurt", calories: 120, protein: 12, carbs: 8, fat: 3 }],
        },
      },
    ]);
  }, []);

  const handleSelectPlan = (plan) => {
  if (!patientId) {
    alert("Patient ID is missing!");
    return;
  }
  // ننتقل لصفحة إنشاء الخطة مع تمرير خطة مختارة في state
  navigate(`/patient/${patientId}/create-plan`, { state: { selectedPlan: plan, patientName: "Olivia Bennett" } });
};

  // تصفية القوائم حسب البحث
  const filteredPlans = mealPlans.filter(
    (plan) =>
      plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="meal-library-container">
      <Sidebar_Nut />
      <main className="meal-library-main">
        <div className="meal-library-header">
          <h1 className="meal-library-title">Select Plan from Library</h1>
          <p className="meal-library-description">
            Browse and select a meal plan template from the library to apply to the current patient.
          </p>
        </div>

        <div className="meal-library-search">
          <input
            type="text"
            placeholder="Search meal plans..."
            className="meal-library-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="meal-library-section">
          <h2 className="meal-library-section-title">Meal Plan Templates</h2>
          <div className="meal-library-list">
            {filteredPlans.length > 0 ? (
              filteredPlans.map((plan, index) => (
                <div key={index} className="meal-library-card">
                  <div className="meal-library-card-content">
                    <h3 className="meal-library-card-title">{plan.title}</h3>
                    <p className="meal-library-card-description">{plan.description}</p>
                    <button className="meal-library-select-btn" onClick={() => handleSelectPlan(plan)}>
                      Select
                    </button>
                  </div>
                  <div className="meal-library-card-image-container">
                    <img src={plan.image || "/placeholder.svg"} alt={plan.title} className="meal-library-card-image" />
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: "#667582" }}>No meal plans match your search.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
