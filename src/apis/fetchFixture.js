import React, { useState, useEffect } from "react";
import EditFixtureForm from "./EditFixture";
import "../apis_css/fetchfixtures.css";

function FixtureList() {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFixture, setSelectedFixture] = useState(null);

  const fetchFixtures = async () => {
    try {
      const response = await fetch(
        "https://radshahmat.tech/rest_apis/get_fixtures.php"
      );
      const data = await response.json();
      setFixtures(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching fixtures:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFixtures();
  }, []);

  const handleFixtureClick = (fixture) => {
    setSelectedFixture(fixture);
  };

  const handleFormClose = () => {
    setSelectedFixture(null);
    fetchFixtures();
  };

  return (
    <div className="container mt-5">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row">
          {fixtures.map((fixture) => (
            <div key={fixture.fix_id} className="col-md-4 mb-4">
              <div className="card h-100 d-flex flex-column justify-content-between" onClick={() => handleFixtureClick(fixture)}>
                <div className="card-body d-flex flex-column align-items-center">
                  <div className="d-flex align-items-center mb-3">
                    <img src={fixture.teamA_logo} alt={fixture.teamA_name} className="team-logo mr-2" />
                    <span className="team-name">{fixture.teamA_name}</span>
                    <span className="vs mx-2">vs</span>
                    <span className="team-name">{fixture.teamB_name}</span>
                    <img src={fixture.teamB_logo} alt={fixture.teamB_name} className="team-logo ml-2" />
                  </div>
                  <div className="text-center">
                    <span className="match-time">{`Starts at ${fixture.match_formatted_date}, ${fixture.match_formatted_time}`}</span>
                  </div>
                </div>
                <img
                  src={fixture.image_add}
                  alt={fixture.fixture_name}
                  className="card-img-top"
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedFixture && (
        <div className="edit-fixture-form">
          <EditFixtureForm
            fixture={selectedFixture}
            onClose={handleFormClose}
            onDataUpdated={fetchFixtures}
          />
        </div>
      )}
    </div>
  );
}

export default FixtureList;
