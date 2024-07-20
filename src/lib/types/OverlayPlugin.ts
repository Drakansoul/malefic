export enum OverlayEvent {
  LogLine = "LogLine",
  CombatData = "CombatData",
  ChangePrimaryPlayer = "ChangePrimaryPlayer"
}

export type LogLine = {
  line: unknown;
  rawLine: string;
};

export type CombatData = {
  isActive: `${boolean}`;
};

export type ChangePrimaryPlayer = {
  charID: number;
  charName: string;
};
