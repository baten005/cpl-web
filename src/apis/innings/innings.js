import React, { useState, useEffect } from "react";
import axios from "axios";
import "./batsman.css";
import ScoreCard from "../score/scorecard";

function Innings() {
  const [score, setScore] = useState(null);
  const [wickets, setWickets] = useState(null);
  ////////////////////////////////////////////////////////Batsman Variables//////////////////////
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Batsman1, setBatsman1] = useState([]);
  const [selectedBatsman1, setSelectedBatsman1] = useState([]);
  const [showSelectionForm1, setShowSelectionForm1] = useState(false);
  const [Batsman2, setBatsman2] = useState([]);
  const [selectedBatsman2, setSelectedBatsman2] = useState([]);
  const [showSelectionForm2, setShowSelectionForm2] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response1 = await axios.get(
        "https://radshahmat.tech/rest_apis/score_manager/batsman1.php"
      );
      setBatsman1(response1.data.players);

      const response2 = await axios.get(
        "https://radshahmat.tech/rest_apis/score_manager/batsman2.php"
      );
      setBatsman2(response2.data.players);
      setLoading(false);
      console.log("BatsMan deter",response1,response2)
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    fetchScore();
    fetchData();
  }, []);

  const fetchScore = async () => {
    try {
      const response = await axios.get(
        "https://radshahmat.tech/rest_apis/score_manager/fetch_score.php"
      );
      setScore(response.data[0]);
      setWickets(response.data[1].length)
      console.log("this is score  ",response);
    } catch (error) {
      console.error("Error fetching score:", error);
    }
  };
  function Score() {
    return (
      <div>
        {score ? (
          <div>
            <div>
              {score[0].team_name} : {score[0].runs } / {wickets}
            </div>
            <div>
              Overs : {Math.floor(score[0].bowls / 6)}.{score[0].bowls % 6}
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function Batsman() {
    const handleSubmitBatsman1 = async (e) => {
      e.preventDefault();
      setLoading(false);
      try {
        const response = await axios.post(
          "https://radshahmat.tech/rest_apis/score_manager/select_batsman1.php",
          {
            Batsman: selectedBatsman1,
          }
        );
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          closeSelectionForm();
          fetchData();
        }, 0);
      } catch (error) {
        console.error("Error submitting squad:", error);
        setLoading(false);
      }
    };

    const handleSubmitBatsman2 = async (e) => {
      e.preventDefault();
      setLoading(false);
      try {
        const response = await axios.post(
          "https://radshahmat.tech/rest_apis/score_manager/select_batsman2.php",
          {
            Batsman: selectedBatsman2,
          }
        );
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          closeSelectionForm();
          fetchData();
        }, 0);
      } catch (error) {
        console.error("Error submitting squad:", error);
        setLoading(false);
      }
    };

    const handleBatsman1election = (playerId) => {
      setSelectedBatsman1(playerId);
    };

    const handleBatsman2election = (playerId) => {
      setSelectedBatsman2(playerId);
    };

    const toggleSelectionForm1 = () => {
      setShowSelectionForm1(!showSelectionForm1);
    };

    const toggleSelectionForm2 = () => {
      setShowSelectionForm2(!showSelectionForm2);
    };

    const closeSelectionForm = () => {
      setShowSelectionForm1(false);
      setShowSelectionForm2(false);
    };

    const renderBatsman1electionForm = () => {
      return (
        <div className={`modal ${showSelectionForm1 ? "" : "modal-hidden"}`}>
          <div className="modal-content bat" style={{height:'fit-content'}}>
            <h2>Select Batsman1</h2>
            <form onSubmit={handleSubmitBatsman1}>
              {Batsman1.map((player) => (
                <div key={player.player_id}>
                  <label
                    onClick={() => handleBatsman1election(player.player_id)}
                  >
                    <input
                      type="radio"
                      className="form-check-input"
                      name="player3"
                      value={player.player_id}
                      checked={selectedBatsman1 === player.player_id}
                      onChange={() => {}}
                    />
                    <img src={player.player_image} alt={player.name} />
                    {player.name}
                  </label>
                </div>
              ))}
              <button
                type="submit"
                className="btn btn-success"
                style={{ marginRight: "10px" }}
              >
                {loading ? "Submitting..." : success ? "Success!" : "Submit"}
              </button>
              <button
                className="btn btn-secondary"
                onClick={closeSelectionForm}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      );
    };

    const renderBatsman2electionForm = () => {
      return (
        <div className={`modal ${showSelectionForm2 ? "" : "modal-hidden"}`}>
          <div className="modal-content bat" style={{height:'fit-content'}}>
            <h2>Select Batsman2</h2>
            <form onSubmit={handleSubmitBatsman2}>
              {Batsman2.map((player) => (
                <div key={player.player_id}>
                  <label
                    onClick={() => handleBatsman2election(player.player_id)}
                  >
                    <input
                      type="radio"
                      className="form-check-input"
                      name="player3"
                      value={player.player_id}
                      checked={selectedBatsman2 === player.player_id}
                      onChange={() => {}}
                    />
                    <img src={player.player_image} alt={player.name} />
                    {player.name}
                  </label>
                </div>
              ))}
              <button
                type="submit"
                className="btn btn-success"
                style={{ marginRight: "10px" }}
              >
                {loading ? "Submitting..." : success ? "Success!" : "Submit"}
              </button>
              <button
                className="btn btn-secondary"
                onClick={closeSelectionForm}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      );
    };

    const renderPlayer1Information = () => {
        if (Array.isArray(Batsman1) && Batsman1.length === 1) {
          return (
            <div>
              <h3>
                {Batsman1[0].name} ( {Batsman1[0].runs} ) ( {Batsman1[0].balls_played} )
              </h3>
            </div>
          );
        } else {
          // Handle the case when Batsman2 is not an array or has more than one element
          return <div>All Out</div>;
        }
      };
      
    const renderPlayer2Information = () => {
        if (Array.isArray(Batsman2) && Batsman2.length === 1) {
          return (
            <div>
              <h3>
                {Batsman2[0].name} ( {Batsman2[0].runs} ) ( {Batsman2[0].balls_played} )
              </h3>
            </div>
          );
        } else {
          // Handle the case when Batsman2 is not an array or has more than one element
          return <div>All Out</div>;
        }
      };
      

    const handleExchangeButtonClick = async (e) => {
      e.preventDefault();

      try {
        setLoading(true);
        console.log(Batsman1[0].player_id);
        const response = await axios.post(
          "https://radshahmat.tech/rest_apis/score_manager/change_strike.php",
          {
            Batsman: Batsman1[0].player_id,
          }
        );
        console.log(response);
        setLoading(false);
        if (response) {
          fetchData();
        } else {
          console.error("Exchange failed:", response.data.message);
        }
      } catch (error) {
        console.error("Error exchanging:", error);
        setLoading(false);
      }
    };
console.log(Batsman1,Batsman2)
    return (
      <div>
        {loading && <p>Loading...</p>}

        {((!loading && Batsman1!="O") || (!loading && Batsman2!="O")) && (
          <>
          
            {Batsman1.length === 1 && Batsman1[0].status!=0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ marginRight: "5px" }}>&#9733;</span>
                {renderPlayer1Information()}
              </div>
            )}

            {(Batsman1.length !== 1 || (Batsman1[0].status==0 ))&& (
              <div>
                <button
                  onClick={toggleSelectionForm1}
                  className="btn btn-success"
                >
                  {showSelectionForm1 ? "Close Form" : "Select Batsman1"}
                </button>
                {showSelectionForm1 && renderBatsman1electionForm()}
              </div>
            )}

            <br />
          
            {Batsman2.length === 1 && Batsman2[0].status!=0 && renderPlayer2Information()}

            {(Batsman2.length !== 1 || (Batsman2[0].status==0 )) && (
              <div>
                <button
                  onClick={toggleSelectionForm2}
                  className="btn btn-success"
                >
                  {showSelectionForm2 ? "Close Form" : "Select Batsman2"}
                </button>
                {showSelectionForm2 && renderBatsman2electionForm()}
              </div>
            )}
          </>
        )}
        <div style={{marginTop:'10px'}}>
          <form>
            <button
              id="swap"
              className="btn btn-success"
              onClick={handleExchangeButtonClick}
            >
              <i class="fas fa-exchange-alt"></i>
            </button>
          </form>
        </div>
      </div>
    );
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [success1, setSuccess1] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [Bowler1, setBowler1] = useState([]);
  const [selectedBowler1, setSelectedBowler1] = useState([]);
  const [showSelectionForm3, setShowSelectionForm3] = useState(false);

  const fetchData1 = async () => {
    setLoading1(true);
    try {
      const response1 = await axios.get(
        "https://radshahmat.tech/rest_apis/score_manager/bowler.php"
      );
      
      setBowler1(response1.data.players);
      console.log("bowlers data:  ",Bowler1);
      setLoading1(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading1(false);
    }
  };
  useEffect(() => {
    fetchData1();
  }, []);
  function Bowler() {
    const handleSubmitBowler1 = async (e) => {
      e.preventDefault();
      setLoading1(false);
      try {
        const response = await axios.post(
          "https://radshahmat.tech/rest_apis/score_manager/select_bowler.php",
          {
            Bowler: selectedBowler1,
          }
        );
        setLoading1(false);
        setSuccess1(false);
        setTimeout(() => {
          setSuccess1(false);
          closeSelectionForm();
          fetchData1();
        }, 0);
      } catch (error) {
        console.error("Error submitting squad:", error);
        setLoading1(false);
      }
    };

    const handleBowler1election = (player_id) => {
      setSelectedBowler1(player_id);
    };

    const toggleSelectionForm1 = () => {
      setShowSelectionForm3(!showSelectionForm3);
    };

    const closeSelectionForm = () => {
      setShowSelectionForm3(false);
    };

    const renderBowler1electionForm = () => {
      console.log("Bowler : " + Bowler1);
      return (
        <div className={`modal ${showSelectionForm3 ? "" : "modal-hidden"}`}>
          <div className="modal-content bat" style={{ height: "fit-content" }}>
            <h2>Select Bowler1</h2>
            <form onSubmit={handleSubmitBowler1}>
              {Bowler1.map((player) => (
                <div key={player.player_id}>
                  <label
                    onClick={() => handleBowler1election(player.player_id)}
                  >
                    <input
                      type="radio"
                      className="form-check-input"
                      name="player3"
                      value={player.player_id}
                      checked={selectedBowler1 === player.player_id}
                      onChange={() => {}}
                    />
                    <img src={player.player_image} alt={player.name} />
                    {player.name}
                  </label>
                </div>
              ))}
              <button
                type="submit"
                className="btn btn-success"
                style={{ marginRight: "10px" }}
              >
                {loading1 ? "Submitting..." : success1 ? "Success!" : "Submit"}
              </button>
              <button
                className="btn btn-secondary"
                onClick={closeSelectionForm}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      );
    };

    const renderPlayer1Information = () => {
      return (
        <div>
          {Bowler1.map((player) => (
            <div key={player.player_id}>
              <h3>
                {player.name} <br></br> ({player.runs_given}) ( {player.wickets}{" "}
                ) ({" "}
                {Math.floor(player.overs_bowled / 6) +
                  "." +
                  (player.overs_bowled % 6)}{" "}
                )
              </h3>
            </div>
          ))}
        </div>
      );
    };

    const handleExchangeButtonClick = async (e) => {
      e.preventDefault();

      try {
        setLoading1(true);
        console.log(Bowler1[0].player_id);
        const response = await axios.post(
          "https://radshahmat.tech/rest_apis/score_manager/change_bowler.php",
          {
            Bowler: Bowler1[0].player_id,
          }
        );
        console.log(response);
        setLoading1(false);
        if (response) {
          fetchData1();
        } else {
          console.error("Exchange failed:", response.data.message);
        }
      } catch (error) {
        console.error("Error exchanging:", error);
        setLoading1(false);
      }
    };

    return (
      <div>
        {loading1 && <p>Loading...</p>}

        {!loading1 && (
          <>
            {Bowler1.length === 1 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ marginRight: "5px" }}>&#9733;</span>
                {renderPlayer1Information()}
              </div>
            )}

            {Bowler1.length !== 1 && (
              <div>
                <button
                  onClick={toggleSelectionForm1}
                  className="btn btn-success"
                >
                  {showSelectionForm3 ? "Close Form" : "Select Bowler1"}
                </button>
                {showSelectionForm3 && renderBowler1electionForm()}
              </div>
            )}

            <br />
          </>
        )}
        <div>
          <form>
            <button
              id="swap"
              className="btn btn-success"
              onClick={handleExchangeButtonClick}
            >
              <i class="fas fa-exchange-alt"></i>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        {}
        <div className="col-lg-4 mb-3 ">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title">Score</h2>
              {<Score></Score>}
            </div>
          </div>
        </div>

        {}
        <div className="col-lg-4 mb-3 bat">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title">Batsman Stats</h2>
              {<Batsman></Batsman>}
            </div>
          </div>
        </div>

        {}
        <div className="col-lg-4 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title">Bowlers Stats</h2>
              {<Bowler></Bowler>}
            </div>
          </div>
        </div>
      </div>
      <div>
        <ScoreCard
          FetchScore={fetchScore}
          FetchBatsman={fetchData}
          FetchBowler={fetchData1}
        ></ScoreCard>
      </div>
    </>
  );
}

export default Innings;