<script lang="ts">
  import type { Suggestion } from "../types";
  import SuggestionRow from "./SuggestionRow.svelte";

  export let list: Suggestion[] = [];
  export let onSuggestionDeleted = () => {};


</script>

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Expression</th>
      <th>Example</th>
      <th>Definition</th>
      <th>NSFW?</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each list as suggestion}
        <SuggestionRow {suggestion} on:delete={onSuggestionDeleted} />
    {/each}
  </tbody>
</table>
