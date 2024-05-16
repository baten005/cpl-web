import React, { useState } from "react";
import axios from "axios";

function EditPlayerForm({ Player, onClose, onDataUpdated }) {
  const [formData, setFormData] = useState({
    Player_name: Player.name,
    team_id: Player.team_id,
    Player_type: Player.player_type,
    player_image: Player.player_image,
    Player_ID: Player.ID,
  });

  const handleChange = (e) => {
    const value =
      e.target.name === "team_id" ? parseInt(e.target.value) : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        `https://radshahmat.tech/rest_apis/updatePlayers.php?player_id=${Player.ID}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Player updated:", response.data);
        onClose();
        onDataUpdated();
      } else {
        console.error("Failed to update Player");
      }
    } catch (error) {
      console.error("Failed to update Player:", error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Player</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="PlayerName" className="form-label">
                  Player Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="PlayerName"
                  name="Player_name"
                  value={formData.Player_name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="PlayerID" className="form-label">
                  Player ID:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="PlayerID"
                  name="Player_ID"
                  value={formData.Player_ID}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="playerType" className="form-label">
                  Player Type:
                </label>
                <select
                  className="form-select"
                  id="playerType"
                  name="Player_type"
                  value={formData.Player_type}
                  onChange={handleChange}
                >
                  <option value="Batsman">Batsman</option>
                  <option value="All-Rounder">All-Rounder</option>
                  <option value="WicketKeeper">WicketKeeper</option>
                  <option value="Bowler">Bowler</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="team" className="form-label">
                  Team:
                </label>
                <select
                  className="form-select"
                  id="team"
                  name="team_id"
                  value={formData.team_id}
                  onChange={handleChange}
                >
                  <option value="">All Teams</option>
                  <option value="1">2nd Derivative</option>
                  <option value="2">CCE Bitlocker</option>
                  <option value="3">Binary Beasts</option>
                  <option value="4">Pentium Predator</option>
                  <option value="5">EEE Electrocutors</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="PlayerImage" className="form-label">
                  Player Image URL:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="PlayerImage"
                  name="player_image"
                  value={formData.player_image}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPlayerForm;
