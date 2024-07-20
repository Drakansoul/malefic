import ACN from "./icons/ACN.svg?raw";
import ARC from "./icons/ARC.svg?raw";
import AST from "./icons/AST.svg?raw";
import BLM from "./icons/BLM.svg?raw";
import BLU from "./icons/BLU.svg?raw";
import BRD from "./icons/BRD.svg?raw";
import CNJ from "./icons/CNJ.svg?raw";
import DNC from "./icons/DNC.svg?raw";
import DRG from "./icons/DRG.svg?raw";
import DRK from "./icons/DRK.svg?raw";
import fallback from "./icons/fallback.svg?raw";
import GLA from "./icons/GLA.svg?raw";
import GNB from "./icons/GNB.svg?raw";
import LNC from "./icons/LNC.svg?raw";
import MCH from "./icons/MCH.svg?raw";
import MNK from "./icons/MNK.svg?raw";
import MRD from "./icons/MRD.svg?raw";
import NIN from "./icons/NIN.svg?raw";
import PCT from "./icons/PCT.svg?raw";
import PGL from "./icons/PGL.svg?raw";
import PLD from "./icons/PLD.svg?raw";
import RDM from "./icons/RDM.svg?raw";
import ROG from "./icons/ROG.svg?raw";
import RPR from "./icons/RPR.svg?raw";
import SAM from "./icons/SAM.svg?raw";
import SCH from "./icons/SCH.svg?raw";
import SGE from "./icons/SGE.svg?raw";
import SMN from "./icons/SMN.svg?raw";
import THM from "./icons/THM.svg?raw";
import VPR from "./icons/VPR.svg?raw";
import WAR from "./icons/WAR.svg?raw";
import WHM from "./icons/WHM.svg?raw";

const icons: Record<string, string> = {
  ACN,
  ARC,
  AST,
  BLM,
  BLU,
  BRD,
  CNJ,
  DNC,
  DRG,
  DRK,
  fallback,
  GLA,
  GNB,
  LNC,
  MCH,
  MNK,
  MRD,
  NIN,
  PCT,
  PGL,
  PLD,
  RDM,
  ROG,
  RPR,
  SAM,
  SCH,
  SGE,
  SMN,
  THM,
  VPR,
  WAR,
  WHM
};

export default function getIcon(job: string): string {
  return icons[job] ?? icons.fallback;
}
