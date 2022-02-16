import React from 'react';

import './Die.css';

export default function Die(props) {
  return (
      <div className="die-face">
        <h2 className="die-number">{props.value}</h2>
      </div>
  )
}
