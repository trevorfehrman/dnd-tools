import React, { FC } from 'react';
import { CloseButton, Flex, Progress } from '@chakra-ui/core';

import { InitiativeParticipantData } from './InitiativeParticipantData';
import { IParticipant } from '../../interfaces/initiative-interfaces';

import styles from './InitiativeParticipant.module.scss';

import { InitiativeHP } from './InitiativeHP';

interface InitiativeParticipantProps {
  participant: IParticipant;
  removeParticipant: (id: string) => void;
  editParticipant: (id: string, values: Partial<IParticipant>) => void;
}

export const InitiativeParticipant: FC<InitiativeParticipantProps> = ({
  participant,
  editParticipant,
  removeParticipant,
}) => {
  return (
    <>
      <CloseButton
        className={styles.closeButton}
        onClick={() => removeParticipant(participant.id)}
      />
      <Flex justify="space-between">
        <InitiativeParticipantData
          participant={participant}
          editParticipant={editParticipant}
        />
        <InitiativeHP
          participant={participant}
          editParticipant={editParticipant}
        />
      </Flex>
      <Progress
        className={styles.progress}
        value={(participant.currentHP / participant.maxHP) * 100}
      />
    </>
  );
};
