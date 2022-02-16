import React, {useEffect, useState} from 'react';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti';

import './App.css';
import Die from './components/Die/Die';

export default function App() {
  const [tenzies, setTenzies] = useState(false);

  const generateDie = () => {
    const randomNumber = Math.ceil(Math.random() * 6);

    return {
      id: nanoid(),
      value: randomNumber,
      isHeld: false,
    }
  }

  const allNewDice = () => {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDie());
    }
    return newDice;
  }

  const [dice, setDice] = useState(allNewDice())

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);

    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  const holdDice = (id) => {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.id === id ?
            { ...die, isHeld: !die.isHeld } :
            die;
      })
    });
  }

  const diceElements = dice.map((die) => (
      <Die
          key={die.id}
          value={die.value}
          isHeld={die.isHeld}
          holdDice={() => holdDice(die.id)}
      />
  ))

  const rollDice = () => {
    if (!tenzies) {
      setDice((prevDice) => {
        return prevDice.map((die) => {
          return die.isHeld ? die : generateDie();
        });
      });
    } else {
      setTenzies(false);
      setDice(allNewDice())
    }
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button
          className="roll-button"
          onClick={rollDice}
      >
        {tenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  );
}
