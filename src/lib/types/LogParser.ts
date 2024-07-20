export interface LogParser {
  collectMeters(): Meter[];
  parseLine(line: string): void;
}

export type Meter = {
  zone: Zone;
  encounter: Encounter;
  state: State;

  startTime: number;
  endTime: number;

  downtime: number;
  friendlyDamage: {
    actors: Record<`${number}`, Actor>;
  };

  // There's also a segments but iunno what that's used for lol
};

type Zone = {
  id: number;
  name: string;
};

type Encounter = {
  id: number;
  type: "fight";
  name: string;
};

export enum State {
  InProgress = "inprogress",
  Kill = "kill",
  Wipe = "wipe"
}

type Actor = {
  id: number;
  name: string;
  fullType: string;

  amount: number;
  amountTaken: number;
  singleTargetAmountTaken: number;
  amountGiven: number;

  targets: Record<`${number}`, Omit<Actor, "targets">>;
};
