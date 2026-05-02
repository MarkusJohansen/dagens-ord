<script lang="ts">
  import { toast } from "@zerodevx/svelte-toast";
  import { signIn } from "../api-client";

  let email = "";
  let password = "";

  const handleLogIn = async (email: string, password: string) => {
    const { error } = await signIn(email, password);
    if (error) toast.push("Kunne ikke logge inn: " + error);
  };
</script>

<div class="w-screen h-screen flex justify-center items-center bg-brutal-yellow">
  <div class="border-2 border-black shadow-brutal-lg p-12 h-fit w-full md:w-1/2 bg-white">
    <h1 class="m-0 font-black uppercase tracking-tight text-3xl">Logg inn</h1>
    <p class="font-medium text-sm uppercase tracking-widest mt-1 mb-6 text-gray-600">
      Dagens Ord Administrator Dashboard
    </p>
    <div class="border-b-2 border-black mb-6"></div>
    <form class="w-full flex flex-col gap-4">
      <label class="font-black uppercase tracking-widest text-sm">
        Email
        <input type="email" bind:value={email} class="brutal-input w-full h-10 px-3 mt-1 block" />
      </label>
      <label class="font-black uppercase tracking-widest text-sm">
        Passord
        <input type="password" bind:value={password} class="brutal-input w-full h-10 px-3 mt-1 block" />
      </label>
      <button
        class="brutal-btn bg-black text-white mt-2 w-full h-12 text-base"
        on:click|preventDefault={() => handleLogIn(email, password)}
      >
        LOGG INN →
      </button>
    </form>
  </div>
</div>
