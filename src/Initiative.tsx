import * as React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import move from 'array-move';

const spring = {
  type: 'spring',
  damping: 25,
  stiffness: 120,
};

// const transition = {
//   type: 'spring',
//   damping: 25,
//   stiffness: 120,
// };

export const Initiative = () => {
  const [colors, setColors] = useState(initialColors);
  
  function advanceInitiative(): void {
    const nextTurnOrder = move(colors, 0, -1);
    setColors(nextTurnOrder);
  }


  return (
    <>
      <button type="button" onClick={advanceInitiative}>Click</button>
      <ul>
        {colors.map((background) => (
          <motion.li
            key={background}
            layout
            transition={spring}
            style={{ background }}
          />
        ))}
      </ul>
    </>
  );
};

const initialColors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF'];
