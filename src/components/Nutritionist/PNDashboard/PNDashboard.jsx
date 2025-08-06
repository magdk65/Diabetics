import { useState, useEffect } from "react"
import "../PNDashboard/PNDashboard.css"
import Sidebar_Nut from "../Sidebar_Nut/Sidebar_Nut"

const PNDashboard = () => {
  const [clients, setClients] = useState([])
  const [clientId, setClientId] = useState("")
  const [frequency, setFrequency] = useState("daily")
  const [tip, setTip] = useState("")

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/clients")
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((err) => console.error("Error fetching clients:", err))
  }, [])

  const handleSendTip = async () => {
    if (!clientId || !tip) {
      alert("Please select a client and enter a tip!")
      return
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/send-tip", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ client_id: clientId, frequency, tip }),
      })

      const result = await response.json()

      if (response.ok) {
        alert(result.message)
        setClientId("")
        setFrequency("daily")
        setTip("")
      } else {
        alert(result.message || "Error sending tip")
      }
    } catch (error) {
      console.error("Error sending tip:", error)
    }
  }

  return (
    <div className="pn-dashboard">

      <div className="pn-main">
        <Sidebar_Nut/>
        <div className="pn-content">
          <h1 className="pn-page-title">Send Tips</h1>

          <div className="pn-form">
            <div className="pn-form-group">
              <label className="pn-label">Select a client</label>
              <select className="pn-select" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                <option value="" disabled>Choose</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
            </div>

            <div className="pn-form-group">
              <label className="pn-label">Frequency</label>
              <select className="pn-select" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div className="pn-form-group">
              <label className="pn-label">Tip</label>
              <textarea
                className="pn-textarea"
                placeholder="Enter your nutrition tip here..."
                value={tip}
                onChange={(e) => setTip(e.target.value)}
              />
            </div>
          </div>

          <div className="pn-btn-container">
            <button className="pn-send-btn" onClick={handleSendTip}>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PNDashboard
