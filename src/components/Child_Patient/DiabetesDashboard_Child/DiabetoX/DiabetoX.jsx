import React, { useState } from "react"
import "../DiabetoX/DiabetoX.css"
import Header_Child from "../Header_Child/Header_Child"

const foodCategories = ["Fruits", "Vegetables", "Proteins", "Grains"]

const foodItems = [
  { name: "Apple", description: "Good for energy", image: "/placeholder.svg?height=200&width=200&text=Apple", category: "Fruits", bgColor: "apple-bg" },
  { name: "Banana", description: "Rich in potassium", image: "/placeholder.svg?height=200&width=200&text=Banana", category: "Fruits", bgColor: "apple-bg" },
  { name: "Broccoli", description: "Rich in vitamins", image: "/placeholder.svg?height=200&width=200&text=Broccoli", category: "Vegetables", bgColor: "broccoli-bg" },
  { name: "Carrot", description: "Good for eyes", image: "/placeholder.svg?height=200&width=200&text=Carrot", category: "Vegetables", bgColor: "broccoli-bg" },
  { name: "Chicken", description: "Helps build muscles", image: "/placeholder.svg?height=200&width=200&text=Chicken", category: "Proteins", bgColor: "chicken-bg" },
  { name: "Tofu", description: "Plant-based protein", image: "/placeholder.svg?height=200&width=200&text=Tofu", category: "Proteins", bgColor: "chicken-bg" },
  { name: "Rice", description: "Provides fiber", image: "/placeholder.svg?height=200&width=200&text=Rice", category: "Grains", bgColor: "rice-bg" },
  { name: "Quinoa", description: "Complete protein grain", image: "/placeholder.svg?height=200&width=200&text=Quinoa", category: "Grains", bgColor: "rice-bg" },
]

const DiabetoX = () => {
  const [activeCategory, setActiveCategory] = useState(foodCategories[0])

  // selectedItems: { Fruits: [ 'Apple', ...], Vegetables: [ ... ] }
  const [selectedItems, setSelectedItems] = useState({})

  const toggleSelect = (itemName) => {
    setSelectedItems((prev) => {
      const currentSelected = prev[activeCategory] || []
      if (currentSelected.includes(itemName)) {
        // إزالة الاختيار
        return {
          ...prev,
          [activeCategory]: currentSelected.filter((n) => n !== itemName),
        }
      } else {
        // إضافة الاختيار
        return {
          ...prev,
          [activeCategory]: [...currentSelected, itemName],
        }
      }
    })
  }

  // تصفية الأكلات حسب الفئة المختارة
  const filteredItems = foodItems.filter((item) => item.category === activeCategory)

  const handleAddMeal = () => {
    const summary = Object.entries(selectedItems)
      .map(
        ([category, items]) =>
          `${category}: ${items.length > 0 ? items.join(", ") : "No items selected"}`
      )
      .join("\n")

    alert(`Your selected meals:\n${summary}`)
  }

  return (
    <div className="app-childs">
        <Header_Child/>
      <main className="main-content-childs">
        <h1 className="page-title">Record Meal</h1>

        {/* تبويبات الفئات */}
        <div className="category-tabs">
          {foodCategories.map((category) => (
            <button
              key={category}
              className={`tab ${activeCategory === category ? "tab-active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* شبكة عرض الأكلات */}
        <div className="food-grid">
          {filteredItems.map((item) => {
            const isSelected = selectedItems[activeCategory]?.includes(item.name)
            return (
              <div
                key={item.name}
                className={`food-card ${isSelected ? "selected" : ""}`}
                onClick={() => toggleSelect(item.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") toggleSelect(item.name)
                }}
              >
                <div className={`food-image-container ${item.bgColor}`}>
                  <img src={item.image} alt={item.name} className="food-image" />
                </div>
                <div className="food-info">
                  <h3 className="food-name">{item.name}</h3>
                  <p className="food-description">{item.description}</p>
                </div>
                <div className="select-indicator">{isSelected ? "✓" : "+"}</div>
              </div>
            )
          })}
        </div>

        {/* زر الإضافة */}
        <button className="add-meal-button" onClick={handleAddMeal}>
          Add Meal
        </button>
      </main>
    </div>
  )
}

export default DiabetoX
