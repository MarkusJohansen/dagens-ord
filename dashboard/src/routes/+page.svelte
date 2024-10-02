<script lang="ts">
  import '../app.css';
  import SuggestionList from '$lib/SuggestionList.svelte';
  import "chimeracss/build/chimera-plain.css";
  import { SvelteToast, toast } from '@zerodevx/svelte-toast';
  import { onMount } from 'svelte';
  import { supabase } from '../api-client';
  import { signIn, signOut } from '../api-client';

  let isLoggedIn = false;
  let email = "";
  let password = "";

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
  <div class="flex flex-col">
    <button class="fixed lg:left-16 top-4" on:click={handleLogOut}>Logg ut</button>
    <SuggestionList />
  </div>
{:else}
  <form class="w-1/4 m-auto flex flex-col">
    Email
    <input type="email" bind:value={email} />
    Passord
    <input type="password" bind:value={password} />
    <button class="m-auto" on:click={handleLogIn}>Logg inn</button>    
  </form>
{/if}
