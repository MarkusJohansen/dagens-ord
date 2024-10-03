<script lang="ts">
  import { toast } from "@zerodevx/svelte-toast";
  import { addSuggestion, deleteSuggestion, updateSuggestion } from "../api-client";
  import type { Suggestion } from "../types";
  import { createEventDispatcher } from "svelte";

  export let suggestion: Suggestion;
  let isTeit = false;
  let editExpression = false;
  let editExample = false;
  let editDefinition = false;

  enum SuggestionCell {
    Expression,
    Example,
    Definition,
  }
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

    console.log(suggestion);

    const {error } = await updateSuggestion(suggestion);
    
    if (error) toast.push("Kunne ikke redigere forslaget:" + error.message);
    else toast.push("Forslaget er oppdatert.");
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents the default action of pressing Enter inside a textarea
      finishEditing();
    }
  };

  const onCellClick = (cellType: SuggestionCell) => {
    if (cellType === SuggestionCell.Expression && !editExpression) {
      editExpression = true;
    } else if (cellType === SuggestionCell.Example && !editExample) {
      editExample = true;
    } else if (cellType === SuggestionCell.Definition && !editDefinition) {
      editDefinition = true;
    }
  };
</script>

<tr>
  <td>{suggestion.id}</td>
  <td
    class="hover:bg-slate-100 active:bg-slate-200 duration-200"
    on:click={() => onCellClick(SuggestionCell.Expression)}
  >
    {#if editExpression}
      <textarea
        bind:value={suggestion.expression}
        on:keydown={handleKeydown}
        class="border bg-slate-100"
        ></textarea>
    {:else}
      {suggestion.expression}
    {/if}
  </td>
  <td
    class="hover:bg-slate-100 active:bg-slate-200 duration-200"
    on:click={() => onCellClick(SuggestionCell.Example)}
  >
    {#if editExample}
      <textarea
        bind:value={suggestion.example}
        on:keydown={handleKeydown}
        class="border bg-slate-100"
        ></textarea>
    {:else}
      {suggestion.example}
    {/if}
  </td>
  <td
    class="hover:bg-slate-100 active:bg-slate-200 duration-200"
    on:click={() => onCellClick(SuggestionCell.Definition)}
  >
    {#if editDefinition}
      <textarea
        bind:value={suggestion.definition}
        on:keydown={handleKeydown}
        class="border bg-slate-100 h-full "
      ></textarea>
    {:else}
      {suggestion.definition}
    {/if}
  </td>
  <td>
    <label class="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        on:click={() => (isTeit = !isTeit)}
        class="sr-only peer"
      />
      <div
        class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600"
      />
      <div
        class="peer-checked:translate-x-5 peer-checked:border-white absolute top-0.5 left-0.5 bg-white border border-gray-300 h-5 w-5 rounded-full transition-transform"
      />
    </label>
  </td>
  <td>
    <div class="flex gap-2">
      <button
        on:click={() => handleNo()}
        class="px-4 py-2 bg-red-500 text-white hover:bg-red-700 focus:outline-none"
      >
        Avslå
      </button>
      <button
        on:click={() => handleYes()}
        class="px-4 py-2 bg-green-500 text-white hover:bg-green-700 focus:outline-none"
      >
        Godkjenn
      </button>
    </div>
  </td>
</tr>
