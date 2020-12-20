import * as React from 'react';
import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import move from 'array-move';
import nextId from 'react-id-generator';

import { Button, Flex } from '@chakra-ui/core';
import { IoMdSkipForward, IoMdPersonAdd } from 'react-icons/io';
import { ImSortNumbericDesc } from 'react-icons/im';

import styles from './Initiative.module.scss';

import { InitiativeParticipant } from './InitiativeParticipant';
import {
  IParticipant,
  ParticipantCategory,
} from '../../interfaces/initiative-interfaces';

const backGroundColorMap = {
  ENEMY: '#ffebee',
  ALLY: '#e8f5e9',
  NEUTRAL: '#fff3e0',
  NEW: 'white',
};

const spring = {
  type: 'spring',
  damping: 25,
  stiffness: 120,
};

export const Initiative: FC = () => {
  const [participants, setParticipants] = useState<IParticipant[]>([]);

  React.useEffect(() => {
    const parsedParticipants = JSON.parse(
      localStorage.getItem('participants') as string,
    )?.map((parsedParticipant: IParticipant) => ({
      ...parsedParticipant,
      id: nextId(),
    }));
    if (parsedParticipants) {
      setParticipants(parsedParticipants);
    }
  }, []);

  function advanceInitiative(): void {
    setParticipants(move(participants, 0, -1));
  }

  function sortParticipants(): void {
    const sortedParticipants = [...participants].sort(
      (a, b) => b.initiative - a.initiative,
    );
    setParticipants(sortedParticipants);
  }

  function addParticipant(): void {
    const newParticipants = [...participants];

    // This odd-looking decision is related to framer-motion.
    // When a participant is added i want them to appear at the top of the page.
    newParticipants.unshift({
      id: nextId(),
      category: ParticipantCategory.New,
      initiative: 0,
      units: [{ currentHP: 0, maxHP: 0, unitId: nextId() }],
      persisted: false,
    });

    setParticipants(newParticipants);
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
      }),
    );
  }

  function removeParticipant(id: string): void {
    // eslint-disable-next-line max-len
    setParticipants(
      participants.filter((participant) => participant.id !== id),
    );
  }

  return (
    <>
      <Flex className={styles.buttonBar} justify="space-around">
        <Button
          rightIcon={IoMdSkipForward}
          aria-label="Advance Initiative"
          onClick={advanceInitiative}
        >
          Advance Initiative
        </Button>
        <Button
          rightIcon={IoMdPersonAdd}
          aria-label="Add Participant"
          onClick={addParticipant}
        >
          Add Participant
        </Button>
        <Button
          rightIcon={ImSortNumbericDesc}
          aria-label="Add Participant"
          onClick={sortParticipants}
        >
          Sort by Initiative
        </Button>
      </Flex>
      <ul className={styles.initiativeList}>
        {participants.map((participant) => (
          <motion.li
            key={participant.id}
            layout
            transition={spring}
            style={{
              background: backGroundColorMap[participant.category],
            }}
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
