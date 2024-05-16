import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState } from 'react';
import ManageScore from '../navigation/ManageScore';
import ManageTeams from '../navigation/ManageTeams';
import ManagePlayers from '../navigation/ManagePlayers';
import ManageFixture from '../navigation/ManageFixture';
import ManageMatches from '../navigation/ManageMatches';

import "./sideBar.css";
function Sidebar() {

  const [activeView, setActiveView] = useState('score'); // Default active view

  const handleNavigation = (view) => {
    setActiveView(view);
  };

  // Render the appropriate component based on the activeView state
  const renderView = () => {
    switch (activeView) {
      case 'score':
        return <ManageScore />;
      case 'teams':
        return <ManageTeams />;
      case 'players':
        return <ManagePlayers />;
      case 'fixture':
        return <ManageFixture />;
      case 'matches':
        return <ManageMatches />;
      default:
        return null;
    };
  };
  return (
    <>
      <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasWithBackdrop"
        aria-labelledby="offcanvasWithBackdropLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasWithBackdropLabel">
            CSE Premere League.
          </h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body" id="admin_sidebar">
        <div className="d-flex flex-column">
  <div className="row">
    <div className="col-auto mb-2">
      <button onClick={() => handleNavigation('score')} className="btn btn-success btn-fixed-width" data-bs-dismiss="offcanvas">Manage Score <i className="fas fa-arrow-right"></i></button>
    </div>
  </div>
  <div className="row">
    <div className="col-auto mb-2">
      <button onClick={() => handleNavigation('teams')} className="btn btn-success btn-fixed-width" data-bs-dismiss="offcanvas">Manage Teams <i className="fas fa-arrow-right"></i></button>
    </div>
  </div>
  <div className="row">
    <div className="col-auto mb-2">
      <button onClick={() => handleNavigation('players')} className="btn btn-success btn-fixed-width" data-bs-dismiss="offcanvas">Manage Players <i className="fas fa-arrow-right"></i></button>
    </div>
  </div>
  <div className="row">
    <div className="col-auto mb-2">
      <button onClick={() => handleNavigation('fixture')} className="btn btn-success btn-fixed-width" data-bs-dismiss="offcanvas">Manage Fixture <i className="fas fa-arrow-right"></i></button>
    </div>
  </div>
  <div className="row">
    <div className="col-auto mb-2">
      <button onClick={() => handleNavigation('matches')} className="btn btn-success btn-fixed-width" data-bs-dismiss="offcanvas">Manage Matches <i className="fas fa-arrow-right"></i></button>
      

    </div>
  </div>
</div>

        </div>
      </div>
      {renderView()}
    </>
  );
}
export default Sidebar ;
