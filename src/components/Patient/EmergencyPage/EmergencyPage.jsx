import { useState } from "react"
import Header from "../Dashboard/Header"
import Sidebar from "../Dashboard/Sidebar"
import '../EmergencyPage/EmergencyPage.css'
const EmergencyPage = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Mom",
      subtitle: "Sophia Clark",
      avatar: "/placeholder.svg?height=48&width=48",
      type: "person",
    },
    {
      id: 2,
      name: "Brother",
      subtitle: "Ethan Carter",
      avatar: "/placeholder.svg?height=48&width=48",
      type: "person",
    },
    {
      id: 3,
      name: "911",
      subtitle: "Emergency Services",
      avatar: null,
      type: "emergency",
    },
  ])

  const [isAlertSending, setIsAlertSending] = useState(false)

  const handleEditContact = (contactId) => {
    console.log(`Edit contact with ID: ${contactId}`)
  }

  const handleAddContact = () => {
    const newContact = {
      id: contacts.length + 1,
      name: "New Contact",
      subtitle: "Contact Details",
      avatar: "/placeholder.svg?height=48&width=48",
      type: "person",
    }
    setContacts([...contacts, newContact])
  }

  const handleSendAlert = () => {
    setIsAlertSending(true)
    console.log("Sending emergency alert...")

    setTimeout(() => {
      setIsAlertSending(false)
      alert("Emergency alert sent successfully!")
    }, 2000)
  }

  const ContactCard = ({ contact, onEdit }) => {
    const [isHovered, setIsHovered] = useState(false)

    const renderAvatar = () => {
      if (contact.type === "emergency") {
        return (
          <div className="contact-avatar phone-avatar">
            <svg className="phone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
        )
      }

      return (
        <div className="contact-avatar">
          <img src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
        </div>
      )
    }

    return (
      <div
        className={`contact-card ${isHovered ? "hovered" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="contact-info">
          {renderAvatar()}
          <div className="contact-details">
            <h3 className="contact-name">{contact.name}</h3>
            <p className="contact-subtitle">{contact.subtitle}</p>
          </div>
        </div>
        <button className="edit-button" onClick={() => onEdit(contact.id)} aria-label={`Edit ${contact.name}`}>
          <svg className="edit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
      </div>
    )
  }

  return (
    <div className="emergency-dashboard">
              <Header />
      <div className="main-content-emerg">
        <Sidebar />
        <main className="main-section-emerg">
          <div className="page-header">
            <h1 className="page-title">Emergency</h1>
            <p className="page-subtitle">
              In case of an emergency, you can quickly alert your contacts and access important information.
            </p>
          </div>

          <div className="contacts-section">
            <div className="section-header">
              <h2 className="section-title">Emergency Contacts</h2>
              <button className="add-contact-btn" onClick={handleAddContact}>
                Add Contact
              </button>
            </div>

            <div className="contacts-list">
              {contacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} onEdit={handleEditContact} />
              ))}
            </div>
          </div>

          <div className="alert-section">
            <h2 className="section-title">Emergency Alert</h2>
            <p className="alert-description">
              Press the button below to send an immediate alert to your emergency contacts. This alert will include your
              current location and a brief message about your situation.
            </p>
            <button
              className={`emergency-alert-btn ${isAlertSending ? "sending" : ""}`}
              onClick={handleSendAlert}
              disabled={isAlertSending}
            >
              {isAlertSending ? "Sending Alert..." : "Send Emergency Alert"}
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default EmergencyPage
