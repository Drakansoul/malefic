<script lang="ts">
  import "@fontsource/inter";
  import "@picocss/pico/css/pico.min.css";

  import createParser, {
    parseMeters,
    testMode,
    type Parse,
    DamageType
  } from "../lib/parser";
  import { OverlayEvent } from "$lib/types/OverlayPlugin";
  import { State, type LogParser } from "$lib/types/LogParser";

  let query = new URLSearchParams(window.location.search);

  let parser: LogParser | null = createParser();
  let parse: Parse | null = query.has("test") ? testMode() : null;
  let primaryPlayer: string | null = null;
  $: damageType = (query.get("damageType") as DamageType) ?? DamageType.DPS;

  window.addOverlayListener(OverlayEvent.LogLine, (data) => {
    if (!parser) return;
    parser.parseLine(data.rawLine);
    try {
      const newParse = parseMeters(parser, primaryPlayer);
      if (newParse.meter.state === State.InProgress) {
        parse = newParse;
        //console.log("parse", parse);
      }
    } catch (e) {
      // console.error(e);
    }
  });

  window.addOverlayListener(OverlayEvent.ChangePrimaryPlayer, (data) => {
    primaryPlayer = data.charName;
  });
  window.startOverlayEvents();
</script>

<div class="container">
  <div class="header">
    <select bind:value={damageType}>
      <option value={DamageType.DPS}>DPS</option>
      <option value={DamageType.rDPS}>rDPS</option>
      <option value={DamageType.nDPS}>nDPS</option>
      <option value={DamageType.aDPS}>aDPS</option>
      <option value={DamageType.cDPS}>cDPS</option>
    </select>
  </div>

  <div class="dps">
    {#each Object.entries(parse?.damage ?? {}).sort((a, b) => b[1][damageType] - a[1][damageType]) as [name, value]}
      <div
        class="row"
        style="--progress: {(value[damageType] /
          (parse?.max[damageType] ?? value[damageType])) *
          100}%"
      >
        <span>{name}</span>
        <div class="damage">
          <span
            >{(value[damageType] / (parse?.duration ?? 1)).toLocaleString(
              "en-US",
              { maximumFractionDigits: 2 }
            )}</span
          >

          <span
            >({value[damageType].toLocaleString("en-US", {
              maximumFractionDigits: 2
            })})</span
          >
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  :global(html),
  :global(body) {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: transparent;
  }

  :root {
    --pico-font-size: 0.75rem;
    --pico-form-element-spacing-vertical: 0.5rem;
    --pico-form-element-spacing-horizontal: 0.5rem;
  }

  .container {
    display: flex;
    flex-direction: column;

    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    padding: 0;
    margin: 0;

    color: white;
    font-family: "Inter", sans-serif;
    font-size: 1rem;
  }

  select {
    margin-bottom: 0;
  }

  .header {
    width: 100%;
  }

  .row {
    display: flex;
    height: 2rem;
    padding: 0.5rem;

    align-items: center;
    justify-content: space-between;

    border-bottom: 3px solid var(--pico-primary);
    border-image: linear-gradient(
        90deg,
        var(--pico-primary) var(--progress),
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 100%
      )
      1;
  }

  .dps {
    overflow-y: auto;
    background-color: #13171fbe !important;
  }
</style>
