<script lang="ts">
  import '../app.css';
  import SuggestionList from '$lib/SuggestionList.svelte';
  import "chimeracss/build/chimera.css";
  import { SvelteToast, toast } from '@zerodevx/svelte-toast';
  import { onMount } from 'svelte';
  import { supabase } from '../api-client';
  import { signIn, signOut } from '../api-client';
  import Panel from '../lib/Panel.svelte';
  import { getSuggestions } from '../api-client';
  import type { Suggestion } from '../types';
  import Table from '$lib/Table.svelte';


  let isLoggedIn = false;
  let email = "";
  let password = "";

  // fetch suggestions
  let suggestions: Suggestion[] = [];

  const fetchSuggestions = async () => {
    const { data, error } = await getSuggestions();
    if (data) {
      suggestions = data;
    } else if (error) {
      toast.push('Kunne ikke hente forslag.');
    }
  };

  
  const handleSuggestionDeleted = () => {
    fetchSuggestions();
  };



  // Function to check the current session and update isLoggedIn state
  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
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

    // Subscribe to auth state changes (e.g., login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      checkSession();  // Re-check session when there's a change
    });

    // Clean up the subscription on component unmount
    return () => {
      subscription?.unsubscribe();
    };
  });

  const handleLogIn = async () => {
    const { error } = await signIn(email, password);
    if (error) toast.push('Kunne ikke logge inn: ' + error);
  }

  const handleLogOut = async () => {
    const { error } = await signOut();
    if (error) toast.push('Kunne ikke logge ut: ' + error);
  }

</script>

<SvelteToast />
{#if isLoggedIn}
  <div class="flex flex-col h-full min-h-screen w-screen bg-slate-50">
    <nav class="fixed top-0 w-full h-16 bg-white shadow-lg flex items-center p-6">
      <button on:click={handleLogOut}>Logg ut</button>
    </nav>
    <div class="mt-24 grid gap-4 p-10">
      <div class="grid gap-4 grid-cols-2 grid-flow-dense">
        <Panel>
          <p class="text-lg">Antall forslag: <span class="font-semibold">
            {suggestions.length}
          </span></p>
        </Panel>
        <Panel>
          <p class="text-lg">Antall utrykk: <span class="font-semibold">
            {suggestions.length}
          </span></p>
        </Panel>
      </div>
      <Panel>
        <h1>Forslag</h1>
        <Table list={suggestions} onSuggestionDeleted={handleSuggestionDeleted}/>
      </Panel>
    </div>
    <SuggestionList suggestions={suggestions} onSuggestionDeleted={handleSuggestionDeleted}/> -->
  </div>
{:else}
  <div class="w-screen h-screen flex justify-center items-center bg-slate-50">
    <div class="border-1 rounded-md p-6 flex flex-col items-center shadow-2xl bg-white">
      <h2>Dagens Ord Adminstrator Dashboard</h2>
      <hr/>
      <form class="w-full flex flex-col ">
        Email
        <input type="email" bind:value={email} />
        Passord
        <input type="password" bind:value={password} />
        <button class="m-auto" on:click={handleLogIn}>Logg inn</button>    
      </form>
    </div>
  </div>
{/if}
