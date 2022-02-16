import React, { useState } from 'react';
import { nanoid } from 'nanoid'

import './App.css';
import Die from './components/Die/Die';

export default function App() {
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
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.isHeld ? die : generateDie();
      });
    });
  }

  return (
    <main>
      <div className="dice-container">
        {diceElements}
      </div>
      <button
          className="roll-button"
          onClick={rollDice}
      >
        Roll
      </button>
    </main>
  );
}
