import React, { useEffect } from "react";
import "./Scorelist.css";
import axios from "axios";

const Scorelist = () => {
  const [scores, setScores] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/read-history");

      setScores(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="screen">
      <div className="score-list-container">
        <h1 className="title">Previous Results</h1>
        <ul className="score-list">
          {scores.map((score) => (
            <li key={score.id} className="score-item">
              <span className="player-name">{score.message}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Scorelist;
