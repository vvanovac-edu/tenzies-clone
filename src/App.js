import React, { useState } from 'react';

import './App.css';
import Die from './components/Die/Die';

export default function App() {
  const allNewDice = () => {

    const newDice = [];
    for (let i = 0; i < 10; i++) {

      const randomNumber = Math.ceil(Math.random() * 6);

      newDice.push({
        value: randomNumber,
        isHeld: false,
      });

    }
    return newDice;
  }

  const [dice, setDice] = useState(allNewDice())

  const diceElements = dice.map((die, index) => (
      <Die
          key={index}
          value={die.value}
          isHeld={die.isHeld}
      />
  ))

  const rollDice = () => {
    setDice(allNewDice())
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
