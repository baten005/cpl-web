import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../apis_css/squadForm.css";

function SquadForm({ onClose, data }) {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState({});
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const matchId = data[0].fix_id;
  const teamAId = data[0].teamA_id;
  const teamBId = data[0].teamB_id;

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const responseA = await axios.get(
          `https://radshahmat.tech/rest_apis/allplayer.php?team_id=${teamAId}`
        );
        const responseB = await axios.get(
          `https://radshahmat.tech/rest_apis/allplayer.php?team_id=${teamBId}`
        );

        const allPlayers = {
          [teamAId]: responseA.data,
          [teamBId]: responseB.data,
        };

        setPlayers(allPlayers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching players:", error);
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [teamAId, teamBId]);

  const handlePlayerSelection = (playerId, teamId) => {
    const isSelected = selectedPlayers[teamId]?.includes(playerId);

    if (isSelected) {
      const filteredPlayers = selectedPlayers[teamId].filter(
        (id) => id !== playerId
      );
      setSelectedPlayers({ ...selectedPlayers, [teamId]: filteredPlayers });
    } else {
      const updatedPlayers = {
        ...selectedPlayers,
        [teamId]: [...(selectedPlayers[teamId] || []), playerId],
      };
      setSelectedPlayers(updatedPlayers);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(matchId,selectedPlayers)
    try {
      const response = await axios.post("https://radshahmat.tech/rest_apis/score_manager/squad.php", {
        matchId,
        squad: selectedPlayers,
      });
      console.log(response)
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting squad:", error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="form-container">
      <div className="form">
        <h2>Squad Form</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="teams-container">
              {Object.keys(players).map((teamId) => (
                <div key={teamId} className="team">
                  <h3>
                    Team{" "}
                    {teamId == teamAId
                      ? data[0].teamA_name
                      : data[0].teamB_name}
                    {selectedPlayers[teamId] && (
                      <span>({selectedPlayers[teamId].length}/{players[teamId].length})</span>
                    )}
                  </h3>
                  <div className="player-list">
                    {players[teamId].map((player, index) => (
                      <label key={player.ID} className="player form-check">
                        <input
                          type="checkbox"
                          name={player.ID}
                          value={player.ID}
                          className="form-check-input"
                          onChange={() =>
                            handlePlayerSelection(player.ID, teamId)
                          }
                        />
                        {index + 1}.<img src={player.player_image} alt="Player" /> {player.name}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              {loading ? "Loading..." : success ? "Success!" : "Submit"}
            </button>{" "}
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleClose}
            >
              Close
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default SquadForm;
