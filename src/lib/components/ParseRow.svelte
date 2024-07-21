<script lang="ts">
  import getIcon from "$lib/icons";
  import { getColor, getJob } from "$lib/job";
  import type { DamageType, Parse, ParseActor } from "$lib/parser";

  import { damageType } from "$lib/state";

  export let parse: Parse;
  export let name: string;
  export let value: ParseActor;

  function present(value: number) {
    let str = value.toLocaleString("en-US", { maximumFractionDigits: 2 });

    // decimal place must always be 2 digits, only if it's present
    if (str.includes(".")) {
      let [whole, decimal] = str.split(".");
      str = `${whole}.${decimal.padEnd(2, "0")}`;
    }

    return str;
  }
</script>

<div
  class="row"
  style="--progress: {(value.damage[$damageType] / parse.max[$damageType]) *
    100}%; --color: {getColor(value.job)};"
>
  <div class="player">
    {@html getIcon(getJob(value.job))}
    <span>{name}</span>
  </div>

  <div class="damage">
    <span>
      {present(value.damage[$damageType] / (parse?.duration ?? 1))}
    </span>

    <span>({present(value.damage[$damageType])})</span>
  </div>
</div>

<style>
  .row {
    display: flex;
    height: 2rem;
    padding: 0.5rem;
    padding-top: calc(0.25rem + 1.5px);
    padding-bottom: calc(0.25rem + 3px);

    align-items: center;
    justify-content: space-between;

    box-sizing: border-box;
    background-size: 100% 3px;
    background-position: 100% 100%;
    background-image: linear-gradient(
      90deg,
      var(--color) var(--progress),
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    transition: 0.25s ease-in-out;
  }

  .row:hover {
    background-size: 100% 100%;
  }

  .player {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .player :global(svg) {
    width: 1.75rem;
    height: 1.75rem;
  }
</style>
