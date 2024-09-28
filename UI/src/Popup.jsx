import React from 'react';
import './Popup.css';

const Popup=({isOpen,winner,onClose}) => {
    if (!isOpen) return null;
    return(
        <div className='popup-overlay' onClick={onClose}>
            <div className='popup-content' onClick={(e) => e.stopPropagation()}>
            <h2 className='popup-title'>Congratulations!!!</h2>
            <p className='popup-message'>{winner} has won!</p>
            <button className='popup-button' onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Popup;