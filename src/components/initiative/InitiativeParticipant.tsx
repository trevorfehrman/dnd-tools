import React, { FC } from 'react';
import nextId from 'react-id-generator';

import {
  CloseButton,
  Flex,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
} from '@chakra-ui/core';
import { IoIosAdd, IoIosSave } from 'react-icons/io';

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
  const [persist, setPersist] = React.useState(false);

  React.useEffect(() => {
    if (participant.persisted) {
      setPersist(true);
    }
  }, [participant]);

  function editUnit(unitId: string, key: string, value: number) {
    const newUnits = participant.units.map((unit) => {
      if (unit.unitId === unitId) {
        return { ...unit, [key]: value };
      }
      return { ...unit };
    });

    editParticipant(participant.id, { units: newUnits });
  }

  function addUnit() {
    editParticipant(participant.id, {
      units: [
        ...participant.units,
        {
          unitId: nextId(),
          maxHP: participant.units[0] ? participant.units[0].maxHP : 0,
          currentHP: participant.units[0] ? participant.units[0].currentHP : 0,
        },
      ],
    });
  }

  function deleteUnit(unitId: string) {
    editParticipant(participant.id, {
      units: participant.units.filter((unit) => unit.unitId !== unitId),
    });
  }

  function togglePersistParticipant(persistedParticipant: IParticipant) {
    setPersist((state) => !state);
    if (!localStorage.getItem('participants')) {
      localStorage.setItem('participants', JSON.stringify([]));
    }

    if (persist) {
      const storedParticipants: IParticipant[] = JSON.parse(
        localStorage.getItem('participants') as string,
      )
        .map((parcedParticipant: IParticipant) => {
          if (parcedParticipant.id === persistedParticipant.id) {
            return { ...persistedParticipant, persisted: false };
          }
          return { ...persistedParticipant };
        })
        .filter(
          (parsedParticipant: IParticipant) =>
            parsedParticipant.id !== persistedParticipant.id,
        );
      localStorage.setItem('participants', JSON.stringify(storedParticipants));
    }

    if (!persist) {
      const storedParticipants: IParticipant[] = [
        ...JSON.parse(localStorage.getItem('participants') as string),
        { ...persistedParticipant, persisted: true },
      ];
      localStorage.setItem('participants', JSON.stringify(storedParticipants));
    }
  }

  return (
    <>
      <CloseButton
        className={styles.closeButton}
        onClick={() => removeParticipant(participant.id)}
      />
      <Button
        marginBottom=".5rem"
        onClick={() => togglePersistParticipant(participant)}
      >
        <IoIosSave color={persist ? 'green' : '#1a202c'} />
      </Button>
      <Flex justify="space-between">
        <InitiativeParticipantData
          participant={participant}
          editParticipant={editParticipant}
        />
        <div>
          <Text fontSize="2xl">Initiative</Text>
          <NumberInput
            className={styles.perception}
            onChange={
              (value) =>
                editParticipant(participant.id, { initiative: Number(value) })
              // eslint-disable-next-line react/jsx-curly-newline
            }
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>
      </Flex>
      <div>
        <Button onClick={() => addUnit()}>
          <IoIosAdd />
        </Button>
        {participant.units.map((unit) => (
          <InitiativeHP
            key={unit.unitId}
            unit={unit}
            editUnit={editUnit}
            deleteUnit={deleteUnit}
          />
        ))}
      </div>
    </>
  );
};
