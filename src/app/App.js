
import './App.css';
import React, { useState, useEffect } from 'react';
import Vocab from './vocab/Vocab';
import Player from './player/Player';
import Enemy from './enemy/Enemy';

let selecting = true;
let selectMessage = 'Choose a character';

function App() {


  //Initialize character stats state.
  //I'm sure there's a better way to do this (especially with exp and levels)
  //but I'll fix that later.
  const [myHP, setMyHP] = useState(0);
  
  const [myXP, setMyXP] = useState(0);
  const [myLVL, setMyLVL] = useState(0);
  const [charClass, setTheCharClass] = useState('');

  const [theMonster, setTheMonster] = useState({
    "mName": "",
    "mHP": 0,
    "mXP": 0
  });
  
  //Is the question answered correctly? If so, actions.
  const rightOrWrong = (value) => {
    if(value === true){
      let newMonHP = theMonster.mHP;
      newMonHP--;
      setTheMonster(prev => ({
        ...prev, 
        mHP: newMonHP}));
    }else{
      setMyHP(myHP - 1);
    }
  }

  //Character Selection. This can be done better but I'll fix that later.
  //I'd like to incorporate more stats eventually.
  const charClassChange = (selectValue) => {
    if(selectValue.target.value){
      switch(selectValue.target.value){
        case 'warrior':
          selecting = false;
          setTheCharClass('warrior')
          setMyHP(15);
          break;
        case 'rogue':
          selecting = false;
          setTheCharClass('rogue')
          setMyHP(10);
          break;
        case 'wizard':
          selecting = false;
          setTheCharClass('wizard')
          setMyHP(5);
          break;
      }
    }
  }

  // Eventual damage calculations
  // const calculateDamage = () => {
  // }

  //Health loss check. Am I dead?
  useEffect(() => {
    const theHP = myHP;
    if(theHP === 1){
      selecting = true;
      selectMessage = 'You died. Choose a new character.'
      setMyLVL(1);
      setMyXP(0);
     // setTheirHP(0);
    }
  }, [myHP]);



  return (
    <div id="big-container">
      {selecting === true ? (

        <div className="selecting">
          {selectMessage}<br />
          <select name="petclasss" id="class-select" onChange={e => charClassChange(e)}>
              <option value="">--Please choose a class--</option>
              <option value="warrior">Warrior (15hp)</option>
              <option value="rogue">Rogue (10hp)</option>
              <option value="wizard">Wizard (5hp)</option>
          </select>
        </div>

      ) : (

        <div className="top-box">
          <Player 
            myHP={myHP}
            myXP={myXP}
            myLVL={myLVL}
            setMyLVL={setMyLVL}
            charClass={charClass}
          />
          <Enemy 
            theMonster={theMonster}
            setTheMonster={setTheMonster}
            setMyXP={setMyXP}
            myXP={myXP}
          />
          <hr />
          <Vocab 
            rightOrWrong={rightOrWrong}
          />
        </div>

      )}
    </div>
  );
}

export default App;
