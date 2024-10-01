<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  import { addSuggestion, deleteSuggestion, updateSuggestion } from '../api-client';
  import type { Suggestion } from '../types';
  import Icon from '@iconify/svelte';
  import { toast } from '@zerodevx/svelte-toast';

  export let suggestion: Suggestion;
  let isTeit = false;
  let editExpression = false;
  let editExample = false;
  let editDefinition = false;

  const dispatch = createEventDispatcher();

  const handleYes = async () => {
    const { error } = await addSuggestion({
      expression: suggestion.expression,
      example: suggestion.example,
      definition: suggestion.definition,
      nsfw: isTeit
    });
    if (error) toast.push('Kunne ikke legge forslaget inn i Expressions tabellen: ' + error.message);
    else {
      toast.push('Forslaget er lagt inn i Expressions tabellen.');
      await handleNo();
    }
  };

  const handleNo = async () => {
    const { error } = await deleteSuggestion(suggestion);
    if (error) toast.push('Forslaget kunne ikke slettes fra Suggestions tabellen: ' + error.message);
    else {
      toast.push('Forslaget er slettet fra Suggestions tabellen.');
      dispatch('delete');
    }
  };

  const finishEditing = async () => {
    editExpression = false;
    editExample = false;
    editDefinition = false;

    const { error } = await updateSuggestion(suggestion);
    if (error) toast.push('Kunne ikke redigere forslaget:' + error.message);
    else toast.push('Forslaget er oppdatert.');
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents the default action of pressing Enter inside a textarea
      finishEditing();
    }
  };

</script>

<div class="flex flex-col m-auto mt-4 items-center w-full lg:w-1/3 md:w-2/3 p-6 border border-gray-300 rounded-lg">
  <h4 class="text-md font-semibold mb-2">Forslag:</h4>
  {#if editExpression}
    <textarea class="lg:w-2/3" bind:value={suggestion.expression} on:keydown={handleKeydown} />
    <button on:click={finishEditing}>
      Ferdig
    </button>
  {:else}
    <div class="flex items-center">
      <p class="text-gray-600">{suggestion.expression}</p>
      <button class="bg-transparent border-2 border-solid border-gray-200 text-black hover:bg-gray-200 ml-2 flex items-center justify-center" on:click={() => editExpression = !editExpression}>
        <Icon icon="material-symbols:edit-outline" width="1.2rem" height="1.2rem" />
      </button>
    </div>
  {/if}

  <h4 class="text-md font-semibold mb-2">Eksempel:</h4>
  {#if editExample}
    <textarea class="lg:w-2/3" bind:value={suggestion.example} on:keydown={handleKeydown} />
    <button on:click={finishEditing}>
      Ferdig
    </button>
  {:else}
    <div class="flex items-center">
      <p class="text-gray-600">{suggestion.example}</p>
      <button class="bg-transparent border-2 border-solid border-gray-200 text-black hover:bg-gray-200 ml-2 flex items-center justify-center" on:click={() => editExample = !editExample}>
        <Icon icon="material-symbols:edit-outline" width="1.2rem" height="1.2rem" />
      </button>
    </div>
  {/if}

  <h4 class="text-md font-semibold mb-2">Definisjon:</h4>
  {#if editDefinition}
    <textarea class="lg:w-2/3" bind:value={suggestion.definition} on:keydown={handleKeydown} />
    <button on:click={finishEditing}>
      Ferdig
    </button>
  {:else}
    <div class="flex items-center">
      <p class="text-gray-600 max-w-80">{suggestion.definition}</p>
      <button class="bg-transparent border-2 border-solid border-gray-200 text-black hover:bg-gray-200 ml-2 flex items-center justify-center" on:click={() => editDefinition = !editDefinition}>
        <Icon icon="material-symbols:edit-outline" width="1.2rem" height="1.2rem" />
      </button>
    </div>
  {/if}

  Teit?
  <label class="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" on:click={() => isTeit = !isTeit} class="sr-only peer">
    <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600" />
    <div class="peer-checked:translate-x-5 peer-checked:border-white absolute top-0.5 left-0.5 bg-white border border-gray-300 h-5 w-5 rounded-full transition-transform" />
  </label>

  <div class="flex space-x-4 mt-4">
    <button 
      on:click={handleNo} 
      class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none">
      Avslå
    </button>
    <button 
      on:click={handleYes} 
      class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none">
      Godkjenn
    </button>
  </div>
</div>
