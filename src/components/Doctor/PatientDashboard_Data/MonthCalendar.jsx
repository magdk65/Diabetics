import React from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const MonthCalendar = ({ year, month, title, selected, appointmentDays = [] }) => {
  const { weeks, labels } = buildMonth(year, month)

  return (
    <div className="cal-table-cal">
      <div className="cal-table-head">
        <button className="cal-table-navBtn" aria-label="Previous month">
          <ChevronLeft size={16} />
        </button>
        <div className="cal-table-title">{title ?? `${monthName(month)} ${year}`}</div>
        <button className="cal-table-navBtn" aria-label="Next month">
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="cal-table-grid">
        {labels.map((d, index) => (
          <div key={`${d}-${index}`} className="cal-table-label">{d}</div>
        ))}

        {weeks.flat().map((cell, idx) => {
          if (!cell) return <div key={idx} />;

          const isSelected = !!selected && selected.year === year && selected.month === month && selected.day === cell.day;
          const hasAppointment = appointmentDays.includes(cell.day);

          return (
            <div key={idx} className="cal-table-cell">
              <button
                className={`cal-table-day 
                  ${isSelected ? "cal-table-daySelected" : ""} 
                  ${hasAppointment ? "cal-table-dayWithAppointment" : ""}`}
                aria-pressed={isSelected}
              >
                {cell.day}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MonthCalendar

function buildMonth(year, month) {
  const first = new Date(year, month, 1)
  const startDay = first.getDay() // 0 Sun
  const days = new Date(year, month + 1, 0).getDate()
  const cells = Array(startDay).fill(null).concat(Array.from({ length: days }, (_, i) => ({ day: i + 1 })))
  while (cells.length % 7 !== 0) cells.push(null)
  const weeks = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  const labels = ["S", "M", "T", "W", "T", "F", "S"]
  return { weeks, labels }
}

function monthName(m) {
  return [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ][m]
}
