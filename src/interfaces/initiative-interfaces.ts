export enum ParticipantCategory {
  Enemy = 'ENEMY',
  Ally = 'ALLY',
  Neutral = 'NEUTRAL',
  New = 'NEW',
}

export interface IUnit {
  currentHP: number;
  maxHP: number;
  unitId: string;
}

export interface IParticipant {
  id: string;
  name?: string;
  category: ParticipantCategory;
  armorClass?: string;
  passivePerception?: string;
  spellSave?: string;
  units: IUnit[];
  initiative: number;
  persisted: boolean;
}
