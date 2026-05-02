<script lang="ts">
  import { toast } from "@zerodevx/svelte-toast";
  import { addSuggestion, deleteSuggestion, updateSuggestion } from "../api-client";
  import type { Suggestion } from "../types";
  import { createEventDispatcher } from "svelte";

  export let suggestion: Suggestion;
  export let mobile = false;
  export let isSelected = false;

  $: lowQuality = suggestion.example.trim().length < 4 || suggestion.definition.trim().length < 4;

  let isTeit = false;
  let editExpression = false;
  let editExample = false;
  let editDefinition = false;
  let pendingAction: "approve" | "reject" | null = null;

  const dispatch = createEventDispatcher();

  const handleApprove = async () => {
    const { error } = await addSuggestion({
      expression: suggestion.expression,
      example: suggestion.example,
      definition: suggestion.definition,
      nsfw: isTeit,
    });
    if (error) {
      toast.push("Kunne ikke legge forslaget inn: " + error.message);
    } else {
      toast.push("Forslaget er godkjent ✓");
      await handleReject();
    }
    pendingAction = null;
  };

  const handleReject = async () => {
    const { error } = await deleteSuggestion(suggestion);
    if (error) {
      toast.push("Forslaget kunne ikke slettes: " + error.message);
    } else {
      if (pendingAction === "reject") toast.push("Forslaget er avslått.");
      dispatch("delete");
    }
    pendingAction = null;
  };

  const confirmAction = async () => {
    if (pendingAction === "approve") await handleApprove();
    else if (pendingAction === "reject") await handleReject();
  };

  const finishEditing = async () => {
    editExpression = false;
    editExample = false;
    editDefinition = false;
    const { error } = await updateSuggestion(suggestion);
    if (error) toast.push("Kunne ikke redigere forslaget: " + error.message);
    else toast.push("Forslaget er oppdatert.");
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Enter") { event.preventDefault(); finishEditing(); }
    if (event.key === "Escape") { editExpression = false; editExample = false; editDefinition = false; }
  };

  function updateField(event: Event, type: string) {
    const target = event.currentTarget as HTMLDivElement;
    if (type === "expression") suggestion.expression = target.innerText;
    else if (type === "example") suggestion.example = target.innerText;
    else suggestion.definition = target.innerText;
  }
</script>

{#if mobile}
  <!-- Mobile card view -->
  <div class="bg-white border-2 border-black shadow-brutal flex flex-col gap-4 p-4 {isSelected ? 'border-brutal-blue' : ''}">
    <!-- Checkbox + Expression + NSFW toggle -->
    <div class="flex items-start justify-between gap-3">
      <input
        type="checkbox"
        checked={isSelected}
        on:click={() => dispatch("toggle")}
        class="w-4 h-4 mt-1 cursor-pointer accent-brutal-teal shrink-0"
      />
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <span class="font-black uppercase tracking-widest text-xs text-gray-500">Uttrykk</span>
          {#if lowQuality}<span class="text-xs font-black bg-brutal-orange text-white px-2 py-0.5 uppercase tracking-wide">Mangler info</span>{/if}
        </div>
        {#if editExpression}
          <div
            contenteditable="true"
            role="textbox"
            aria-multiline="false"
            tabindex="0"
            class="border-2 border-black bg-brutal-yellow px-2 py-1 w-full outline-none font-black text-base"
            on:keydown={handleKeydown}
            on:blur={finishEditing}
            on:input={(e) => updateField(e, "expression")}
          >{suggestion.expression}</div>
        {:else}
          <button
            class="text-left font-black text-lg w-full hover:underline"
            on:click={() => (editExpression = true)}
            title="Trykk for å redigere"
          >{suggestion.expression}</button>
        {/if}
      </div>
      <label class="flex flex-col items-center gap-1 cursor-pointer shrink-0">
        <span class="font-black uppercase tracking-widest text-xs text-gray-500">NSFW</span>
        <div class="relative">
          <input type="checkbox" on:click={() => (isTeit = !isTeit)} class="sr-only peer" />
          <div class="w-10 h-6 bg-gray-200 border-2 border-black peer peer-checked:bg-brutal-teal transition-colors" />
          <div class="peer-checked:translate-x-4 absolute top-0.5 left-0.5 bg-white border-2 border-black h-5 w-5 transition-transform" />
        </div>
      </label>
    </div>

    <!-- Example -->
    <div>
      <span class="font-black uppercase tracking-widest text-xs text-gray-500 block mb-1">Eksempel</span>
      {#if editExample}
        <div
          contenteditable="true"
          role="textbox"
          aria-multiline="true"
          tabindex="0"
          class="border-2 border-black bg-brutal-yellow px-2 py-1 w-full outline-none text-sm"
          on:keydown={handleKeydown}
          on:blur={finishEditing}
          on:input={(e) => updateField(e, "example")}
        >{suggestion.example}</div>
      {:else}
        <p
          class="text-sm cursor-pointer hover:bg-brutal-yellow/40 px-1 -mx-1 transition-colors"
          on:click={() => (editExample = true)}
          title="Trykk for å redigere"
        >{suggestion.example || "—"}</p>
      {/if}
    </div>

    <!-- Definition -->
    <div>
      <span class="font-black uppercase tracking-widest text-xs text-gray-500 block mb-1">Definisjon</span>
      {#if editDefinition}
        <div
          contenteditable="true"
          role="textbox"
          aria-multiline="true"
          tabindex="0"
          class="border-2 border-black bg-brutal-yellow px-2 py-1 w-full outline-none text-sm"
          on:keydown={handleKeydown}
          on:blur={finishEditing}
          on:input={(e) => updateField(e, "definition")}
        >{suggestion.definition}</div>
      {:else}
        <p
          class="text-sm cursor-pointer hover:bg-brutal-yellow/40 px-1 -mx-1 transition-colors"
          on:click={() => (editDefinition = true)}
          title="Trykk for å redigere"
        >{suggestion.definition || "—"}</p>
      {/if}
    </div>

    <!-- Confirm prompt or action buttons -->
    {#if pendingAction}
      <div class="flex items-center gap-3 border-2 border-black bg-brutal-yellow p-3">
        <span class="font-bold text-sm flex-1">
          {pendingAction === "approve" ? "Godkjenne dette uttrykket?" : "Avslå dette forslaget?"}
        </span>
        <button class="brutal-btn bg-black text-white text-xs px-3 py-1" on:click={confirmAction}>Ja</button>
        <button class="brutal-btn bg-white text-black text-xs px-3 py-1" on:click={() => (pendingAction = null)}>Nei</button>
      </div>
    {:else}
      <div class="flex gap-2">
        <button
          class="brutal-btn bg-brutal-pink text-white text-xs flex-1"
          on:click={() => (pendingAction = "reject")}
        >Avslå</button>
        <button
          class="brutal-btn bg-brutal-teal text-black text-xs flex-1"
          on:click={() => (pendingAction = "approve")}
        >Godkjenn</button>
      </div>
    {/if}
  </div>
{:else}
  <!-- Desktop table row -->
  <tr class="border-b-2 border-black transition-colors {isSelected ? 'bg-brutal-blue/10' : 'even:bg-brutal-yellow/20 hover:bg-brutal-yellow/40'}">
    <td class="px-3 py-3 border-r-2 border-black text-center w-10">
      <input
        type="checkbox"
        checked={isSelected}
        on:click={() => dispatch("toggle")}
        class="w-4 h-4 cursor-pointer accent-brutal-teal"
      />
    </td>
    <td
      class="px-4 py-3 border-r-2 border-black cursor-pointer"
      on:click={() => (editExpression = true)}
    >
      {#if editExpression}
        <div
          contenteditable="true"
          role="textbox"
          aria-multiline="false"
          tabindex="0"
          class="border-2 border-black bg-brutal-yellow px-2 py-1 w-full outline-none font-semibold"
          on:keydown={handleKeydown}
          on:blur={finishEditing}
          on:input={(e) => updateField(e, "expression")}
        >{suggestion.expression}</div>
      {:else}
        <div class="flex items-center gap-2">
          <span class="font-semibold">{suggestion.expression}</span>
          {#if lowQuality}
            <span class="inline-flex items-center gap-1 border-2 border-black bg-brutal-orange text-white text-xs font-black px-2 py-0.5 shrink-0">⚠ MANGLER INFO</span>
          {/if}
        </div>
      {/if}
    </td>
    <td
      class="px-4 py-3 border-r-2 border-black cursor-pointer text-sm max-w-[200px]"
      on:click={() => (editExample = true)}
    >
      {#if editExample}
        <div
          contenteditable="true"
          role="textbox"
          aria-multiline="true"
          tabindex="0"
          class="border-2 border-black bg-brutal-yellow px-2 py-1 w-full outline-none"
          on:keydown={handleKeydown}
          on:blur={finishEditing}
          on:input={(e) => updateField(e, "example")}
        >{suggestion.example}</div>
      {:else}
        {suggestion.example}
      {/if}
    </td>
    <td
      class="px-4 py-3 border-r-2 border-black cursor-pointer text-sm max-w-[200px]"
      on:click={() => (editDefinition = true)}
    >
      {#if editDefinition}
        <div
          contenteditable="true"
          role="textbox"
          aria-multiline="true"
          tabindex="0"
          class="border-2 border-black bg-brutal-yellow px-2 py-1 w-full outline-none"
          on:keydown={handleKeydown}
          on:blur={finishEditing}
          on:input={(e) => updateField(e, "definition")}
        >{suggestion.definition}</div>
      {:else}
        {suggestion.definition}
      {/if}
    </td>
    <td class="px-4 py-3 border-r-2 border-black">
      <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" on:click={() => (isTeit = !isTeit)} class="sr-only peer" />
        <div class="w-10 h-6 bg-gray-200 border-2 border-black peer peer-checked:bg-brutal-teal transition-colors" />
        <div class="peer-checked:translate-x-4 absolute top-0.5 left-0.5 bg-white border-2 border-black h-5 w-5 transition-transform" />
      </label>
    </td>
    <td class="px-4 py-3">
      {#if pendingAction}
        <div class="flex items-center gap-2 bg-brutal-yellow border-2 border-black px-2 py-1">
          <span class="text-xs font-bold whitespace-nowrap">
            {pendingAction === "approve" ? "Godkjenne?" : "Avslå?"}
          </span>
          <button class="brutal-btn bg-black text-white text-xs px-2 py-0.5" on:click={confirmAction}>Ja</button>
          <button class="brutal-btn bg-white text-black text-xs px-2 py-0.5" on:click={() => (pendingAction = null)}>Nei</button>
        </div>
      {:else}
        <div class="flex gap-2">
          <button class="brutal-btn bg-brutal-pink text-white text-xs" on:click={() => (pendingAction = "reject")}>Avslå</button>
          <button class="brutal-btn bg-brutal-teal text-black text-xs" on:click={() => (pendingAction = "approve")}>Godkjenn</button>
        </div>
      {/if}
    </td>
  </tr>
{/if}
