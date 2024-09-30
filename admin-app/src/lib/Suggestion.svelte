<script lang="ts">
  import { onMount } from 'svelte';
  import { getSuggestions } from '../api-client';
  import type { Suggestion } from '../types';
  let suggestions: Suggestion[] = [];

  onMount(async () => {
    try {
      suggestions = await getSuggestions();
      console.log(suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  });

  const handleYes = () => {
    console.log("Yes clicked");
  };

  const handleNo = () => {
    console.log("No clicked");
  };
</script>

<div class="w-full">
  {#each suggestions as suggestion}
    <div class="flex flex-col m-auto mt-4 items-center w-1/3 p-6 border border-gray-300 rounded-lg">
      <h3 class="text-lg font-semibold mb-2">Forslag:</h3>
      <p class="mb-4 text-gray-700">{suggestion.expression}</p>

      <h4 class="text-md font-semibold mb-2">Eksempel:</h4>
      <p class="mb-4 text-gray-600">{suggestion.example}</p>

      <h4 class="text-md font-semibold mb-2">Definisjon:</h4>
      <p class="mb-4 text-gray-600">{suggestion.definition}</p>

      Teit?
      <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" class="sr-only peer">
        <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700">
        </div>
        <div class="peer-checked:translate-x-5 peer-checked:border-white absolute top-0.5 left-0.5 bg-white border border-gray-300 h-5 w-5 rounded-full transition-transform" />
      </label>      

      <div class="flex space-x-4 mt-4">
        <button 
          on:click={handleYes} 
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none">
          Ja
        </button>
        <button 
          on:click={handleNo} 
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none">
          Nei
        </button>
      </div>

    </div>
  {/each}
</div>