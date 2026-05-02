<script lang="ts">
  import "../app.css";
  import { SvelteToast, toast } from "@zerodevx/svelte-toast";
  import { onMount } from "svelte";
  import { getExpressions, getSuggestions, signOut, supabase } from "../api-client";
  import Panel from "../lib/Panel.svelte";
  import Table from "$lib/Table.svelte";
  import Login from "$lib/Login.svelte";
  import ExpressionRow from "$lib/ExpressionRow.svelte";
  import type { Suggestion, ExpressionRecord } from "../types";

  let isLoggedIn = false;
  let activeTab: "suggestions" | "expressions" = "suggestions";
  let guidelinesOpen = false;

  // Suggestions state
  let suggestions: Suggestion[] = [];
  let suggestionsLoading = true;
  let suggestionSearch = "";
  let suggestionNsfwFilter: "all" | "nsfw" | "safe" = "all";
  let suggestionSort: "newest" | "alpha" | "alpha-desc" = "newest";

  // Expressions state
  let expressions: ExpressionRecord[] = [];
  let expressionsLoading = true;
  let expressionSearch = "";
  let expressionNsfwFilter: "all" | "nsfw" | "safe" = "all";
  let expressionSort: "alpha" | "alpha-desc" | "newest" = "alpha";

  type NsfwFilter = "all" | "nsfw" | "safe";
  const nsfwFilterOptions: { val: NsfwFilter; label: string }[] = [
    { val: "all", label: "Alle" },
    { val: "safe", label: "Trygt" },
    { val: "nsfw", label: "NSFW" },
  ];

  $: filteredSuggestions = suggestions
    .filter((s) => s.expression.toLowerCase().includes(suggestionSearch.toLowerCase()))
    .sort((a, b) =>
      suggestionSort === "alpha"
        ? a.expression.localeCompare(b.expression, "nb")
        : suggestionSort === "alpha-desc"
        ? b.expression.localeCompare(a.expression, "nb")
        : b.id - a.id
    );

  $: filteredExpressions = expressions
    .filter((e) => {
      const matchesSearch = e.expression.toLowerCase().includes(expressionSearch.toLowerCase());
      const matchesNsfw =
        expressionNsfwFilter === "all" ||
        (expressionNsfwFilter === "nsfw" && e.nsfw) ||
        (expressionNsfwFilter === "safe" && !e.nsfw);
      return matchesSearch && matchesNsfw;
    })
    .sort((a, b) =>
      expressionSort === "alpha"
        ? a.expression.localeCompare(b.expression, "nb")
        : expressionSort === "alpha-desc"
        ? b.expression.localeCompare(a.expression, "nb")
        : b.id - a.id
    );

  const loadSuggestions = async () => {
    suggestionsLoading = true;
    const { data, error } = await getSuggestions();
    if (data) suggestions = data;
    else if (error) toast.push("Kunne ikke hente forslag.");
    suggestionsLoading = false;
  };

  const loadExpressions = async () => {
    expressionsLoading = true;
    const { data, error } = await getExpressions();
    if (data) expressions = data;
    else if (error) toast.push("Kunne ikke hente uttrykk.");
    expressionsLoading = false;
  };

  const handleSuggestionDeleted = () => {
    loadSuggestions();
  };

  const handleExpressionDeleted = () => {
    loadExpressions();
  };

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    isLoggedIn = !!session;
  };

  onMount(() => {
    checkSession();
    loadSuggestions();
    loadExpressions();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkSession();
    });

    return () => subscription?.unsubscribe();
  });

  const handleLogOut = async () => {
    const { error } = await signOut();
    if (error) toast.push("Kunne ikke logge ut: " + error);
  };
</script>

<SvelteToast options={{ duration: 3000 }} />

{#if isLoggedIn}
  <div class="flex flex-col min-h-screen w-screen bg-brutal-yellow">

    <!-- Nav -->
    <nav class="fixed top-0 w-full h-14 bg-brutal-yellow border-b-4 border-black flex items-center justify-between px-5 md:px-10 z-50">
      <span class="font-black text-xs uppercase tracking-[0.25em]">★ DAGENS ORD ADMIN</span>
      <button class="brutal-btn bg-black text-white text-xs" on:click={handleLogOut}>Logg ut</button>
    </nav>

    <div class="mt-14 p-5 md:p-8 flex flex-col gap-5 max-w-screen-2xl mx-auto w-full">

      <!-- Stats row -->
      <div class="grid grid-cols-2 gap-4">
        <Panel>
          <p class="font-black uppercase tracking-widest text-xs text-gray-500 mb-1">Forslag</p>
          <p class="text-3xl md:text-4xl font-black">{suggestions.length}</p>
        </Panel>
        <Panel>
          <p class="font-black uppercase tracking-widest text-xs text-gray-500 mb-1">Uttrykk</p>
          <p class="text-3xl md:text-4xl font-black">{expressions.length}</p>
        </Panel>
      </div>

      <!-- Tabs -->
      <div class="flex border-b-4 border-black">
        <button
          class="px-5 py-2.5 font-black uppercase tracking-wide text-sm border-2 border-b-0 border-black transition-colors
            {activeTab === 'suggestions' ? 'bg-black text-white' : 'bg-white text-black hover:bg-brutal-yellow/60'}"
          on:click={() => (activeTab = "suggestions")}
        >
          Forslag {#if suggestions.length > 0}<span class="ml-1 bg-brutal-pink text-white text-xs px-1.5 py-0.5 font-black">{suggestions.length}</span>{/if}
        </button>
        <button
          class="px-5 py-2.5 font-black uppercase tracking-wide text-sm border-2 border-b-0 border-l-0 border-black transition-colors
            {activeTab === 'expressions' ? 'bg-black text-white' : 'bg-white text-black hover:bg-brutal-yellow/60'}"
          on:click={() => (activeTab = "expressions")}
        >
          Uttrykk
        </button>
      </div>

      <!-- Suggestions tab -->
      {#if activeTab === "suggestions"}
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-5">

          <!-- Sidebar -->
          <div class="lg:col-span-1 flex flex-col gap-4">
            <Panel>
              <button
                class="w-full flex items-center justify-between font-black uppercase tracking-wide text-xs"
                on:click={() => (guidelinesOpen = !guidelinesOpen)}
              >
                Retningslinjer
                <span class="text-base">{guidelinesOpen ? "↑" : "↓"}</span>
              </button>
              {#if guidelinesOpen}
                <ul class="text-sm space-y-2 list-none p-0 mt-3 border-t-2 border-black pt-3">
                  <li class="flex gap-2"><span class="font-black shrink-0">→</span>Uttrykket må være norsk</li>
                  <li class="flex gap-2"><span class="font-black shrink-0">→</span>Morsomt eller med morsom ordlyd</li>
                  <li class="flex gap-2"><span class="font-black shrink-0">→</span>Forståelig for de fleste</li>
                  <li class="flex gap-2"><span class="font-black shrink-0">→</span>Dialektnøytralt</li>
                  <li class="flex gap-2"><span class="font-black shrink-0">→</span>Ikke rasistisk eller homofobisk</li>
                </ul>
              {/if}
            </Panel>
          </div>

          <!-- Main content -->
          <div class="lg:col-span-3">
            <Panel>
              <!-- Controls -->
              <div class="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                  bind:value={suggestionSearch}
                  placeholder="Søk i forslag..."
                  class="brutal-input flex-1 h-10 px-3 text-sm"
                />
                <select bind:value={suggestionSort} class="brutal-input h-10 px-3 text-sm bg-white">
                  <option value="newest">Nyeste først</option>
                  <option value="alpha">A → Å</option>
                  <option value="alpha-desc">Å → A</option>
                </select>
              </div>

              {#if suggestionsLoading}
                <div class="flex items-center justify-center py-16">
                  <span class="font-black uppercase tracking-widest text-sm animate-pulse">Laster...</span>
                </div>
              {:else if filteredSuggestions.length === 0}
                <div class="flex flex-col items-center justify-center py-16 gap-2">
                  <span class="text-4xl">✓</span>
                  <span class="font-black uppercase tracking-wide text-sm">
                    {suggestionSearch ? "Ingen treff" : "Ingen forslag å behandle"}
                  </span>
                </div>
              {:else}
                <Table list={filteredSuggestions} onSuggestionDeleted={handleSuggestionDeleted} />
              {/if}
            </Panel>
          </div>
        </div>

      <!-- Expressions tab -->
      {:else if activeTab === "expressions"}
        <Panel>
          <!-- Controls -->
          <div class="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              bind:value={expressionSearch}
              placeholder="Søk i uttrykk..."
              class="brutal-input flex-1 h-10 px-3 text-sm"
            />
            <select bind:value={expressionSort} class="brutal-input h-10 px-3 text-sm bg-white">
              <option value="alpha">A → Å</option>
              <option value="alpha-desc">Å → A</option>
              <option value="newest">Nyeste først</option>
            </select>
            <div class="flex border-2 border-black shrink-0">
              {#each nsfwFilterOptions as opt}
                <button
                  class="px-3 h-10 font-black uppercase tracking-wide text-xs transition-colors border-r-2 border-black last:border-r-0
                    {expressionNsfwFilter === opt.val ? 'bg-black text-white' : 'bg-white hover:bg-brutal-yellow/60'}"
                  on:click={() => (expressionNsfwFilter = opt.val)}
                >{opt.label}</button>
              {/each}
            </div>
          </div>

          {#if expressionsLoading}
            <div class="flex items-center justify-center py-16">
              <span class="font-black uppercase tracking-widest text-sm animate-pulse">Laster...</span>
            </div>
          {:else if filteredExpressions.length === 0}
            <div class="flex flex-col items-center justify-center py-16 gap-2">
              <span class="text-4xl">∅</span>
              <span class="font-black uppercase tracking-wide text-sm">Ingen uttrykk funnet</span>
            </div>
          {:else}
            <!-- Mobile cards -->
            <div class="md:hidden flex flex-col gap-3">
              {#each filteredExpressions as expr (expr.id)}
                <ExpressionRow expression={expr} mobile={true} on:delete={handleExpressionDeleted} />
              {/each}
            </div>

            <!-- Desktop table -->
            <div class="hidden md:block overflow-x-auto">
              <table class="w-full border-2 border-black border-collapse">
                <thead>
                  <tr class="bg-black text-white">
                    <th class="px-4 py-3 text-left font-black uppercase tracking-wide text-xs border-r border-white/20 w-16">ID</th>
                    <th class="px-4 py-3 text-left font-black uppercase tracking-wide text-xs border-r border-white/20">Uttrykk</th>
                    <th class="px-4 py-3 text-left font-black uppercase tracking-wide text-xs border-r border-white/20">Eksempel</th>
                    <th class="px-4 py-3 text-left font-black uppercase tracking-wide text-xs border-r border-white/20">Definisjon</th>
                    <th class="px-4 py-3 text-left font-black uppercase tracking-wide text-xs border-r border-white/20 w-20">NSFW</th>
                    <th class="px-4 py-3 text-left font-black uppercase tracking-wide text-xs w-24">Slett</th>
                  </tr>
                </thead>
                <tbody>
                  {#each filteredExpressions as expr (expr.id)}
                    <ExpressionRow expression={expr} on:delete={handleExpressionDeleted} />
                  {/each}
                </tbody>
              </table>
            </div>
          {/if}
        </Panel>
      {/if}

    </div>
  </div>
{:else}
  <Login />
{/if}
