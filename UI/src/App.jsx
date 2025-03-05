import React from "react";
import "./App.css";
<<<<<<< Updated upstream
import CurrentScore from "./CurrentScore";
import Scorelist from "./Scorelist";
import NavBar from "./components/navbar";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';

function App() {

	return (
		<Router>
			<NavBar/>
			<Routes>
               <Route path="/" element={<CurrentScore/>} />
               <Route path="/currentscore" element={<CurrentScore/>} />
               <Route path="/scorelist" element={<Scorelist/>} />
			</Routes>
			
		</Router>
	);
=======
import axios from "axios";

function App() {
  const player1 = { image: playerimage1, name: "Player 1" };
  const player2 = { image: playerimage2, name: "Player 2" };
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/read-txt-and-update"
      );
      setPlayer1Score(response.data.player1);
      setPlayer2Score(response.data.player2);
      console.log(response.data);
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
    </div>
  );
>>>>>>> Stashed changes
}

export default App;
