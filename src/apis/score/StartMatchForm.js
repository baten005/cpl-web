import React, { useState } from "react";
import axios from "axios";
import det from "./det";

function StartMatchForm({ onClose, data }) {
    const [isMatchRunning, setIsMatchRunning] = useState(false);

    const handleClose = () => {
        onClose();
    };

    const handleConfirm = async () => {
        try {
            const response = await axios.post(`https://radshahmat.tech/rest_apis/score_manager/start_match.php?match_id=${data[0].fix_id}`);
            if (response.status === 200) {
                const matchFlag = await det();
                setIsMatchRunning(matchFlag === 1);
                onClose();
            }
        } catch (error) {
            console.error("Error starting match:", error);
        }
    };

    return (
        <div className="form-container">
            <div className="form">
                <h2>Start Match Form</h2>
                <p>Are you sure you want to start the match?</p>
                <button className="btn btn-success" onClick={handleConfirm} style={{ marginRight: "5px" }}>Confirm</button>
                <button className="btn btn-danger" onClick={handleClose}>Close</button>
            </div>
        </div>
    );
}

export default StartMatchForm;
