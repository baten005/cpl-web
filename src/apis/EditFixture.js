
import React, { useState } from "react";
import axios from "axios";

function EditfixtureForm({ fixture, onClose, onDataUpdated }) { 
  const [formData, setFormData] = useState({
    fixture_name: fixture.fixture_name,
    image_add: fixture.image_add,
    fixture_Logo: fixture.fixture_logo
  });
  const [loading, loadingScreen1] = useState('Save Changes');
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loadingScreen1('Loading...')
    try {
      const response = await axios.post(
        `https://radshahmat.tech/rest_apis/updatefixtures.php?fixture_id=${fixture.ID}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        loadingScreen1('Done');
        console.log("fixture updated:", response.data);
        onClose();
        onDataUpdated(); 
      } else {
        console.error("Failed to update fixture");
        loadingScreen1('Failed');
      }
    } catch (error) {
      console.error("Failed to update fixture:", error);
      loadingScreen1('Failed');
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit fixture</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="fixtureName" className="form-label">fixture Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="fixtureName"
                  name="fixture_name"
                  value={formData.fixture_name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="fixtureImage" className="form-label">fixture Image URL:</label>
                <input
                  type="text"
                  className="form-control"
                  id="fixtureImage"
                  name="image_add"
                  value={formData.image_add}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="fixtureLogo" className="form-label">fixture Image URL:</label>
                <input
                  type="text"
                  className="form-control"
                  id="fixtureLogo"
                  name="fixture_Logo"
                  value={formData.fixture_Logo}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">{loading}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditfixtureForm;
