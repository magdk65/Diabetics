import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, Edit3, Trash2 } from "lucide-react" 
import '../NutMeal/NutMeal.css'
import Sidebar_Nut from "../Sidebar_Nut/Sidebar_Nut"
import { useParams } from "react-router-dom";

export default function NutMeal() {
  const navigate = useNavigate()
   const { nutId, id } = useParams();  
   const { planId } = useParams();
  const [plans, setPlans] = useState([
    { id: 1, name: "Low Carb Plan", description: "Focuses on reducing carbohydrate intake", created_at: "2024-01-15" },
    { id: 2, name: "High Protein Plan", description: "Emphasizes protein-rich foods", created_at: "2024-02-20" },
    { id: 3, name: "Vegan Plan", description: "Excludes all animal products", created_at: "2024-03-10" },
  ])

  // حذف خطة
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return
    setPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id))
  }

  return (
    <div className="app-container--NUMeal-p">
      <div className="main-content--NUMeal-p">
        <Sidebar_Nut/>
        <div className="flex-NUMeal-ppp">
        <h1 className="main-title--NUMeal-p">Meal Plans Library</h1>
        <div className="table-container--NUMeal-p">
          <table className="table--NUMeal-p">
            <thead className="table-header--p">
              <tr>
                <th className="table-head--NUMeal-p">Name</th>
                <th className="table-head--NUMeal-p">Description</th>
                <th className="table-head--NUMeal-p">Creation Date</th>
                <th className="table-head--NUMeal-p">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {plans.map((plan) => (
<tr key={plan.id} className="table-row--p">
  <td className="table-cell name">{plan.name}</td>
  <td className="table-cell">{plan.description}</td>
  <td className="table-cell">{plan.created_at}</td>
  <td className="table-cell actions-cell">
    <button
      className="btn-view"
      onClick={() => navigate(`/NutritionPlanCreatorPage/view/${plan.id}`)}
    >
      <Eye size={18} />
    </button>
    <button
      className="btn-edit"
      onClick={() => navigate(`/NutritionPlanCreatorPage/edit/${plan.id}`)}
    >
      <Edit3 size={18} />
    </button>
    <button className="btn-delete" onClick={() => handleDelete(plan.id)}>
      <Trash2 size={18} />
    </button>
  </td>
</tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="create-plan-button" onClick={() => navigate("/meal-plans/create")}>
          Create New Plan
        </button>
      </div>
      </div>
    </div>
  )
}
