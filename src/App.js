import {useEffect, useState} from "react";
import './App.css';

let guessId = 0;
let letterId = 0;
let imgId = 0;
let letters_correct = 0;

const randomWords = require('random-words');
const generate_word = randomWords(1).join();

function App() {

  // Declare states
  const [letter, setLetter] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [status, setStatus] = useState('empty');
  const [word, setWord] = useState([]);
  const [currentLetter, setCurrentLetter] = useState('');


  //make random word into letters as multi array, only run once
  useEffect(() => {
    generate_word.split('').map((letter) => {
      word.push({
        letter: letter,
        id: letterId++,
        //isGuessed to know if letter is guessed
        isGuessed: false,
      });
    });

    console.log (generate_word);
    console.log (word);

  }, []);


  // Function to handle the input
  const handleSubmit = (event) => {
    event.preventDefault();

    //Check if input is not empty
    if (letter.length === 0 || letter.length > 1) {
      setStatus('error');
      return;
    }

    //Check if input is letter
    if (/^[a-zA-Z]+$/i.test(letter) === false) {
      setStatus('noLetter');
      return;
    }

    //Check if letter is already guessed
    if (guesses.some(guess => guess.letter === letter)) {
      setStatus('duplicate');
      return;
    }

    handleLetterChange(letter);
  }

  const handleLetterChange = (letter)  => {
    //If letter passed all checks, add it to guesses state
    setStatus('success');
    let guess = false;

    word.map((item) => {
      if (item.letter === letter) {
        item.isGuessed = true;
        guess = true;
        letters_correct++;
      }
    });

    if (guess === false) {
      let line = document.getElementById(imgId);
      line.classList.remove('disabled');
      imgId++;
    }

    setLetter('');
    guesses.push({
      id: guessId++,
      letter: letter,
    });

  }


  //Handle losing and winning
  if (imgId === 11) {
    alert('Game over');
    window.location.reload();
  }

  if (letters_correct === generate_word.length) {
    alert('You win!');
    window.location.reload();
  }


  return (
    <div className={'wrapper'}>
      <div className={'wrapper_input'}>
        {/*Error handling*/}
        <>
          {status === 'error' &&
              <p className="error">
                Please fill in one letter
              </p>
          }
          {status === 'duplicate' &&
              <p className="duplicate">
                You already guessed this letter
              </p>
          }
          {status === 'noLetter' &&
              <p className="noLetter">
                Please fill in a letter
              </p>
        }
        </>
        <form onSubmit={handleSubmit} className={'form_guess'} >
            <input
              type="text"
              placeholder="Your guess:"
              onChange={(e) => setLetter(e.target.value.toLowerCase())}
              value={letter}
              maxLength={1}
          />
          <input type="submit" value={'Go'} disabled={letter.length === 0 || /^[a-zA-Z]+$/i.test(letter) === false  }  />
        </form>

        <div className={'word'}>
          {word.map(item => (
              <li key={item.id}> { item.isGuessed ? item.letter : '_' } </li> )
          )}
        </div>

        <div className={'guessed'}>
          {guesses.map(letter => (
            <li key={letter.id}> { letter.letter } </li> )
            )}
        </div>
      </div>
      <div className={'hangMan'}>
        <img src="{`/img/hangman/${fout}.png`}" alt=""/>
        <svg width="334" height="300" viewBox="0 0 334 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line y1="297.5" x2="150" y2="297.5" stroke="#000" strokeWidth="5" className={'one disabled'} id={'0'}/>
          <line x1="72.502" y1="300" x2="72.502" stroke="#000" strokeWidth="5" className={'disabled'} id={'1'}/>
          <line x1="75" y1="2.5" x2="275" y2="2.5" stroke="#000" strokeWidth="5" className={'disabled'} id={'2'}/>
          <line x1="73.2322" y1="56.2652" x2="126.265" y2="3.23218" stroke="#000" strokeWidth="5" className={'disabled'} id={'3'}/>
          <line x1="272.5" y1="5" x2="272.5" y2="58" stroke="#000" strokeWidth="5" className={'disabled'} id={'4'}/>
          <circle cx="273" cy="82" r="22.5" stroke="#000" strokeWidth="5" className={'disabled'} id={'5'}/>
          <line x1="272.5" y1="107" x2="272.5" y2="207" stroke="#000" strokeWidth="5" className={'disabled'} id={'6'}/>
          <line x1="273.75" y1="155.585" x2="332.207" y2="121.835" stroke="#000" strokeWidth="5" className={'disabled'} id={'7'}/>
          <line x1="213.25" y1="121.835" x2="271.707" y2="155.585" stroke="#000" strokeWidth="5" className={'disabled'} id={'8'}/>
          <line x1="319.962" y1="252.498" x2="272.232" y2="204.768" stroke="#000" strokeWidth="5" className={'disabled'} id={'9'}/>
          <line x1="272.498" y1="204.768" x2="224.768" y2="252.497" stroke="#000" strokeWidth="5" className={'disabled'} id={'10'}/>
        </svg>
      </div>

    </div>


  )
}

export default App;
