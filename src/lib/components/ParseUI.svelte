<script lang="ts">
  import type { DamageType, Parse } from "$lib/parser";
  import ParseRow from "./ParseRow.svelte";

  import { damageType } from "$lib/state";

  export let parse: Parse;
</script>

<div class="parse">
  {#each Object.entries(parse.actors).sort((a, b) => b[1].damage[$damageType] - a[1].damage[$damageType]) as [name, value]}
    <ParseRow {parse} {name} {value} />
  {/each}
</div>

<style>
  .parse {
    height: 100%;
    overflow-y: auto;
    background-color: #13171fbe !important;
  }
</style>
