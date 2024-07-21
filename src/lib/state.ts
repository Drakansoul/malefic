import { writable } from "svelte/store";
import { DamageType } from "./parser";

export const collapsed = writable(false);

export const damageType = writable(
  (new URLSearchParams(location.search).get("damageType") as DamageType) ??
    DamageType.DPS
);
