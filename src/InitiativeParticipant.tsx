import React from 'react';

interface IInitiativeParticipantProps {
  name: string;
}

export const InitiativeParticipant = ({ name }: IInitiativeParticipantProps) => {
  return (
    <div>
      <h1>
        {name}
      </h1>
    </div>
  );
};
