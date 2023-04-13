import React, { useState, useEffect } from 'react';
import './player.css';

export default function Player({myHP, myLVL, setMyLVL, charClass, myXP}) {
  
    useEffect(() => {
        const theXP = myXP;
        setMyLVL(Math.floor(theXP / 5));
    }, [myXP]);
  
    return (
        <div className="player">
            <div className={`hero-image-box ${charClass}`}></div>
            Level {myLVL} {charClass}<br />
            Player HP : {myHP}<br />
            Player XP : {myXP}
        </div>
    );
}

