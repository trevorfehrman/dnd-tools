import * as React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import move from 'array-move';
import nextId from 'react-id-generator';

import styles from './Initiative.module.scss';
import { InitiativeParticipant } from './InitiativeParticipant';

const spring = {
  type: 'spring',
  damping: 25,
  stiffness: 120,
};

interface IParticipant {
  name: string;
  backgroundColor: string;
  enemy?: boolean;
  hitPoints?: number;
  initiative?: number;
}

export const Initiative = () => {
  const [participants, setParticipants] = useState<IParticipant[]>([{name: 'renee', backgroundColor: 'red'}, {name: 'tony', backgroundColor: 'blue'}]);
  
  function advanceInitiative(): void {
    setParticipants(move(participants, 0, -1));
  }

  function addParticipant(): void {
    setParticipants([...participants, { name: 'trevor', backgroundColor: 'gray' }]);
  }

  return (
    <>
      <button type="button" onClick={advanceInitiative}>Advance Initiative</button>
      <button type="button" onClick={addParticipant}>Add Participant</button>
      <ul className={styles.initiativeList}>
        {participants.map((participant, i) => (
          <motion.li
            key={i}
            layout
            transition={spring}
            style={{ background: participant.backgroundColor }}
          >
            <InitiativeParticipant name={participant.name} />
          </motion.li>
        ))}
      </ul>
    </>
  );
};

