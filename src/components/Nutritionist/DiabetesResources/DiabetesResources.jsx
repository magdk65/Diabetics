import React, { useState } from "react"
import "../DiabetesResources/DiabetesResources.css"
import Cards from './Cards/Cards'
import Sidebar_Nut from "../Sidebar_Nut/Sidebar_Nut"
const DiabetesResources = () => {
  return (
    <div className="resources-page">
      <div className="resources-main">
        <Sidebar_Nut/>
        <div className="flex-resources">
        <div className="resources-header">
          <h1 className="resources-title">Diabetes Education Hub</h1>
          <p className="resources-subtitle">
            Explore categorized resources to manage diabetes effectively.
          </p>
        </div>

        <Cards title="Understanding Diabetes" type="understandingDiabetes" />
        <Cards title="Meal Planning" type="mealPlanning" />
        <Cards title="Recipes" type="recipes" />
        <Cards title="Lifestyle Tips" type="lifestyleTips" />
      </div>
      </div>
    </div>
  )
}

export default DiabetesResources
