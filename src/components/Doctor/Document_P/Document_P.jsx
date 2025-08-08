import React, { useState } from 'react';
import './Document_P.css';
import { Search } from 'lucide-react';
import SidebarCustom from '../SidebarCustom/SidebarCustom';

const Document_P = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [documents] = useState([
    { name: "Blood Test Results", category: "Lab Results", uploadedDate: "2024-07-20", access: "Private" },
    { name: "Medication Prescription", category: "Prescriptions", uploadedDate: "2024-07-15", access: "Shared" },
    { name: "Surgery Consent Form", category: "Consent Forms", uploadedDate: "2024-07-10", access: "Private" },
    { name: "MRI Scan Report", category: "Lab Results", uploadedDate: "2024-07-05", access: "Private" },
    { name: "Physical Therapy Plan", category: "Prescriptions", uploadedDate: "2024-06-30", access: "Shared" }
  ]);

  const tabs = ["All", "Lab Results", "Prescriptions", "Consent Forms"];

  // فلترة حسب التبويب ونص البحث (case-insensitive)
  const filteredDocs = documents.filter(doc => {
    const tabMatch = activeTab === "All" ? true : doc.category === activeTab;
    const searchMatch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    return tabMatch && searchMatch;
  });

  return (
    <div className="docp-container">
      <SidebarCustom/>
      <div className="docp-content">

        <div className="docp-search-box">
          <Search className="docp-search-icon" size={18} />
          <input
            type="text"
            placeholder="Search documents"
            className="docp-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="docp-tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`docp-tab-btn ${activeTab === tab ? 'docp-active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="docp-table-area">
          <div className="docp-table">
            <div className="docp-table-head">
              <div className="docp-th">Document Name</div>
              <div className="docp-th">Category</div>
              <div className="docp-th">Uploaded Date</div>
              <div className="docp-th">Access</div>
            </div>

            {filteredDocs.length > 0 ? (
              filteredDocs.map((doc, index) => (
                <div key={index} className="docp-tr">
                  <div className="docp-td docp-name">{doc.name}</div>
                  <div className="docp-td docp-cat">{doc.category}</div>
                  <div className="docp-td docp-date">{doc.uploadedDate}</div>
                  <div className="docp-td docp-access">
                    <span className={`docp-badge ${doc.access.toLowerCase()}`}>
                      {doc.access}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="docp-tr">
                <div className="docp-td" style={{ textAlign: 'center', width: '100%' }}>
                  No documents found.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Document_P;
