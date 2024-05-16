import React, { useState } from "react";
import axios from "axios";

function TossForm({ onClose, data }) {
  const [selectedTeam, setSelectedTeam] = useState(data[0].teamA_id);
  const [selectedDecision, setSelectedDecision] = useState("Bat");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
console.log(selectedTeam)
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const requestData = {
        selectedTeam: selectedTeam,
        selectedDecision: selectedDecision
      };
    console.log(requestData)
      const response = await axios.post(`https://radshahmat.tech/rest_apis/score_manager/toss.php?match_id=${data[0].fix_id}`, requestData);
       setLoading(false);
       setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000); 
    
        console.log(response)
    
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };
  return (
    <div className="form-container">
      <div className="form">
        <h2>Toss Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Team</label>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="form-control"
            >
              <option value={data[0].teamA_id}>{data[0].teamA_name}</option>
              <option value={data[0].teamB_id}>{data[0].teamB_name}</option>
            </select>
          </div>
          <div className="form-group">
            <label>Decision</label>
            <select
              value={selectedDecision}
              onChange={(e) => setSelectedDecision(e.target.value)}
              className="form-control"
            >
              <option value="bat">Bat</option>
              <option value="bowl">Bowl</option>
            </select>
          </div>
          <br></br>
          <button type="submit" className="btn btn-primary">
            {loading ? "Loading..." : success ? "Success!" : "Submit"}
          </button>{" "}
          <button type="button" className="btn btn-danger" onClick={handleClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default TossForm;
