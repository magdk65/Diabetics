import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom"; // لإدارة الروابط
import "../ChatApp/ChatApp.css";
import Sidebar from "../Sidbar/Sidbar";
import img1 from '../../../assets/img-coach/Depth 6, Frame 0 (6).png'
export default function ChatApp() {
  const navigate = useNavigate();
  const { patientId } = useParams();

  const [patients, setPatients] = useState([
    { id: 1, name: "Sophia Carter", status: "Online", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Ethan Bennett", status: "Offline", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Olivia Harper", status: "Online", avatar: "/placeholder.svg?height=40&width=40" },
  ]);

  const [messages, setMessages] = useState({
    1: [
      { id: 1, sender: "patient", text: "Hello Doctor!", time: "10:30 AM" },
      { id: 2, sender: "doctor", text: "Hello Sophia, how are you?", time: "10:32 AM" },
    ],
    2: [{ id: 1, sender: "patient", text: "Hi Doc!", time: "9:15 AM" }],
    3: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (patientId) {
      const patient = patients.find((p) => p.id === parseInt(patientId));
      setSelectedPatient(patient || null);
    }
  }, [patientId, patients]);

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    navigate(`/chat/${patient.id}`); // يغير الرابط حسب id
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedPatient) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg = { id: Date.now(), sender: "doctor", text: newMessage, time: currentTime };

    setMessages((prev) => ({
      ...prev,
      [selectedPatient.id]: [...(prev[selectedPatient.id] || []), newMsg],
    }));

    setNewMessage("");
  };

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-app">
      <main className="chat-app__content">
        <Sidebar />

        <div className="chat-flex">
          {/* Sidebar */}
          <aside className="chat-sidebar">
            <div className="chat-sidebar__search">
              <div className="chat-search__wrapper">
                <Search className="chat-search__icon" />
                <input
                  type="search"
                  placeholder="Search"
                  className="chat-search__input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="chat-sidebar__list">
                
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className={`chat-patient ${selectedPatient?.id === patient.id ? "chat-patient--active" : ""}`}
                  onClick={() => handleSelectPatient(patient)}
                >
                  <div className="chat-patient__avatar">
                    <img src={patient.avatar} alt="" />
                  </div>
                  <div className="chat-patient__info">
                    <div className="chat-patient__name">{patient.name}</div>
                    <div className="chat-patient__status">{patient.status}</div>
                  </div>
                  {patient.status === "Online" && (
                    <div className="chat-patient__dot chat-patient__dot--online" />
                  )}
                </div>
              ))}
            </div>
          </aside>

          {/* Chat Window */}
          <section className="chat-window__wrapper">
            {selectedPatient ? (
              <div className="chat-window">
                <div className="chat-window__header">
                  <img src={selectedPatient.avatar} alt="" className="chat-window__avatar" />
                  <div>
                    <div className="chat-window__name">{selectedPatient.name}</div>
                    <div className="chat-window__status">{selectedPatient.status}</div>
                  </div>
                </div>

                <div className="chat-window__messages">
                  {(messages[selectedPatient.id] || []).map((msg) => (
                    <div key={msg.id} className={`chat-message chat-message--${msg.sender}`}>
                      <div className="chat-message__avatar">
                        <img
                          src={msg.sender === "doctor" ? "/placeholder.svg?height=32" : selectedPatient.avatar}
                          alt=""
                        />
                      </div>
                      <div className="chat-message__content">
                        <div className="chat-message__text">{msg.text}</div>
                        <div className="chat-message__time">{msg.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="chat-window__input">
                  <input
                    type="text"
                    className="chat-input"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <button className="chat-send-btn" onClick={handleSendMessage}>Send</button>
                </div>
              </div>
            ) : (
              <div className="chat-placeholder">
                <img src={img1} alt=""/>
                <h2 className="chat-placeholder__title">Select a patient to start chatting</h2>
                <p className="chat-placeholder__subtitle">Your messages will appear here.</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
