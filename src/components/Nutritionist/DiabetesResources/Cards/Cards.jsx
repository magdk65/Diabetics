import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
const Cards = ({ title, type }) => {
  const navigate = useNavigate()

  // 🔹 كل الكروت لكل قسم في useState واحد مجمع
  const [cardsData] = useState({
    understandingDiabetes: [
      { id: 1, icon: "🩺", title: "What is Diabetes?", description: "Learn about types of diabetes.", link: "/resources/understanding/what-is-diabetes" },
      { id: 2, icon: "📱", title: "Monitoring Blood Sugar", description: "Importance of checking blood sugar.", link: "/resources/understanding/monitoring-blood-sugar" },
      { id: 3, icon: "💉", title: "Insulin & Medication", description: "Basics of insulin therapy.", link: "/resources/understanding/insulin-medication" },
    ],
    mealPlanning: [
      { id: 1, icon: "🥗", title: "Balanced Diet", description: "Principles of a balanced diet.", link: "/resources/meal-planning/balanced-diet" },
      { id: 2, icon: "⚖️", title: "Portion Control", description: "Importance of controlling portions.", link: "/resources/meal-planning/portion-control" },
      { id: 3, icon: "📝", title: "Create Your Meal Plan", description: "Steps to create your plan.", link: "/resources/meal-planning/create-meal-plan" },
    ],
    recipes: [
      { id: 1, icon: "🥗", title: "Healthy Salads", description: "Tasty and healthy salads.", link: "/resources/recipes/healthy-salads" },
      { id: 2, icon: "🍲", title: "Nutritious Soups", description: "Low-carb warm soups.", link: "/resources/recipes/nutritious-soups" },
      { id: 3, icon: "🍳", title: "Quick Stir-Fries", description: "Easy stir-fry meals.", link: "/resources/recipes/quick-stir-fries" },
    ],
    lifestyleTips: [
      { id: 1, icon: "🏃", title: "Exercise & Activity", description: "Benefits of exercise.", link: "/resources/lifestyle/exercise-activity" },
      { id: 2, icon: "🧘", title: "Stress Management", description: "Manage stress effectively.", link: "/resources/lifestyle/stress-management" },
      { id: 3, icon: "😴", title: "Healthy Sleep", description: "Importance of enough sleep.", link: "/resources/lifestyle/healthy-sleep" },
    ],
  })

  const handleCardClick = (link) => navigate(link)

  return (
    <section className="resources-section">
      <h2 className="resources-section-title">{title}</h2>
      <div className="resources-grid">
        {cardsData[type].map((card) => (
          <div
            key={card.id}
            className="resources-card"
            onClick={() => handleCardClick(card.link)}
          >
            <div className="resources-card-content">
              <div className="resources-card-icon">
                <span>{card.icon}</span>
              </div>
              <h3 className="resources-card-title">{card.title}</h3>
              <p className="resources-card-desc">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Cards
