import React, { useState, useEffect } from "react";
import EditTeamForm from "./EditTeam";
import "../apis_css/fetchTeams.css";

function TeamList() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const fetchTeams = async () => {
    try {
      const response = await fetch(
        "https://radshahmat.tech/rest_apis/getteams.php"
      );
      const data = await response.json();
      setTeams(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching teams:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  const handleFormClose = () => {
    setSelectedTeam(null);
    fetchTeams();
  };

  return (
    <div className="container mt-5">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team.ID} className="col-md-4 mb-4">
              <div className="position-relative">
                <img
                  src={team.image_add}
                  alt={team.team_name}
                  className="team-image"
                  onClick={() => handleTeamClick(team)}
                />
                <div className="team-overlay">
                  <img
                    src={team.team_logo}
                    style={{
                      backgroundColor: "rgba(0,0,0,.8)",
                      padding: "5px",
                      borderRadius: "5px",
                      height: "50px",
                      width:"50px",
                      objectFit:"cover",
                      borderRadius: "25px",
                      position: "absolute",
                      top: "0",
                      left: "0",
                    }}
                  />
                </div>
                <div className="team-overlay">
                  <h5
                    className="text-white position-absolute bottom-0 mb-3 ml-3"
                    style={{
                      backgroundColor: "rgba(0,0,0,.8)",
                      padding: "10px",
                      borderRadius: "5px",
                      height: "fit-content",
                      marginLeft:"1rem"
                    }}
                  >
                    {team.team_name}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedTeam && (
        <div className="edit-team-form">
          <EditTeamForm
            team={selectedTeam}
            onClose={handleFormClose}
            onDataUpdated={fetchTeams}
          />
        </div>
      )}
    </div>
  );
}

export default TeamList;
