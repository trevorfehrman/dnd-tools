import React, { FC, useState } from 'react';
import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  IconButton,
  Radio,
  RadioGroup,
  Text,
} from '@chakra-ui/core';
import { GiDiceTwentyFacesTwenty } from 'react-icons/gi';

import styles from './InitiativeParticipantData.module.scss';

import {
  IParticipant,
  ParticipantCategory,
} from '../../interfaces/initiative-interfaces';

interface InitiativeParticipantDataProps {
  participant: IParticipant;
  editParticipant: (id: string, values: Partial<IParticipant>) => void;
}

export const InitiativeParticipantData: FC<InitiativeParticipantDataProps> = ({
  participant,
  editParticipant,
}) => {
  const [perceptionRoll, setPerceptionRoll] = useState<number | null>(null);

  function submitHandler(key: string, value: string | number) {
    editParticipant(participant.id, { [key]: value });
  }

  function rollPerception() {
    setPerceptionRoll(Math.floor(Math.random() * 20 + 1));
  }

  return (
    <div>
      <Heading>
        <Editable
          defaultValue="Click to enter name..."
          value={participant.name}
          onSubmit={(name) => submitHandler('name', name)}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Heading>
      <RadioGroup
        className={styles.radioGroup}
        // We need to generate unqiue names or all participants share the same radio button state
        name={`category-${participant.id}`}
        onChange={
          (e) => submitHandler(e.target.name.split('-')[0], e.target.value)
          // eslint-disable-next-line react/jsx-curly-newline
        }
        isInline
      >
        <Radio value={ParticipantCategory.Ally}>Ally</Radio>
        <Radio value={ParticipantCategory.Enemy}>Enemy</Radio>
        <Radio value={ParticipantCategory.Neutral}>Neutral</Radio>
      </RadioGroup>
      <Flex alignItems="center" className={styles.ACPPContainer}>
        <Text className={styles.label} fontSize="lg">
          AC:{' '}
        </Text>
        <Editable
          className={styles.value}
          fontSize="3xl"
          defaultValue="00"
          value={participant.armorClass}
          onSubmit={(ac) => submitHandler('armorClass', ac)}
        >
          <EditablePreview />
          <EditableInput style={{ maxWidth: '53px' }} />
        </Editable>
        <Flex alignItems="center">
          <Text className={styles.label} fontSize="lg">
            PP:{' '}
          </Text>
          <Editable
            className={styles.value}
            fontSize="3xl"
            defaultValue="00"
            value={participant.passivePerception}
            onSubmit={
              (perception) => submitHandler('passivePerception', perception)
              // eslint-disable-next-line react/jsx-curly-newline
            }
          >
            <EditablePreview />
            <EditableInput style={{ maxWidth: '53px' }} />
          </Editable>
          <Text className={styles.label} fontSize="lg">
            Spell Save:{' '}
          </Text>
          <Editable
            className={styles.value}
            fontSize="3xl"
            defaultValue="00"
            value={participant.spellSave}
            onSubmit={(ss) => submitHandler('spellSave', ss)}
          >
            <EditablePreview />
            <EditableInput style={{ maxWidth: '53px' }} />
          </Editable>
          <IconButton
            className={styles.perceptionButton}
            onClick={rollPerception}
            aria-label="Roll Perception"
            icon={GiDiceTwentyFacesTwenty}
          />
          <Text fontSize="3xl">{perceptionRoll}</Text>
        </Flex>
      </Flex>
    </div>
  );
};
