import type { LogParser, Meter } from "./types/LogParser";

export default function createParser() {
  return new window.LogParser(
    0,
    false,
    [],
    false,
    true // metersEnabled
  );
}

export function parseMeters(
  parser: LogParser,
  primaryPlayer: string | null
): Parse {
  const meters = parser.collectMeters();
  //console.log("meters", meters);

  const meter = meters
    .filter((m) =>
      primaryPlayer == null
        ? true
        : Object.values(m.friendlyDamage.actors).some(
            (actor) => actor.name === primaryPlayer
          )
    )
    .sort((m) => m.startTime)
    .reverse()[0];
  if (!meter) throw new Error("No meters found");

  const damage: Record<string, Damage> = {};
  const max = {
    dps: 0,
    rDPS: 0,
    nDPS: 0,
    aDPS: 0,
    cDPS: 0
  };
  const sum = {
    dps: 0,
    rDPS: 0,
    nDPS: 0,
    aDPS: 0,
    cDPS: 0
  };
  for (const actor of Object.values(meter.friendlyDamage.actors)) {
    // taken from getMetersConfig
    const actorDamage = {
      dps: actor.amount,
      rDPS: actor.amount - (actor.amountTaken ?? 0) + (actor.amountGiven ?? 0),
      nDPS: actor.amount - (actor.amountTaken ?? 0),
      aDPS: actor.amount - (actor.singleTargetAmountTaken ?? 0),
      cDPS:
        actor.amount -
        (actor.singleTargetAmountTaken ?? 0) +
        (actor.amountGiven ?? 0)
    };
    damage[actor.name] = actorDamage;

    if (actorDamage.dps > max.dps) max.dps = actorDamage.dps;
    if (actorDamage.rDPS > max.rDPS) max.rDPS = actorDamage.rDPS;
    if (actorDamage.nDPS > max.nDPS) max.nDPS = actorDamage.nDPS;
    if (actorDamage.aDPS > max.aDPS) max.aDPS = actorDamage.aDPS;
    if (actorDamage.cDPS > max.cDPS) max.cDPS = actorDamage.cDPS;

    sum.dps += actorDamage.dps;
    sum.rDPS += actorDamage.rDPS;
    sum.nDPS += actorDamage.nDPS;
    sum.aDPS += actorDamage.aDPS;
    sum.cDPS += actorDamage.cDPS;
  }

  return {
    meter,
    damage,
    max,
    sum,
    duration: (meter.endTime - meter.startTime) / 1000
  };
}

export type Parse = {
  meter: Meter;
  damage: Record<string, Damage>;
  max: Record<DamageType, number>;
  sum: Record<DamageType, number>;
  duration: number;
};

export type Damage = {
  dps: number;
  rDPS: number;
  nDPS: number;
  aDPS: number;
  cDPS: number;
};

export enum DamageType {
  DPS = "dps",
  rDPS = "rDPS",
  nDPS = "nDPS",
  aDPS = "aDPS",
  cDPS = "cDPS"
}

export function testMode(): Parse {
  const testDamage: Record<string, Damage> = {};
  const words = [
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight"
  ];

  let sum = 0;
  for (let i = 0; i < 8; i++) {
    const name = `Malefic ${words[i]}`;
    testDamage[name] = {
      dps: 0,
      rDPS: 1000 - (1000 / 8) * i,
      nDPS: 0,
      aDPS: 0,
      cDPS: 0
    };
    sum += testDamage[name].rDPS;
  }

  return {
    meter: null!,
    damage: testDamage,
    max: {
      dps: 0,
      rDPS: 1000,
      nDPS: 0,
      aDPS: 0,
      cDPS: 0
    },
    sum: {
      dps: 0,
      rDPS: sum,
      nDPS: 0,
      aDPS: 0,
      cDPS: 0
    },
    duration: 1
  };
}