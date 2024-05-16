import React, { useState, useEffect } from "react";
import EditPlayerForm from "./EditPlayer";
import "../apis_css/fetchplayers.css";

function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  const fetchPlayers = async () => {
    try {
      const response = await fetch(
        "https://radshahmat.tech/rest_apis/all_players_web.php"
      );
      const data = await response.json();
      setPlayers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Players:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const handleFormClose = () => {
    setSelectedPlayer(null);
    fetchPlayers(); 
  };

  const filteredPlayers = players.filter((player) => {
    const matchesSearchTerm = player.ID.toString().includes(searchTerm);
    const matchesTeam = selectedTeam === "" || parseInt(player.team_id) === parseInt(selectedTeam);
    return matchesSearchTerm && matchesTeam;
  });
  
  

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex mb-3">
        <input
          type="text"
          placeholder="Search by ID..."
          className="form-control mr-2 flex-grow-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "50%", marginRight:"50px" }} // Set width to 70%
        />
        <select
          value={selectedTeam}
          onChange={handleTeamChange}
          className="form-control"
          style={{ width: "30%" }} // Set width to 30%
        >
          <option value="">All Teams</option>
          <option value="1">2nd Derivative</option>
          <option value="2">CCE Bitlocker</option>
          <option value="3">Binary Beasts</option>
          <option value="4">Pentium Predator</option>
          <option value="5">EEE Electrocutors</option>
        </select>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row">
          {filteredPlayers.map((player) => (
            <div key={player.ID} className="col-md-4 mb-4">
              <div className="position-relative">
                <img
                  src={player.player_image}
                  alt={player.player_name}
                  className="player-image"
                  style={{
                    width:"100%",
                    height:"250px",
                    objectFit:"cover"
                  }}
                  onClick={() => handlePlayerClick(player)}
                />
                <div className="player-overlay">
                  <h5
                    className="text-white position-absolute bottom-0 mb-3 ml-3"
                    style={{
                      backgroundColor: "rgba(0,0,0,.8)",
                      padding: "5px",
                      borderRadius: "5px",
                      marginLeft:'2rem'
                    }}
                  >
                    {player.name}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedPlayer && (
        <div className="edit-Player-form">
          <EditPlayerForm Player={selectedPlayer} onClose={handleFormClose} onDataUpdated={fetchPlayers} />
        </div>
      )}
    </div>
  );
}

export default PlayerList;