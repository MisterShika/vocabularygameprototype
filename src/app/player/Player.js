import React, { useState, useEffect } from 'react';

export default function Player({myHP, myLVL, setMyLVL, charClass, myXP}) {
  
    useEffect(() => {
        const theXP = myXP;
        setMyLVL(Math.floor(theXP / 5));
    }, [myXP]);
  
    return (
        <div className="Player">
            Level {myLVL} {charClass}<br />
            Player HP : {myHP}<br />
            Player XP : {myXP}
        </div>
    );
}

