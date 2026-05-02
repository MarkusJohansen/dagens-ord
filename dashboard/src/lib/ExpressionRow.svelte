<script lang="ts">
  import { toast } from "@zerodevx/svelte-toast";
  import { deleteExpression, updateExpression } from "../api-client";
  import type { ExpressionRecord } from "../types";
  import { createEventDispatcher } from "svelte";

  export let expression: ExpressionRecord;
  export let mobile = false;

  $: lowQuality = expression.example.trim().length < 4 || expression.definition.trim().length < 4;

  let editExpr = false;
  let editExample = false;
  let editDefinition = false;
  let confirmDelete = false;

  const dispatch = createEventDispatcher();

  const handleDelete = async () => {
    const { error } = await deleteExpression(expression.id);
    if (error) toast.push("Kunne ikke slette: " + error.message);
    else { toast.push("Uttrykk slettet."); dispatch("delete"); }
    confirmDelete = false;
  };

  const handleNsfwToggle = async () => {
    expression.nsfw = !expression.nsfw;
    const { error } = await updateExpression(expression);
    if (error) { toast.push("Kunne ikke oppdatere NSFW: " + error.message); expression.nsfw = !expression.nsfw; }
  };

  const saveEdit = async () => {
    editExpr = false; editExample = false; editDefinition = false;
    const { error } = await updateExpression(expression);
    if (error) toast.push("Kunne ikke lagre: " + error.message);
    else toast.push("Uttrykk oppdatert.");
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Enter") { event.preventDefault(); saveEdit(); }
    if (event.key === "Escape") { editExpr = false; editExample = false; editDefinition = false; }
  };

  function updateField(event: Event, type: string) {
    const target = event.currentTarget as HTMLDivElement;
    if (type === "expression") expression.expression = target.innerText;
    else if (type === "example") expression.example = target.innerText;
    else expression.definition = target.innerText;
  }
</script>

{#if mobile}
  <div class="bg-white border-2 border-black shadow-brutal flex flex-col gap-3 p-4">
    <div class="flex items-start justify-between gap-3">
      <div class="flex-1 min-w-0">
        <span class="font-black uppercase tracking-widest text-xs text-gray-500 block mb-1">Uttrykk</span>
        {#if editExpr}
          <div
            contenteditable="true" role="textbox" aria-multiline="false" tabindex="0"
            class="border-2 border-black bg-brutal-yellow px-2 py-1 w-full outline-none font-black text-base"
            on:keydown={handleKeydown} on:blur={saveEdit}
            on:input={(e) => updateField(e, "expression")}
          >{expression.expression}</div>
        {:else}
          <button class="text-left font-black text-lg w-full hover:underline" on:click={() => (editExpr = true)}>
            {expression.expression}
          </button>
        {/if}
      </div>
      <label class="flex flex-col items-center gap-1 cursor-pointer shrink-0">
        <span class="font-black uppercase tracking-widest text-xs text-gray-500">NSFW</span>
        <div class="relative">
          <input type="checkbox" checked={expression.nsfw} on:click={handleNsfwToggle} class="sr-only peer" />
          <div class="w-10 h-6 bg-gray-200 border-2 border-black peer peer-checked:bg-brutal-teal transition-colors" />
          <div class="peer-checked:translate-x-4 absolute top-0.5 left-0.5 bg-white border-2 border-black h-5 w-5 transition-transform" />
        </div>
      </label>
    </div>

    <div>
      <span class="font-black uppercase tracking-widest text-xs text-gray-500 block mb-1">Eksempel</span>
      {#if editExample}
        <div contenteditable="true" role="textbox" aria-multiline="true" tabindex="0"
          class="border-2 border-black bg-brutal-yellow px-2 py-1 w-full outline-none text-sm"
          on:keydown={handleKeydown} on:blur={saveEdit} on:input={(e) => updateField(e, "example")}
        >{expression.example}</div>
      {:else}
        <p class="text-sm cursor-pointer hover:bg-brutal-yellow/40 px-1 -mx-1 transition-colors" on:click={() => (editExample = true)}>
          {expression.example || "—"}
        </p>
      {/if}
    </div>

    <div>
      <span class="font-black uppercase tracking-widest text-xs text-gray-500 block mb-1">Definisjon</span>
      {#if editDefinition}
        <div contenteditable="true" role="textbox" aria-multiline="true" tabindex="0"
          class="border-2 border-black bg-brutal-yellow px-2 py-1 w-full outline-none text-sm"
          on:keydown={handleKeydown} on:blur={saveEdit} on:input={(e) => updateField(e, "definition")}
        >{expression.definition}</div>
      {:else}
        <p class="text-sm cursor-pointer hover:bg-brutal-yellow/40 px-1 -mx-1 transition-colors" on:click={() => (editDefinition = true)}>
          {expression.definition || "—"}
        </p>
      {/if}
    </div>

    {#if confirmDelete}
      <div class="flex items-center gap-3 border-2 border-black bg-brutal-pink/20 p-3">
        <span class="font-bold text-sm flex-1">Slett dette uttrykket?</span>
        <button class="brutal-btn bg-brutal-pink text-white text-xs px-3 py-1" on:click={handleDelete}>Slett</button>
        <button class="brutal-btn bg-white text-black text-xs px-3 py-1" on:click={() => (confirmDelete = false)}>Avbryt</button>
      </div>
    {:else}
      <button class="brutal-btn bg-brutal-pink text-white text-xs w-full" on:click={() => (confirmDelete = true)}>
        Slett
      </button>
    {/if}
  </div>
{:else}
  <tr class="border-b-2 border-black transition-colors even:bg-brutal-yellow/20 hover:bg-brutal-yellow/40">
    <td class="px-4 py-3 border-r-2 border-black cursor-pointer" on:click={() => (editExpr = true)}>
      {#if editExpr}
        <div contenteditable="true" role="textbox" aria-multiline="false" tabindex="0"
          class="border-2 border-black bg-brutal-yellow px-2 py-1 outline-none font-semibold w-full"
          on:keydown={handleKeydown} on:blur={saveEdit} on:input={(e) => updateField(e, "expression")}
        >{expression.expression}</div>
      {:else}
        <div class="flex items-center gap-2">
          <span class="font-semibold">{expression.expression}</span>
          {#if lowQuality}
            <span class="inline-flex items-center gap-1 border-2 border-black bg-brutal-orange text-white text-xs font-black px-2 py-0.5 shrink-0">⚠ MANGLER INFO</span>
          {/if}
        </div>
      {/if}
    </td>
    <td class="px-4 py-3 border-r-2 border-black cursor-pointer text-sm max-w-[200px]" on:click={() => (editExample = true)}>
      {#if editExample}
        <div contenteditable="true" role="textbox" aria-multiline="true" tabindex="0"
          class="border-2 border-black bg-brutal-yellow px-2 py-1 outline-none w-full"
          on:keydown={handleKeydown} on:blur={saveEdit} on:input={(e) => updateField(e, "example")}
        >{expression.example}</div>
      {:else}
        {expression.example}
      {/if}
    </td>
    <td class="px-4 py-3 border-r-2 border-black cursor-pointer text-sm max-w-[200px]" on:click={() => (editDefinition = true)}>
      {#if editDefinition}
        <div contenteditable="true" role="textbox" aria-multiline="true" tabindex="0"
          class="border-2 border-black bg-brutal-yellow px-2 py-1 outline-none w-full"
          on:keydown={handleKeydown} on:blur={saveEdit} on:input={(e) => updateField(e, "definition")}
        >{expression.definition}</div>
      {:else}
        {expression.definition}
      {/if}
    </td>
    <td class="px-4 py-3 border-r-2 border-black">
      <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={expression.nsfw} on:click={handleNsfwToggle} class="sr-only peer" />
        <div class="w-10 h-6 bg-gray-200 border-2 border-black peer peer-checked:bg-brutal-teal transition-colors" />
        <div class="peer-checked:translate-x-4 absolute top-0.5 left-0.5 bg-white border-2 border-black h-5 w-5 transition-transform" />
      </label>
    </td>
    <td class="px-4 py-3">
      {#if confirmDelete}
        <div class="flex items-center gap-2 bg-brutal-pink/20 border-2 border-black px-2 py-1">
          <span class="text-xs font-bold whitespace-nowrap">Slett?</span>
          <button class="brutal-btn bg-brutal-pink text-white text-xs px-2 py-0.5" on:click={handleDelete}>Ja</button>
          <button class="brutal-btn bg-white text-black text-xs px-2 py-0.5" on:click={() => (confirmDelete = false)}>Nei</button>
        </div>
      {:else}
        <button class="brutal-btn bg-brutal-pink text-white text-xs" on:click={() => (confirmDelete = true)}>Slett</button>
      {/if}
    </td>
  </tr>
{/if}
