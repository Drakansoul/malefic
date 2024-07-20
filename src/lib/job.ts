// From the parser js & global-ff.css
const jobMappings: Record<string, string> = {
  Gladiator: "GLA",
  Marauder: "MRD",
  Lancer: "LNC",
  Pugilist: "PGL",
  Rogue: "ROG",
  Archer: "ARC",
  Thaumaturge: "THM",
  Arcanist: "ACN",
  Conjurer: "CNJ",

  Paladin: "PLD",
  Warrior: "WAR",
  DarkKnight: "DRK",
  Gunbreaker: "GNB",

  WhiteMage: "WHM",
  Scholar: "SCH",
  Astrologian: "AST",
  Sage: "SGE",

  Monk: "MNK",
  Dragoon: "DRG",
  Ninja: "NIN",
  Samurai: "SAM",
  Reaper: "RPR",
  Viper: "VPR",

  Bard: "BRD",
  Machinist: "MCH",
  Dancer: "DNC",

  BlackMage: "BLM",
  Summoner: "SMN",
  RedMage: "RDM",
  Pictomancer: "PCT",
  BlueMage: "BLU"
};

const jobColors: Record<string, string> = {
  GLA: "#a8d2e6",
  MRD: "#cf2621",
  LNC: "#4164cd",
  PGL: "#d69c00",
  ROG: "#af1964",
  ARC: "#91ba5e",
  THM: "#a579d6",
  ACN: "#2d9b78",
  CNJ: "#fff0dc",

  DRK: "#d126cc",
  GNB: "#998d50",

  SCH: "#8657ff",
  AST: "#ffe74a",
  SGE: "#80a0f0",

  SAM: "#e46d04",
  RPR: "#965a90",
  VPR: "#108210",

  MCH: "#6ee1d6",
  DNC: "#e2b0af",

  RDM: "#e87b7b",
  PCT: "#fc92e1",
  BLU: "#2459ff"
};

jobColors.PLD = jobColors.GLA;
jobColors.WAR = jobColors.MRD;
jobColors.DRG = jobColors.LNC;
jobColors.MNK = jobColors.PGL;
jobColors.NIN = jobColors.ROG;
jobColors.BRD = jobColors.ARC;
jobColors.BLM = jobColors.THM;
jobColors.SMN = jobColors.ACN;
jobColors.WHM = jobColors.CNJ;

export function getJob(job: string): string {
  return jobMappings[job] ?? job;
}

export function getColor(job: string): string {
  return jobColors[job] ?? "#ffffff";
}
