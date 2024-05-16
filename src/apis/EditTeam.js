

import React, { useState } from "react";
import axios from "axios";

function EditTeamForm({ team, onClose, onDataUpdated }) { 
  const [formData, setFormData] = useState({
    team_name: team.team_name,
    image_add: team.image_add,
    team_Logo: team.team_logo
  });
  const [loading, loadingScreen1] = useState('Save Changes');
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loadingScreen1('Loading...')
    try {
      const response = await axios.post(
        `https://radshahmat.tech/rest_apis/updateTeams.php?team_id=${team.ID}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        loadingScreen1('Done');
        console.log("Team updated:", response.data);
        onClose();
        onDataUpdated(); 
      } else {
        console.error("Failed to update team");
        loadingScreen1('Failed');
      }
    } catch (error) {
      console.error("Failed to update team:", error);
      loadingScreen1('Failed');
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Team</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="teamName" className="form-label">Team Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="teamName"
                  name="team_name"
                  value={formData.team_name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="teamImage" className="form-label">Team Image URL:</label>
                <input
                  type="text"
                  className="form-control"
                  id="teamImage"
                  name="image_add"
                  value={formData.image_add}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="teamLogo" className="form-label">Team Image URL:</label>
                <input
                  type="text"
                  className="form-control"
                  id="teamLogo"
                  name="team_Logo"
                  value={formData.team_Logo}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">{loading}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTeamForm;
