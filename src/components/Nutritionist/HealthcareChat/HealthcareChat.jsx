import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // مهم جدًا
import { Search, Paperclip } from "lucide-react";
import "./HealthcareChat.css";
import img1 from '../../../assets/img/Screenshot_2025-07-05_230814-removebg-preview 1.png';
import img2 from '../../../assets/img/Depth 4, Frame 1.png';

const HealthcareChat = () => {
  const [doctor, setDoctor] = useState({
    name: "Dr. Liam Harper",
    avatar: "https://via.placeholder.com/32",
  });

  const [notes, setNotes] = useState([
    {
      id: 1,
      content:
        "Chloe's blood work shows improved cholesterol levels. Continue with the current nutritional plan.",
      date: "03/15/2024, 10:30 AM",
    },
  ]);

  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Chloe Bennett",
      avatar: img2,
      preview: "Hi Dr. Evelyn, I've been feeling much better...",
      messages: [
        {
          sender: "patient",
          content: "Hi Dr. Evelyn, I've been feeling much better since we adjusted my diet...",
          timestamp: "10:30 AM",
          avatar: img2,
        },
        {
          sender: "doctor",
          content: "That's great to hear, Chloe! Keep up the good work...",
          timestamp: "10:35 AM",
          avatar: doctor.avatar,
        },
      ],
    },
  ]);

  const [activeConversationId, setActiveConversationId] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  const handleSend = () => {
    if (!newMessage.trim()) return;

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId
          ? {
              ...conv,
              messages: [
                ...conv.messages,
                {
                  sender: "doctor",
                  content: newMessage,
                  timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  avatar: doctor.avatar,
                },
              ],
            }
          : conv
      )
    );
    setNewMessage("");
  };

  return (
    <div className="chat-app">
      {/* ✅ Top header مرتب */}
      <nav className="top-nav--chat">
        <div className="nav-content--chat">
          <img src={img1} alt="Logo" className="nav-logo--chat" />

          <div className="nav-links--chat">
            <Link to="/nutrdashboard" className="nav-item--chat">Dashboard</Link>
            <Link to="/patientslistpage" className="nav-item--chat">Patients</Link>
            <Link to="/nutmeal" className="nav-item--chat">Nutrition Plans</Link>
            <Link to="/healthcarechat" className="nav-item--chat active--chat">Communication</Link>
            <Link to="/reports" className="nav-item--chat">Reports</Link>
          </div>

          <div className="nav-actions">
            <div className="avatar">
              <img src={doctor.avatar} alt="Doctor" />
            </div>
          </div>
        </div>
      </nav>

      <div className="felx-chat">
        <div className="chat-sidebar">
          <div className="chat-search">
            <Search className="chat-search-icon" />
            <input
              type="text"
              placeholder="Search conversations"
              className="chat-search-input"
            />
          </div>
          <div className="chat-list">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`chat-item ${
                  activeConversationId === conv.id ? "active" : ""
                }`}
                onClick={() => setActiveConversationId(conv.id)}
              >
                <img src={conv.avatar} alt={conv.name} className="chat-item-avatar" />
                <div className="chat-item-info">
                  <div className="chat-item-name">{conv.name}</div>
                  <div className="chat-item-preview">{conv.preview}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* محتوى المحادثة */}
        <div className="chat-content">
          <div className="chat-header">
            Communication with {activeConversation?.name}
          </div>

          <div className="chat-note">
            <div className="chat-note-title">Notes from {doctor.name}</div>
            <div className="chat-note-text">{notes[0]?.content}</div>
            <div className="chat-note-time">{notes[0]?.date}</div>
          </div>

          <div className="chat-messages">
            {activeConversation?.messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message ${
                  msg.sender === "doctor" ? "doctor" : "patient"
                }`}
              >
                {msg.sender === "patient" && (
                  <img src={msg.avatar} alt="avatar" className="chat-msg-avatar" />
                )}
                <div
                  className={`chat-bubble ${
                    msg.sender === "doctor" ? "doctor-bubble" : "patient-bubble"
                  }`}
                >
                  <p>{msg.content}</p>
                  <span className="chat-time">{msg.timestamp}</span>
                </div>
                {msg.sender === "doctor" && (
                  <img src={msg.avatar} alt="avatar" className="chat-msg-avatar" />
                )}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="chat-input-field"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />
            <button className="chat-attach-btn" title="Attach file">
              <Paperclip className="chat-attach-icon" />
            </button>
            <button onClick={handleSend} className="chat-send-btn">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthcareChat;
