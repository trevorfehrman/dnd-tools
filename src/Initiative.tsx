import * as React from 'react';
import { FC, useState } from 'react';
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

export const Initiative: FC = () => {
  const [participants, setParticipants] = useState<IParticipant[]>([]);

  function advanceInitiative(): void {
    setParticipants(move(participants, 0, -1));
  }

  function addParticipant(): void {
    setParticipants([
      ...participants,
      { id: nextId(), backgroundColor: 'grey' },
    ]);
  }

  function editParticipant(id: string, values: Partial<IParticipant>): void {
    setParticipants(
      participants.map((participant) => {
        if (participant.id === id) {
          return {
            ...participant,
            ...values,
          };
        }
        return participant;
      })
    );
  }

  function removeParticipant(id: string) {
    setParticipants(
      participants.filter((participant) => participant.id !== id)
    );
  }

  return (
    <>
      <button type="button" onClick={advanceInitiative}>
        Advance Initiative
      </button>
      <button type="button" onClick={addParticipant}>
        Add Participant
      </button>
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
              removeParticipant={removeParticipant}
            />
          </motion.li>
        ))}
      </ul>
    </>
  );
};
