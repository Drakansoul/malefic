import type { LogParser } from "$lib/types/LogParser";
import type {
  OverlayEvent,
  LogLine,
  CombatData
} from "$lib/types/OverlayPlugin";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  interface Window {
    // FFLogs
    LogParser: new (
      unk: number,
      unk2: boolean,
      unk3: [],
      unk4: boolean,
      metersEnabled: boolean
    ) => LogParser;

    // OverlayPlugin
    addOverlayListener(
      event: OverlayEvent.LogLine,
      cb: (line: LogLine) => void
    ): void;
    addOverlayListener(
      event: OverlayEvent.CombatData,
      cb: (data: CombatData) => void
    ): void;
    addOverlayListener(
      event: OverlayEvent.ChangePrimaryPlayer,
      cb: (data: ChangePrimaryPlayer) => void
    ): void;
    startOverlayEvents(): void;
  }
}

export {};
