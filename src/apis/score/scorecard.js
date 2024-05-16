import './scorecard.css';
import * as Icon from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import CustomScoreCard from './customScoreCard';
import axios from 'axios';

function ScoreCard({ FetchScore, FetchBatsman, FetchBowler }) {
  const [first_inn, setFirstInn] = useState(0);
  const [formShow, setFormShow] = useState(false);
  const [formShow1, setFormShow1] = useState(false);

  useEffect(() => {
    fetchStat();
  }, []);

  useEffect(() => {
    
    console.log('First Innings Value Changed:', first_inn);
  }, [first_inn]); 

  const fetchStat = async () => {
    try {
      const response1 = await axios.get(
        "https://radshahmat.tech/rest_apis/score_manager/innings_stat.php"
      );
      setFirstInn(response1.data.success); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFormShow = () => {
    setFormShow(true);
  };

  const handleFormShow1 = () => {
    setFormShow1(true);
  };

  const handleCloseForm = () => {
    setFormShow(false);
  };

  const handleCloseForm1 = () => {
    setFormShow1(false);
  };

  const handleDataReload = () => {
    FetchScore();
    FetchBatsman();
    FetchBowler();
    fetchStat();
  };

  const handleEndFirstInnings = async () => {
    handleCloseForm();
    try {
      const response = await axios.post(`https://radshahmat.tech/rest_apis/score_manager/finish_firstInn.php?innings=${first_inn}`);
      console.log('innings break', response);
    } catch (error) {
      console.error("Error ending first innings:", error);
    }
    handleCloseForm1();
    handleDataReload();

    if (first_inn === 2) {
      window.location.reload(); 
    }
  };

  return (
    <div>
      <button
        onClick={handleFormShow}
        style={{ borderRadius: "50%",height:'10rem',width:'10rem',margin:'1rem 1rem 0 0' }}
        className="btn btn-success s_btn"
      >
        <Icon.PlusCircle size={96} />
      </button>
      <button
        onClick={handleFormShow1}
        style={{ borderRadius: "50%",height:'10rem',width:'10rem',margin:'1rem 0 0 0' }}
        className="btn btn-danger s_btn"
      >
        {first_inn === 0 && ''}{first_inn === 1 && 'End First Innings'}{first_inn === 2 && 'End Second Innings'} <Icon.ArrowRight size={30} />
      </button>
      {formShow1 && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              width: "300px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h3>{first_inn === 0 ? '' : (first_inn === 1 ? 'Are you sure you want to finish the first innings?' : 'Are you sure you want to finish the Second innings?')}</h3>
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
              <button onClick={handleEndFirstInnings} className="btn btn-primary">
                Yes
              </button>
              <button onClick={handleCloseForm1} className="btn btn-secondary">
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {formShow && (
        <CustomScoreCard
          onClose={handleCloseForm}
          onDataReload={handleDataReload}
          onDataFetch={handleDataReload}
        />
      )}
    </div>
  );
}

export default ScoreCard;
