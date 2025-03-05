import { useEffect, useState } from "react";
import PlayerCircle from "./components/playerCircle";
import ScoreColumn from "./components/scoreColumn";
import playerimage1 from "./assets/player1.jpg";
import playerimage2 from "./assets/player2.jpg";
import "./CurrentScore.css";
import Popup from "./Popup";
import axios from "axios";

function CurrentScore() {
  const player1 = { image: playerimage1, name: "Player1" };
  const player2 = { image: playerimage2, name: "Player2" };
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [winner, setWinner] = useState("");

  const handleWin = (playerName) => {
    setWinner(playerName);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/read-txt-and-update"
      );

      if (response.data.player1 === "3") {
        handleWin("Player 1");
        const res = await axios.post("http://localhost:3001/update-history", {
          message: "Player 1 won",
        });
      } else if (response.data.player2 === "3") {
        handleWin("Player 2");
        const res = await axios.post("http://localhost:3001/update-history", {
          message: "Player 2 won",
        });
      }

      setPlayer1Score(response.data.player1);
      setPlayer2Score(response.data.player2);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 300);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="main-container">
      <PlayerCircle player={player1} />
      <ScoreColumn player1={player1Score} player2={player2Score} />
      <PlayerCircle player={player2} />
      {/* <button type="button" onClick={() => handleWin("Player 1")}>
        Tap
      </button> */}
      <Popup isOpen={isPopupOpen} winner={winner} onClose={closePopup} />
    </div>
  );
}

export default CurrentScore;
