import React, { useState, useEffect } from 'react';


const wordlist = require('./vocabdata/n5vocab.json');

export default function Vocab() {
  
  // Target word and random word array, and hp setting
  const [word, setWord] = useState({
    "id": "",
    "jlpt": "",
    "vocab": "",
    "kana": "",
    "meaning": "",
    "type": "",
    "furigana": ""
  });
  const [selection, setSelection] = useState([]);
  const [myHP, setMyHP] = useState(100);
  const [theirHP, setTheirHP] = useState(100);
  
  // Generates X number of words based on number and array
  const generateRandomWords = (number, wordArray) => {
    // Return one object
    if(number === 1){
      let wordPos = Math.floor(Math.random() * wordArray.length);
      return wordArray[wordPos];
    }
    // Return an array of objects
    const returnedArray = [];
    for(let i = 0; i < number; i++){
      let wordPos = Math.floor(Math.random() * wordArray.length);
      returnedArray.push(wordArray[wordPos]);
    }
    return returnedArray;
  };

  //Generic shuffle function
  const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  //Set new target word and, consequently, 4 additional words.
  const regenerateWords = () => {
    const theObject = generateRandomWords(1, wordlist);
    setWord(() => theObject);
  }


  //Choosing a word effects
  const chooseWord = (targetID) => {
    const theWordID = word.id;
    if(targetID === theWordID){
      setTheirHP(theirHP - 1);
      regenerateWords();
    }else{
      setMyHP(myHP - 1);
      regenerateWords();
    }
  }


  //Initialize target word
  useEffect(() => {
    regenerateWords()
  }, []);

  //Initialize other words by taking target word and copying it into the selection state
  useEffect(() => {
    let theWords = generateRandomWords(4, wordlist)
    const targetWord = word
    theWords.push(targetWord)
    theWords = shuffle(theWords)
    setSelection(theWords)
  }, [word]);

  return (
    <div className="Vocab">
        <div className="word-box">
          Word: {word.vocab}
        </div>
        <hr />
        <div className="test-box">
            {selection.map((selectedWord, index) => {
            return (
              <div key={index}>
                <span>{index+1} : </span><button onClick={() => chooseWord(selectedWord.id)}>{selectedWord.kana}</button>
              </div>
            );
          })}
        </div>
       <hr />
        <div className="player-hp">
            <span>Player HP: {myHP}</span>
        </div>
        <div className="enemy-hp">
            <span>Enemy HP: {theirHP}</span>
        </div>
    </div>
  );
}
