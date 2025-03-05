import './playerCircle.css';
const PlayerCircle = ({ player }) => {
  return (
    <div className="player-circle">
      <img src={player.image} alt={player.name} />
      <p>{player.name}</p>
    </div>
  );
};

export default PlayerCircle;