import React, { useState } from "react";
import RadioButton from "./RadioButton";
import styles from "./CustomScoreCard.module.css";
import axios from "axios";

function CustomScoreCard({ onClose, onDataFetch }) {
  const [selectedRun, setSelectedRun] = useState(0);
  const [bys, setBys] = useState(false);
  const [wides, setWides] = useState(false);
  const [noBalls, setNoBalls] = useState(false);
  const [wickets, setWickets] = useState("null");
  const handleRunClick = (run) => {
    setSelectedRun(run);
  };

  const handleButtonClick = (type) => {
    switch (type) {
      case "by":
        setBys(!bys);
        break;
      case "wide":
        setWides(!wides);
        break;
      case "no-ball":
        setNoBalls(!noBalls);
        break;
      default:
        break;
    }
  };

  const handleWicketSelect = (event) => {
    setWickets(event.target.value);
  };

  const handleSubmit = async () => {
    console.log("Submitted:", selectedRun, bys, wides, noBalls, wickets);
    const response = await axios.post(
      "https://radshahmat.tech/rest_apis/score_manager/update_everything.php",
      {
        Runs: selectedRun,
        By: bys,
        Wide: wides,
        Wicket: wickets,
        NoBowl: noBalls,
      }
    );
    console.log(response);
    onDataFetch();
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={styles.wrapper} >
      <div className={styles.container} style={{height:'fit-content',padding:'3rem'}}>
        <div className={styles.runs}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((run) => (
            <RadioButton
              key={run}
              value={run}
              selected={selectedRun === run}
              onClick={handleRunClick}
            />
          ))}
        </div>

        <div className={styles.buttonsContainer}>
          <div className={styles.formButtons}>
            <button
              className={bys ? "btn btn-danger" : "btn btn-primary"}
              onClick={() => handleButtonClick("by")}
              style={{ width: "6.5rem", marginRight: "6px" }}
            >
              BY
            </button>
            <button
              className={wides ? "btn btn-danger" : "btn btn-primary"}
              onClick={() => handleButtonClick("wide")}
              style={{ width: "6.5rem", marginRight: "6px" }}
            >
              Wd
            </button>
            <button
              className={noBalls ? "btn btn-danger" : "btn btn-primary"}
              onClick={() => handleButtonClick("no-ball")}
              style={{ width: "6.5rem", marginRight: "6px" }}
            >
              Nb
            </button>
            <select
              className={
                wickets == "null" ? "btn btn-primary" : "btn btn-danger"
              }
              onChange={handleWicketSelect}
              style={{ width: "6.5rem" }}
            >
              <option value="null">Wk</option>
              <option value="1">Striker</option>
              <option value="2">Non Striker</option>
            </select>
          </div>
          <div className={styles.formButtons} style={{ marginTop: "10px" }}>
            <button
              className="btn btn-success"
              onClick={handleSubmit}
              style={{ marginRight: "8px", width: "5rem", marginLeft: "7px" }}
            >
              Submit
            </button>
            <button
              className="btn btn-danger"
              onClick={handleClose}
              style={{ marginRight: "8px", width: "5rem" }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomScoreCard;
