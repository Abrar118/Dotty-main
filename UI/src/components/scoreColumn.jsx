import "./scoreColumn.css";

const ScoreColumn = ({ player1, player2 }) => {
	return (
		<div className="score-column">
			<div className="title">
				<h1>DOTTY</h1>
				<h2>VS</h2>
			</div>
			<div className="score-box">
				<span>{player1}</span>
				<span>:</span>
				<span>{player2}</span>
			</div>
		</div>
	);
};

export default ScoreColumn;
