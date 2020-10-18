export enum ParticipantCategory {
  Enemy = 'ENEMY',
  Ally = 'ALLY',
  Neutral = 'NEUTRAL',
  New = 'NEW'
}

export interface IParticipant {
  id: string;
  name?: string;
  category: ParticipantCategory,
  armorClass?: string;
  passivePerception?: string;
  currentHP: number;
  maxHP: number;
  initiative: number;
}
