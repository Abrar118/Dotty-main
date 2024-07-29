import { useEffect, useState } from "react";
import PlayerCircle from "./components/playerCircle";
import ScoreColumn from "./components/scoreColumn";
import playerimage1 from "./assets/player1.jpg";
import playerimage2 from "./assets/player2.jpg";
import "./App.css";

function App() {
	const player1 = { image: playerimage1, name: "Waliza" };
	const player2 = { image: playerimage2, name: "Nishat" };
	const [player1Score, setPlayer1Score] = useState(0);
	const [player2Score, setPlayer2Score] = useState(0);

  useEffect(() => {
   
  }, []);

	return (
		<div className="main-container">
			<PlayerCircle player={player1} />
			<ScoreColumn player1={player1Score} player2={player2Score} />
			<PlayerCircle player={player2} />
		</div>
	);
}

export default App;
