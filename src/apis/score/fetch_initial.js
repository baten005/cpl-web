import React, { useState, useEffect } from "react";
import EditCurrentMatchForm from "./EditCurrentMatch";
import TossForm from "./TossForm";
import SquadForm from "./SquadForm";
import StartMatchForm from "./StartMatchForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../../apis_css/fetchCurrentMatchs.css";

function CurrentMatchList() {
  const [currentMatches, setCurrentMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCurrentMatch, setSelectedCurrentMatch] = useState(null);
  const [showTossForm, setShowTossForm] = useState(false);
  const [showSquadForm, setShowSquadForm] = useState(false);
  const [showStartMatchForm, setShowStartMatchForm] = useState(false);

  const fetchCurrentMatches = async () => {
    try {
      const response = await fetch(
        "https://radshahmat.tech/rest_apis/score_manager/next_match.php"
      );
      const data = await response.json();
      setCurrentMatches(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching CurrentMatches:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentMatches();
  }, []);

  const handleCurrentMatchClick = (currentMatch) => {
    setSelectedCurrentMatch(currentMatch);
  };

  const handleFormClose = () => {
    setSelectedCurrentMatch(null);
    fetchCurrentMatches();
  };

  const handleTossButtonClick = () => {
    setShowTossForm(true);
    setShowSquadForm(false);
    setShowStartMatchForm(false);
  };

  const handleSquadButtonClick = () => {
    setShowTossForm(false);
    setShowSquadForm(true);
    setShowStartMatchForm(false);
  };

  const handleStartMatchButtonClick = () => {
    setShowTossForm(false);
    setShowSquadForm(false);
    setShowStartMatchForm(true);
  };

  return (
    <div className="container mt-5">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row">
          {currentMatches.map((currentMatch) => (
            <div key={currentMatch.fix_id} className="col-md-8 mb-4">
              <div
                className="card h-100"
                onClick={() => handleCurrentMatchClick(currentMatch)}
              >
                <div className="card-body d-flex flex-column align-items-center">
                  <div className="d-flex align-items-center mb-3">
                    <span className="team-name">{currentMatch.teamA_name}</span>
                    <img
                      src={currentMatch.teamA_logo}
                      alt={currentMatch.teamA_name}
                      className="team-logo mr-2"
                    />
                    <span className="vs mx-2">vs</span>
                    <img
                      src={currentMatch.teamB_logo}
                      alt={currentMatch.teamB_name}
                      className="team-logo ml-2"
                    />
                    <span className="team-name">{currentMatch.teamB_name}</span>
                  </div>
                  <div className="text-center">
                    <span className="match-time">{`Starts at ${currentMatch.match_formatted_date}, ${currentMatch.match_formatted_time}`}</span>
                  </div>
                </div>
                <img
                  src={currentMatch.image_add}
                  alt={currentMatch.currentMatch_name}
                  className="card-img-top"
                />
                <div className="card-footer d-flex justify-content-between">
                  <button className="btn btn-warning w-100" onClick={handleTossButtonClick}>Toss</button>
                  <button className="btn btn-primary w-100" onClick={handleSquadButtonClick}>Squad</button>
                  <button className="btn btn-success w-100" onClick={handleStartMatchButtonClick}>Start Match</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
     
      {showTossForm && (
        <div className="form-container">
          <TossForm  onClose={() => setShowTossForm(false)} data={currentMatches}/>
        </div>
      )}
      {showSquadForm && (
        <div className="form-container">
          <SquadForm onClose={() => setShowSquadForm(false)} data={currentMatches}/>
        </div>
      )}
      {showStartMatchForm && (
        <div className="form-container">
          <StartMatchForm onClose={() => setShowStartMatchForm(false)} data={currentMatches}/>
        </div>
      )}
    </div>
  );
}

export default CurrentMatchList;
