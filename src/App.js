import React, { useState } from 'react';

import './App.css';
import Die from './components/Die/Die';

export default function App() {
  const allNewDice = () => {

    const newDice = [];
    for (let i = 0; i < 10; i++) {

      const random = Math.ceil(Math.random() * 6);
      newDice.push(random);

    }
    return newDice;

  }

  const [dice, setDice] = useState(allNewDice())

  const diceElements = dice.map((die, index) => <Die key={index} value={die} />)

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
