import React, { useState } from "react";
import '../FitnessPlanner/FitnessPlanner.css'
import { Search, Footprints, Dumbbell, Leaf, Sun, Trash2, Edit, Save, PlusCircle } from 'lucide-react';
import Sidebar from "../Sidbar/Sidbar";

function FitnessPlanner() {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [showAddNew, setShowAddNew] = useState(false); // لإظهار/إخفاء نموذج إضافة التمرين الجديد
  const daysOfWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

  const [weekExercises, setWeekExercises] = useState(
    daysOfWeek.map(day => ({ day, exercises: [] }))
  );

  const [allExercises, setAllExercises] = useState([
    { icon: <Footprints />, name: "Brisk Walking", description: "Low impact cardio", type: "Cardio",
      extraData: { duration: "30 min", pace: "5 km/h" }
    },
    { icon: <Dumbbell />, name: "Squats", description: "Lower body strength", type: "Strength",
      extraData: { sets: 3, reps: 10 }
    },
    { icon: <Dumbbell />, name: "Lunges", description: "Leg and glute strength", type: "Strength",
      extraData: { sets: 3, reps: 12 }
    },
    { icon: <Leaf />, name: "Yoga Flow", description: "Flexibility and balance", type: "Flexibility",
      extraData: { duration: "45 min", notes: "Includes Sun Salutation" }
    },
    { icon: <Leaf />, name: "Stretching", description: "Cool down and flexibility", type: "Flexibility",
      extraData: { duration: "20 min" }
    },
    { icon: <Sun />, name: "Meditation", description: "Mindfulness and relaxation", type: "Mindfulness",
      extraData: { duration: "15 min", breathing: "Box Breathing" }
    },
  ]);

  const filteredExercises = allExercises.filter(exercise => {
    const matchCategory = filter ? exercise.type === filter : true;
    const matchSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const addExerciseToDay = (exercise) => {
    if(!selectedDay) return alert("Please select a day first!");
    setWeekExercises(prev =>
      prev.map(day =>
        day.day === selectedDay
          ? { ...day, exercises: [...day.exercises, exercise] }
          : day
      )
    );
  };

  const deleteExercise = (dayName, index) => {
    setWeekExercises(prev =>
      prev.map(day =>
        day.day === dayName
          ? { ...day, exercises: day.exercises.filter((_, i) => i !== index) }
          : day
      )
    );
  };

  const [editingExercise, setEditingExercise] = useState({ day: null, index: null });
  const [editForm, setEditForm] = useState({ name: "", extraData: {} });

  const startEditExercise = (dayName, index, exercise) => {
    setEditingExercise({ day: dayName, index });
    setEditForm({
      name: exercise.name,
      extraData: { ...exercise.extraData }
    });
  };

  const saveEditExercise = () => {
    setWeekExercises(prev =>
      prev.map(day => {
        if (day.day === editingExercise.day) {
          return {
            ...day,
            exercises: day.exercises.map((ex, i) => {
              if (i === editingExercise.index) {
                return {
                  ...ex,
                  name: editForm.name,
                  extraData: { ...editForm.extraData }
                };
              }
              return ex;
            })
          };
        }
        return day;
      })
    );
    setEditingExercise({ day: null, index: null });
  };

  const handleExtraDataChange = (key, value) => {
    setEditForm(prev => ({
      ...prev,
      extraData: {
        ...prev.extraData,
        [key]: value
      }
    }));
  };

  // حالة وإعدادات إضافة تمرين جديد
  const [newExercise, setNewExercise] = useState({
    name: "",
    description: "",
    type: "",
    extraData: {}
  });

  const onNewExerciseTypeChange = (type) => {
    setNewExercise({
      ...newExercise,
      type,
      extraData: getDefaultExtraDataByType(type)
    });
  };

  // دالة تعطي بيانات افتراضية حسب النوع
  const getDefaultExtraDataByType = (type) => {
    switch(type) {
      case "Cardio":
        return { duration: "", pace: "" };
      case "Strength":
        return { sets: "", reps: "" };
      case "Flexibility":
        return { duration: "", notes: "" };
      case "Mindfulness":
        return { duration: "", breathing: "" };
      default:
        return {};
    }
  };

  const handleNewExerciseExtraDataChange = (key, value) => {
    setNewExercise(prev => ({
      ...prev,
      extraData: {
        ...prev.extraData,
        [key]: value
      }
    }));
  };

  // حفظ التمرين الجديد في المكتبة
  const saveNewExercise = () => {
    if (!newExercise.name || !newExercise.type) {
      return alert("Please enter exercise name and select type");
    }

    let icon;
    switch(newExercise.type) {
      case "Cardio": icon = <Footprints />; break;
      case "Strength": icon = <Dumbbell />; break;
      case "Flexibility": icon = <Leaf />; break;
      case "Mindfulness": icon = <Sun />; break;
      default: icon = <Footprints />;
    }

    setAllExercises(prev => [
      ...prev,
      { 
        icon, 
        name: newExercise.name, 
        description: newExercise.description, 
        type: newExercise.type,
        extraData: newExercise.extraData
      }
    ]);
    // تنظيف النموذج
    setNewExercise({ name: "", description: "", type: "", extraData: {} });
    setShowAddNew(false);
  };

  return (
    <div className="fp-container">
        <Sidebar/>
      <main className="fp-main">
        <h1 className="fp-main-title">Create Exercise Plan for Patient: Clara Bennett</h1>

        <div className="fp-week-plan">
          {weekExercises.map(day => (
            <div key={day.day} className="fp-day-card">
              <h3 className="fp-day-title">{day.day}</h3>
              <ul className="fp-day-exercises">
                {day.exercises.map((exercise, i) => (
                  <li key={i} className="fp-exercise-item">
                    {editingExercise.day === day.day && editingExercise.index === i ? (
                      <div className="fp-edit-form">
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                          placeholder="Exercise name"
                        />
                        {Object.entries(editForm.extraData).map(([key, value]) => (
                          <input
                            key={key}
                            type={typeof value === "number" ? "number" : "text"}
                            value={value}
                            onChange={e => handleExtraDataChange(key, e.target.value)}
                            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                            style={{ marginTop: "5px" }}
                          />
                        ))}
                        <button onClick={saveEditExercise} className="fp-save-btn">
                          <Save size={16} /> Save
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="fp-exercise-header">
                          <strong>{exercise.name}  ({exercise.type})</strong> 
                        
                          <div className="fp-exercise-actions">
                            <button onClick={() => startEditExercise(day.day, i, exercise)} className="fp-edit-btn"><Edit size={16} /></button>
                            <button onClick={() => deleteExercise(day.day, i)} className="fp-delete-btn"><Trash2 size={16} /></button>
                          </div>
                        </div>
                        <ul className="fp-exercise-details">
                          {Object.entries(exercise.extraData).map(([key, value]) => (
                            <li key={key}>
                              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="fp-action-buttons">
          <button className="fp-save-btn">Save and Publish</button>
          <button className="fp-draft-btn">Save as Draft</button>
          <button className="fp-cancel-btn">Cancel</button>
        </div>
      </main>
      <aside className="fp-sidebar">
        <div className="fp-search-wrapper">
          <Search className="fp-search-icon" />
          <input
            type="text"
            placeholder="Search exercises"
            className="fp-search-input"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="fp-day-select-wrapper">
          <h2 className="fp-section-title">Select Day</h2>
          <select
            className="fp-day-select"
            value={selectedDay}
            onChange={e => setSelectedDay(e.target.value)}
          >
            <option value="">-- Select a day --</option>
            {daysOfWeek.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        <div>
          <h2 className="fp-section-title">Categories</h2>
          <div className="fp-category-buttons">
            {["Cardio", "Strength", "Flexibility", "Mindfulness"].map(cat => (
              <button
                key={cat}
                className={`fp-category-btn ${filter === cat ? "active" : ""}`}
                onClick={() => setFilter(filter === cat ? "" : cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="fp-section-title">Search Results</h2>
          <div className="fp-search-results">
            {filteredExercises.map((exercise, index) => (
              <div key={index} className="fp-search-item" onClick={() => addExerciseToDay(exercise)}>
                <div className="fp-icon-wrapper">{exercise.icon}</div>
                <div className="fp-search-info">
                  <p className="fp-search-name">{exercise.name}</p>
                  <p className="fp-search-desc">{exercise.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* زر فتح نموذج إضافة تمرين جديد */}
        <button className="fp-add-new-btn" onClick={() => setShowAddNew(!showAddNew)}>
          <PlusCircle size={18} /> {showAddNew ? "Cancel" : "Add New Exercise"}
        </button>

        {/* نموذج إضافة تمرين جديد */}
        {showAddNew && (
          <div className="fp-add-new-form">
            <h3>Add New Exercise</h3>
            <input
              type="text"
              placeholder="Exercise Name"
              value={newExercise.name}
              onChange={e => setNewExercise({ ...newExercise, name: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={newExercise.description}
              onChange={e => setNewExercise({ ...newExercise, description: e.target.value })}
            />
            <select
              value={newExercise.type}
              onChange={e => onNewExerciseTypeChange(e.target.value)}
            >
              <option value="">-- Select Type --</option>
              <option value="Cardio">Cardio</option>
              <option value="Strength">Strength</option>
              <option value="Flexibility">Flexibility</option>
              <option value="Mindfulness">Mindfulness</option>
            </select>

            {/* الحقول الخاصة حسب النوع */}
            {Object.entries(newExercise.extraData).map(([key, value]) => (
              <input
                key={key}
                type={typeof value === "number" ? "number" : "text"}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={value}
                onChange={e => handleNewExerciseExtraDataChange(key, e.target.value)}
                style={{ marginTop: 5 }}
              />
            ))}

            <button onClick={saveNewExercise} className="fp-save-btn" style={{ marginTop: 10 }}>
              <Save size={16} /> Save Exercise
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

export default FitnessPlanner;
