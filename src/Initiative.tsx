import * as React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import move from 'array-move';
import nextId from 'react-id-generator';

import styles from './Initiative.module.scss';
import { InitiativeParticipant } from './InitiativeParticipant';
import { IParticipant } from './interfaces/initiative-interfaces';

const spring = {
  type: 'spring',
  damping: 25,
  stiffness: 120,
};


export const Initiative = () => {
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  
  function advanceInitiative(): void {
    setParticipants(move(participants, 0, -1));
  }

  function addParticipant(): void {
    setParticipants([...participants, { id: nextId(), backgroundColor: 'grey' }]);
  }

  function editParticipant(id: string, values: Partial<IParticipant>): void {
    console.log(id, values);

  }

  return (
    <>
      <button type="button" onClick={advanceInitiative}>Advance Initiative</button>
      <button type="button" onClick={addParticipant}>Add Participant</button>
      <ul className={styles.initiativeList}>
        {participants.map((participant) => (
          <motion.li
            key={participant.id}
            layout
            transition={spring}
            style={{ background: participant.backgroundColor }}
          >
            <InitiativeParticipant
              participant={participant}
              editParticipant={editParticipant}
            />
          </motion.li>
        ))}
      </ul>
    </>
  );
};

