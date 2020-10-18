import React, { FC } from 'react';

import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
} from '@chakra-ui/core';

import styles from './InitiativeHP.module.scss';

import { IParticipant } from '../../interfaces/initiative-interfaces';

interface InitiativeHPProps {
  participant: IParticipant;
  editParticipant: (id: string, values: Partial<IParticipant>) => void;
}

export const InitiativeHP: FC<InitiativeHPProps> = ({
  participant,
  editParticipant,
}) => {
  function submitHandler(key: string, value: number) {
    editParticipant(participant.id, { [key]: value });
  }

  return (
    <div>
      <Text fontSize="lg">Initiative</Text>
      <NumberInput
        className={styles.perception}
        onChange={(value) => submitHandler('initiative', Number(value))}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Text fontSize="lg">HP</Text>
      <Flex alignItems="center">
        <NumberInput
          className={styles.hitPoints}
          fontSize="2xl"
          min={0}
          max={participant.maxHP}
          keepWithinRange={false}
          clampValueOnBlur={false}
          value={participant.currentHP}
          onChange={
            (currentHP) => submitHandler('currentHP', Number(currentHP))
            // eslint-disable-next-line react/jsx-curly-newline
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text fontSize="3xl" style={{ marginRight: '5px' }}>
          /
        </Text>
        <Editable
          fontSize="3xl"
          defaultValue="00"
          value={String(participant.maxHP)}
          onChange={(maxHP) => {
            submitHandler('maxHP', Number(maxHP));
          }}
        >
          <EditablePreview />
          <EditableInput style={{ maxWidth: '53px' }} />
        </Editable>
      </Flex>
    </div>
  );
};
