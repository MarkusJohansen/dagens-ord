<script lang="ts">
  import type { Suggestion } from "../types";
  import SuggestionRow from "./SuggestionRow.svelte";
  import { createEventDispatcher } from "svelte";

  export let list: Suggestion[] = [];
  export let onSuggestionDeleted = () => {};

  const dispatch = createEventDispatcher();

  let selectedIds = new Set<number>();

  $: allSelected = list.length > 0 && list.every((s) => selectedIds.has(s.id));
  $: someSelected = selectedIds.size > 0;

  function toggleAll() {
    selectedIds = allSelected ? new Set() : new Set(list.map((s) => s.id));
  }

  function toggleOne(id: number) {
    const next = new Set(selectedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    selectedIds = next;
  }

  function clearSelection() {
    selectedIds = new Set();
  }

  function bulkApprove() {
    dispatch("bulkApprove", list.filter((s) => selectedIds.has(s.id)));
    clearSelection();
  }

  function bulkReject() {
    dispatch("bulkReject", list.filter((s) => selectedIds.has(s.id)));
    clearSelection();
  }
</script>

<!-- Mobile: card list -->
<div class="md:hidden flex flex-col gap-3">
  {#each list as suggestion (suggestion.id)}
    <SuggestionRow
      {suggestion}
      mobile={true}
      isSelected={selectedIds.has(suggestion.id)}
      on:toggle={() => toggleOne(suggestion.id)}
      on:delete={onSuggestionDeleted}
    />
  {/each}
</div>

<!-- Desktop: table -->
<div class="hidden md:block">

  <!-- Row count + bulk bar -->
  <div class="flex items-center justify-between mb-3 min-h-[36px]">
    <span class="text-xs font-bold uppercase tracking-widest text-gray-500">
      {list.length} forslag
    </span>
    {#if someSelected}
      <div class="flex items-center gap-2 bg-black text-white px-4 py-2 border-2 border-black shadow-brutal-sm">
        <span class="text-xs font-black uppercase tracking-wide">{selectedIds.size} valgt</span>
        <div class="w-px h-4 bg-white/30 mx-1" />
        <button
          class="text-xs font-black uppercase tracking-wide text-brutal-teal hover:opacity-80 transition-opacity"
          on:click={bulkApprove}
        >Godkjenn alle</button>
        <div class="w-px h-4 bg-white/30 mx-1" />
        <button
          class="text-xs font-black uppercase tracking-wide text-brutal-pink hover:opacity-80 transition-opacity"
          on:click={bulkReject}
        >Avslå alle</button>
        <div class="w-px h-4 bg-white/30 mx-1" />
        <button
          class="text-xs font-black uppercase tracking-wide text-gray-400 hover:text-white transition-colors"
          on:click={clearSelection}
        >✕</button>
      </div>
    {/if}
  </div>

  <div class="overflow-x-auto border-2 border-black">
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-black text-white">
          <th class="px-3 py-3 w-10 border-r border-white/20">
            <input
              type="checkbox"
              checked={allSelected}
              on:click={toggleAll}
              class="w-4 h-4 cursor-pointer accent-brutal-teal"
            />
          </th>
          <th class="px-4 py-3 text-left font-black uppercase tracking-wide text-xs border-r border-white/20">Uttrykk</th>
          <th class="px-4 py-3 text-left font-black uppercase tracking-wide text-xs border-r border-white/20">Eksempel</th>
          <th class="px-4 py-3 text-left font-black uppercase tracking-wide text-xs border-r border-white/20">Definisjon</th>
          <th class="px-4 py-3 text-left font-black uppercase tracking-wide text-xs border-r border-white/20 w-20">NSFW</th>
          <th class="px-4 py-3 text-left font-black uppercase tracking-wide text-xs w-48">Handlinger</th>
        </tr>
      </thead>
      <tbody>
        {#each list as suggestion (suggestion.id)}
          <SuggestionRow
            {suggestion}
            isSelected={selectedIds.has(suggestion.id)}
            on:toggle={() => toggleOne(suggestion.id)}
            on:delete={onSuggestionDeleted}
          />
        {/each}
      </tbody>
    </table>
  </div>
</div>
