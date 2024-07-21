<script lang="ts">
  import { DamageType } from "$lib/parser";
  import CaretUp from "~icons/mdi/caret-up";
  import CaretDown from "~icons/mdi/caret-down";

  import { collapsed, damageType } from "$lib/state";
</script>

<div class="header">
  <div class="left">
    <select bind:value={$damageType} class="dps">
      <option value={DamageType.DPS}>DPS</option>
      <option value={DamageType.rDPS}>rDPS</option>
      <option value={DamageType.nDPS}>nDPS</option>
      <option value={DamageType.aDPS}>aDPS</option>
      <option value={DamageType.cDPS}>cDPS</option>
    </select>
  </div>

  <div class="right">
    <button
      type="button"
      class="collapse outline"
      on:click={() => ($collapsed = !$collapsed)}
    >
      {#if $collapsed}
        <CaretDown />
      {:else}
        <CaretUp />
      {/if}
    </button>
  </div>
</div>

<style>
  .header {
    background-color: #13171f;
    padding: 0.5rem;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .header .dps {
    width: max-content;
  }

  .right {
    padding-right: 0.25rem; /* why lol */
  }

  select {
    margin-bottom: 0;
  }

  .collapse {
    height: 100%;
    margin: 0;
  }

  .collapse :global(svg) {
    height: 1.5rem;
    width: 1.5rem;
  }
</style>
