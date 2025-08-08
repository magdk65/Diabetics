import React from 'react';

const Medication = ({ medications }) => {
  return (
    <div>
      <h2>Medications</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Medication</th><th>Dosage</th><th>Frequency</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medications.map((med, idx) => (
            <tr key={idx}>
              <td>{med.name}</td>
              <td>{med.dosage}</td>
              <td>{med.frequency}</td>
              <td><a href="#">Modify/Remove</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Medication;
