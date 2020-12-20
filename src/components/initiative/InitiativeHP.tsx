import React, { FC } from 'react';

import {
  CloseButton,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Progress,
  Text,
} from '@chakra-ui/core';

import styles from './InitiativeHP.module.scss';

import { IUnit } from '../../interfaces/initiative-interfaces';

interface InitiativeHPProps {
  unit: IUnit;
  editUnit: (unitId: string, key: string, value: number) => void;
  deleteUnit: (unitId: string) => void;
}

export const InitiativeHP: FC<InitiativeHPProps> = ({
  unit,
  editUnit,
  deleteUnit,
}) => {
  function handleChange(key: string, value: number) {
    editUnit(unit.unitId, key, value);
  }

  return (
    <div style={{ marginTop: '.5rem' }}>
      <Text fontSize="xl">Hit Points</Text>
      <Flex alignItems="center">
        <CloseButton
          marginRight="1rem"
          onClick={() => deleteUnit(unit.unitId)}
        />
        <NumberInput
          className={styles.hitPoints}
          fontSize="2xl"
          min={0}
          max={unit.maxHP}
          keepWithinRange={false}
          clampValueOnBlur={false}
          value={unit.currentHP}
          onChange={
            (currentHP) => handleChange('currentHP', Number(currentHP))
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
          value={String(unit.maxHP)}
          onChange={(maxHP) => {
            handleChange('maxHP', Number(maxHP));
          }}
        >
          <EditablePreview />
          <EditableInput style={{ maxWidth: '53px' }} />
        </Editable>
      </Flex>
      <Progress
        className={styles.progress}
        value={(unit.currentHP / unit.maxHP) * 100}
      />
    </div>
  );
};
