import React, { useState, useEffect } from 'react';


const wordlist = require('./vocabdata/n5vocab.json');

export default function Vocab() {
  
  // Target word and random word array
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


  const regenerateWords = () => {
    const theObject = generateRandomWords(1, wordlist);
    setWord(() => theObject);
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
                <span>{index+1} : </span><span>{selectedWord.kana}</span>
              </div>
            );
          })}
        </div>
        <button onClick={regenerateWords}>Generate New Word Set</button>
    </div>
  );
}
