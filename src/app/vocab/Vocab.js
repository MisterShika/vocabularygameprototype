import React, { useState, useEffect, lazy } from 'react';

//const wordlist = lazy(() => import('./vocabdata/wordlist.json'));

const wordlist = require('./vocabdata/n5vocab.json');

export default function Vocab() {
  
  
  const [word, setWord] = useState(  {
    "id": "",
    "jlpt": "",
    "vocab": "",
    "kana": "",
    "meaning": "",
    "type": "",
    "furigana": ""
  });
  
  const generateWord = (wordArray) => {
    const wordPos = Math.floor(Math.random() * wordArray.length);
    setWord(() => {return wordArray[wordPos]});
  };

  useEffect(() => {
    generateWord(wordlist);
  }, []);
  
  return (
    <div className="Vocab">
        <div className="word-box">
          Word: {word.vocab} <br />
          Word: {word.furigana} <br />
          Word: {word.meaning} <br />
          Word: {word.type} <br />
        </div>
        <button onClick={() => generateWord(wordlist)}>Press button</button>
    </div>
  );
}
