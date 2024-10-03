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

<div class="w-screen h-screen flex justify-center items-center bg-slate-50">
  <div
    class="border-1 rounded-md p-12 h-fit w-full md:w-1/2 shadow-2xl bg-white"
  >
    <h1 class="m-0">Logg inn</h1>
    <p>Dagens Ord Adminstrator Dashboard</p>
    <hr />
    <form class="w-full flex flex-col">
      Email
      <input type="email" bind:value={email} />
      Passord
      <input type="password" bind:value={password} />
      <button class="m-auto" on:click={() => handleLogIn(email, password)}>Logg inn</button>
    </form>
  </div>
</div>
