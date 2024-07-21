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
  import ParseUI from "$lib/components/ParseUI.svelte";
  import Header from "$lib/components/Header.svelte";

  import { collapsed, damageType } from "$lib/state";

  let query = new URLSearchParams(window.location.search);
  let parser: LogParser | null = createParser();
  let parse: Parse | null = query.has("test") ? testMode() : null;
  let primaryPlayer: string | null = null;

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
  <Header />

  {#if !$collapsed}
    <div class="inner">
      {#if parse != null}
        <ParseUI {parse} />
      {/if}
    </div>
  {/if}
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
    color: white;

    font-family: "Inter", sans-serif;
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
    font-size: 1rem;
  }

  .inner {
    height: min-content;
  }
</style>
