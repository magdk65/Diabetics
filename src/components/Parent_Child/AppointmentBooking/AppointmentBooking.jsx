"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Bell } from "lucide-react"
import "../AppointmentBooking/AppointmentBooking.css"
import Sidebar from "../Sidbar/Sidbar"

const AppointmentBooking = () => {
  const [doctor, setDoctor] = useState({
    id: 1,
    name: "Dr. John Doe",
    specialty: "Endocrinologist",
    experience: "10 years experience",
    avatar: "/placeholder.svg?height=96&width=96",
    about: "Expert in diabetes management with 10 years of experience.",
    location: "Children's Hospital, 123 Health Ave",
    phone: "(555) 123-4567",
    email: "john.doe@health.com",
  })

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [nextMonth, setNextMonth] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [bookedSlots, setBookedSlots] = useState({})

  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"]

  useEffect(() => {
    const next = new Date(currentMonth)
    next.setMonth(next.getMonth() + 1)
    setNextMonth(next)


    fetchBookedSlots()
  }, [])

  const fetchBookedSlots = async () => {
    try {
      const res = await fetch("/api/booked-slots")
      if (!res.ok) throw new Error("Failed to fetch booked slots")
      const data = await res.json()
      setBookedSlots(data)
    } catch (err) {
      console.error(err)
    }
  }

  const getMonthDays = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()

    const startDay = firstDay.getDay()

    let calendar = []
    let dayCounter = 1
    for (let week = 0; week < 6; week++) {
      let weekDays = []
      for (let d = 0; d < 7; d++) {
        if (week === 0 && d < startDay) {
          weekDays.push(null)
        } else if (dayCounter > daysInMonth) {
          weekDays.push(null)
        } else {
          weekDays.push(dayCounter)
          dayCounter++
        }
      }
      calendar.push(weekDays)
    }
    return calendar
  }

  const formatDateKey = (year, month, day) => {
    const mm = (month + 1).toString().padStart(2, "0")
    const dd = day.toString().padStart(2, "0")
    return `${year}-${mm}-${dd}`
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const handleDateSelect = (year, month, day) => {
    const dateObj = new Date(year, month, day)
    dateObj.setHours(0, 0, 0, 0)
    if (dateObj < today) return

    setSelectedDate(formatDateKey(year, month, day))
    setSelectedTime(null)
  }

  const isTimeBooked = (dateKey, time) => {
    if (!bookedSlots[dateKey]) return false
    return bookedSlots[dateKey].includes(time)
  }

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time first.")
      return
    }
    try {
      const res = await fetch("/api/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: selectedDate, time: selectedTime }),
      })
      if (!res.ok) throw new Error("Failed to book appointment")
      alert("Appointment booked successfully!")

      setBookedSlots((prev) => {
        const updated = { ...prev }
        if (!updated[selectedDate]) updated[selectedDate] = []
        updated[selectedDate].push(selectedTime)
        return updated
      })
      setSelectedDate(null)
      setSelectedTime(null)
    } catch (err) {
      alert("This slot is already booked or an error occurred.")
      console.error(err)
    }
  }

  const renderCalendarMonth = (date) => {
    const calendar = getMonthDays(date)
    const year = date.getFullYear()
    const month = date.getMonth()
    const monthName = date.toLocaleString("default", { month: "long", year: "numeric" })

    return (
      <div className="calendar-month" key={`${year}-${month}`}>
        <div className="calendar-header--app">
          <h3 className="month-title">{monthName}</h3>
        </div>
        <div className="calendar-grid">
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <div key={day} className="calendar-day-header">
              {day}
            </div>
          ))}
          {calendar.flat().map((day, idx) => {
            if (!day) return <div key={idx} className="calendar-day-cell empty"></div>

            const dateObj = new Date(year, month, day)
            dateObj.setHours(0, 0, 0, 0)

            const isPastDay = dateObj < today
            const dateKey = formatDateKey(year, month, day)
            const isSelected = selectedDate === dateKey

            return (
              <div
                key={idx}
                className={`calendar-day-cell ${
                  isSelected ? "selected-day-cell" : ""
                } ${isPastDay ? "disabled-day-cell" : ""}`}
                onClick={() => {
                  if (!isPastDay) handleDateSelect(year, month, day)
                }}
                style={{ cursor: isPastDay ? "not-allowed" : "pointer" }}
                title={isPastDay ? "Cannot select past date" : ""}
              >
                <div className={`calendar-day ${isSelected ? "selected" : ""}`}>
                  {day}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="appointment-container">
        <Sidebar/>
      <div className="main-content--App">
        <div className="content-left">
          <h1 className="page-title">Book Appointment with {doctor.name}</h1>

          <div className="calendar-container-app">
            {renderCalendarMonth(currentMonth)}
            {nextMonth && renderCalendarMonth(nextMonth)}
          </div>

          <div className="time-slots-section">
            <h3 className="section-title">Available Times</h3>
            {selectedDate ? (
              <div className="time-slots">
                {timeSlots.map((time) => {
                  const disabled = isTimeBooked(selectedDate, time)
                  return (
                    <div
                      key={time}
                      className={`time-slot ${selectedTime === time ? "selected" : ""} ${
                        disabled ? "disabled" : ""
                      }`}
                      onClick={() => !disabled && setSelectedTime(time)}
                      style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                    >
                      {time} {disabled && "(Booked)"}
                    </div>
                  )
                })}
              </div>
            ) : (
              <p>Please select a date first.</p>
            )}
          </div>
        </div>

        <div className="sidebar">
          <div className="doctor-profile">
            <div className="doctor-avatar">
              <img src={doctor.avatar} alt={doctor.name} />
            </div>
            <h3 className="doctor-name">{doctor.name}</h3>
            <p className="doctor-specialty">{doctor.specialty}</p>
            <p className="doctor-experience">{doctor.experience}</p>
          </div>

          <div className="info-section">
            <h4 className="info-title">About</h4>
            <p className="info-text">{doctor.about}</p>
          </div>

          <div className="info-section">
            <h4 className="info-title">Location</h4>
            <p className="info-text">{doctor.location}</p>
          </div>

          <div className="info-section">
            <h4 className="info-title">Contact</h4>
            <p className="info-text">
              Phone: {doctor.phone}
              <br />
              Email: {doctor.email}
            </p>
          </div>

          <button
            className="book-button"
            onClick={handleBooking}
            disabled={!selectedDate || !selectedTime}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  )
}

export default AppointmentBooking
