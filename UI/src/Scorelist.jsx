import React from 'react';
import './Scorelist.css';

const Scorelist = () => {
    const scores=[
        {id:1, player1:'John',player2:'Alice',result: 'Alice won'},
        {id:2, player1:'John',player2:'Alice',result: 'Alice won'},
        {id:3, player1:'John',player2:'Alice',result: 'Alice won'},
        {id:4, player1:'John',player2:'Alice',result: 'Alice won'},
    ];

    return (
        <div className='screen'>

<div className='score-list-container'>
         <h1 className='title'>Previous Results</h1>
         <ul className='score-list'>
            {scores.map((score) => (
                <li key={score.id} className='score-item'>
                    <span className='player-name'>
                        {score.player1} VS {score.player2}
                    </span>
                    <span className='player-score'>
                        {score.result}
                    </span>
                </li>
            ))}
         </ul>

        </div>
        </div>
        
    );
};

export default Scorelist;