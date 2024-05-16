import React, { useState, useEffect } from "react";
import CurrentMatchList from "../apis/score/fetch_initial";
import EditCurrentMatch from "../apis/score/EditCurrentMatch";
import det from "../apis/score/det";

function ManageScore() {
    const [matchRunning, setMatchRunning] = useState(false);

    useEffect(() => {
        async function checkMatchStatus() {
            const isMatchRunning = await det();
            setMatchRunning(isMatchRunning === 1);
        }
        checkMatchStatus();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            checkMatchStatus();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const checkMatchStatus = async () => {
        const isMatchRunning = await det();
        setMatchRunning(isMatchRunning === 1);
    };

    return (
        <div style={{ textAlign: "center" }}>
            <p>This is the score tab</p>
            {matchRunning ? <EditCurrentMatch /> : <CurrentMatchList />}
        </div>
    );
}

export default ManageScore;
