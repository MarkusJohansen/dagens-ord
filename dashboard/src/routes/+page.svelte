<script lang="ts">
  import "../app.css";
  import "chimeracss/build/chimera.css";
  import { SvelteToast, toast } from "@zerodevx/svelte-toast";
  import { onMount } from "svelte";
  import { getExpressions, supabase } from "../api-client";
  import { signIn, signOut } from "../api-client";
  import Panel from "../lib/Panel.svelte";
  import { getSuggestions } from "../api-client";
  import type { Suggestion } from "../types";
  import Table from "$lib/Table.svelte";

  let isLoggedIn = false;
  let email = "";
  let password = "";

  // fetch suggestions
  let suggestions: Suggestion[] = [];
  let expressionCount = 0;

  const fetchSuggestions = async () => {
    const { data, error } = await getSuggestions();
    if (data) {
      suggestions = data;
    } else if (error) {
      toast.push("Kunne ikke hente forslag.");
    }
  };

  const fetchExpressionCount = async () => {
    const { count, error } = await getExpressions();
    if (count) {
      expressionCount = count;
    } else if (error) {
      toast.push("Kunne ikke hente antall utrykk.");
    }
  };

  const handleSuggestionDeleted = () => {
    fetchSuggestions();
    fetchExpressionCount();
  };

  // Function to check the current session and update isLoggedIn state
  const checkSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      isLoggedIn = true;
    } else {
      isLoggedIn = false;
    }
  };

  // On mount, check the session and set up a subscription to listen for session changes
  onMount(() => {
    checkSession();
    fetchSuggestions();
    fetchExpressionCount();

    // Subscribe to auth state changes (e.g., login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      checkSession(); // Re-check session when there's a change
    });

    // Clean up the subscription on component unmount
    return () => {
      subscription?.unsubscribe();
    };
  });

  const handleLogIn = async () => {
    const { error } = await signIn(email, password);
    if (error) toast.push("Kunne ikke logge inn: " + error);
  };

  const handleLogOut = async () => {
    const { error } = await signOut();
    if (error) toast.push("Kunne ikke logge ut: " + error);
  };
</script>

<SvelteToast />
{#if isLoggedIn}
  <div class="flex flex-col h-full min-h-screen w-screen bg-slate-50">
    <nav
      class="fixed top-0 w-full h-16 bg-white shadow-lg flex items-center p-6"
    >
      <button on:click={handleLogOut}>Logg ut</button>
    </nav>
    <div class="mt-24 grid gap-4 p-10 grid-cols-1 lg:grid-cols-3">
      <div class="grid gap-4">
        <Panel>
          <p class="text-lg">
            Antall forslag: <span class="font-semibold">
              {suggestions.length}
            </span>
          </p>
        </Panel>
        <Panel>
          <p class="text-lg">
            Antall utrykk: <span class="font-semibold">
              {expressionCount}
            </span>
          </p>
        </Panel>
        <Panel>
          <h3 class="mt-0">Retningslinjer for utrykk</h3>
          <p>
            For at et utrykk skal kunne bli godkjennt må det opfylle følgende
            krav:
          </p>
          <ul>
            <li>Utrykket må være norsk</li>
            <li>Utrykket må være morsomt eller ha en morsom ordlyd</li>
            <li>Utrykket må være forståelig for de fleste</li>
            <li>
              Utrykket skal kunne være såpass dialektnøytralt, at hvem som helst
              skal kunne bruke det
            </li>
            <li>Utrykket skal ikke være rasistisk eller homofobisk</li>
          </ul>
        </Panel>
      </div>
      <Panel style="col-span-2 row-span-3">
        <h1 class="mt-0">Forslag</h1>
        <Table
          list={suggestions}
          onSuggestionDeleted={handleSuggestionDeleted}
        />
      </Panel>
    </div>
  </div>
{:else}
  <div class="w-screen h-screen flex justify-center items-center bg-slate-50">
    <div
      class="border-1 rounded-md p-6 flex flex-col items-center shadow-2xl bg-white"
    >
      <h2>Dagens Ord Adminstrator Dashboard</h2>
      <hr />
      <form class="w-full flex flex-col">
        Email
        <input type="email" bind:value={email} />
        Passord
        <input type="password" bind:value={password} />
        <button class="m-auto" on:click={handleLogIn}>Logg inn</button>
      </form>
    </div>
  </div>
{/if}
