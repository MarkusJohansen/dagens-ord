<script lang="ts">
  import { onMount } from 'svelte';
  import { getSuggestions } from '../api-client';
  import SingleSuggestion from './SingleSuggestion.svelte';
  import type { Suggestion } from '../types';
  import { toast } from '@zerodevx/svelte-toast';

  let suggestions: Suggestion[] = [];

  const fetchSuggestions = async () => {
    const { data, error } = await getSuggestions();
    if (data) {
      suggestions = data;
    } else if (error) {
      toast.push('Kunne ikke hente forslag.');
    }
  };

  onMount(() => {
    fetchSuggestions();
  });

  const handleSuggestionDeleted = () => {
    fetchSuggestions();
  };
</script>

<div class="w-full">
  {#if suggestions.length > 0}
    {#each suggestions as suggestion}
      <SingleSuggestion {suggestion} on:delete={handleSuggestionDeleted} />
    {/each}
  {:else}
    <p>Laster forslag...</p>
  {/if}
</div>
