import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { IParticipant } from './interfaces/initiative-interfaces';

interface InitiativeParticipantProps {
  participant: IParticipant;
  editParticipant: (id: string, values: Partial<IParticipant>) => void;
  removeParticipant: (id: string) => void;
}

export const InitiativeParticipant: FC<InitiativeParticipantProps> = ({
  participant,
  editParticipant,
  removeParticipant,
}) => {
  const [values, setValues] = useState({
    name: '',
    hitPoints: 0,
    enemy: false,
    initiative: 0,
  });

  const [edit, setEdit] = useState(true);

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleCheck(e: ChangeEvent<HTMLInputElement>): void {
    setValues({ ...values, enemy: !values.enemy });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEdit(false);
    editParticipant(participant.id, values);
  }

  return (
    <div>
      <h1>{participant.id}</h1>
      {edit ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="hitPoints">
            Hit Points:
            <input
              type="number"
              name="hitPoints"
              value={values.hitPoints}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="enemy">
            Enemy:
            <input
              type="checkbox"
              name="enemy"
              checked={values.enemy}
              onChange={handleCheck}
            />
          </label>
          <label htmlFor="initiative">
            Initiative:
            <input
              type="number"
              name="initiative"
              value={values.initiative}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <span>{participant.name}</span>
          <span>{participant.initiative}</span>
          <span>{participant.hitPoints}</span>
        </div>
      )}
      <button onClick={() => removeParticipant(participant.id)} type="button">
        Kill
      </button>
      <button
        style={edit ? { display: 'none' } : { display: 'block' }}
        onClick={() => setEdit((state) => !state)}
        type="button"
      >
        Edit
      </button>
    </div>
  );
};
