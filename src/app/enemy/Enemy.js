import React, { useState, useEffect } from 'react';
import './enemy.css';

export default function Enemy({setMyXP, myXP, theMonster, setTheMonster}) {

    
    //Temporary function for monster variety
    const createMonster = (playerLevel) => {
        const tempVar = playerLevel;
        const monsterChoice = Math.floor(Math.random() * 5);
        console.log(monsterChoice);
        switch(monsterChoice){
            case 0:
                setTheMonster({
                    "mName": "Snake",
                    "mArt" : "snake",
                    "mHP": 2,
                    "mXP": 2
                });
                break;
            case 1:
                setTheMonster({
                    "mName": "Rat",
                    "mArt" : "rat",
                    "mHP": 3,
                    "mXP": 3
                });
                break;
            case 2:
                setTheMonster({
                    "mName": "Bear",
                    "mArt" : "bear",
                    "mHP": 4,
                    "mXP": 4
                });
                break;
            case 3:
                setTheMonster({
                    "mName": "Wolf",
                    "mArt" : "wolf",
                    "mHP": 5,
                    "mXP": 5
                });
                break; 
            case 4:
                setTheMonster({
                    "mName": "Seagull",
                    "mArt" : "seagull",
                    "mHP": 6,
                    "mXP": 6
                });
                break;   
          }
    }

    //Create monster on load
    useEffect(() => {
        createMonster(1);
    }, []);

    //Enemy health check. Are they dead?
    useEffect(() => {
        const monHP = theMonster.mHP;
        if(monHP < 1){
            setMyXP(myXP + theMonster.mXP)
            createMonster(1);
        }
    }, [theMonster.mHP]);

  
    return (
        <div className="enemy">
            <div className={`monster-image-box ${theMonster.mArt}`}></div>
            Monster: {theMonster.mName}<br />
            HP: {theMonster.mHP}
        
        </div>
    );
}