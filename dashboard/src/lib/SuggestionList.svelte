<script lang="ts">
  import SingleSuggestion from './SingleSuggestion.svelte';
  import type { Suggestion } from '../types';

  export let suggestions: Suggestion[] = [];
  export let onSuggestionDeleted = () => {};

</script>

<div class="w-full mt-24">
  {#if suggestions.length > 0}
    {#each suggestions as suggestion}
      <SingleSuggestion {suggestion} on:delete={onSuggestionDeleted} />
    {/each}
  {:else}
    <p>Laster forslag...</p>
  {/if}
</div>
