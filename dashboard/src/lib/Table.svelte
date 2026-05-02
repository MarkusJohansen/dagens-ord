<script lang="ts">
  import type { Suggestion } from "../types";
  import SuggestionRow from "./SuggestionRow.svelte";

  export let list: Suggestion[] = [];
  export let onSuggestionDeleted = () => {};
</script>

<!-- Mobile: card list -->
<div class="md:hidden flex flex-col gap-3">
  {#each list as suggestion (suggestion.id)}
    <SuggestionRow {suggestion} mobile={true} on:delete={onSuggestionDeleted} />
  {/each}
</div>

<!-- Desktop: table -->
<div class="hidden md:block overflow-x-auto">
  <table class="w-full border-2 border-black border-collapse">
    <thead>
      <tr class="bg-black text-white">
        <th class="px-4 py-3 text-left font-black uppercase tracking-wide text-xs border-r border-white/20">Uttrykk</th>
        <th class="px-4 py-3 text-left font-black uppercase tracking-wide text-xs border-r border-white/20">Eksempel</th>
        <th class="px-4 py-3 text-left font-black uppercase tracking-wide text-xs border-r border-white/20">Definisjon</th>
        <th class="px-4 py-3 text-left font-black uppercase tracking-wide text-xs border-r border-white/20 w-20">NSFW</th>
        <th class="px-4 py-3 text-left font-black uppercase tracking-wide text-xs w-44">Handlinger</th>
      </tr>
    </thead>
    <tbody>
      {#each list as suggestion (suggestion.id)}
        <SuggestionRow {suggestion} on:delete={onSuggestionDeleted} />
      {/each}
    </tbody>
  </table>
</div>
