<script lang="ts">
  import { onMount } from 'svelte';
  import { getDdcs } from '$lib/api';

  interface DDCDTO {
    dnsName: string;
    state: string;
    desktopsRegistered: number;
  }

  let ddcs: Record<string, DDCDTO> | null = null;
  let error = '';

  onMount(async () => {
    try {
      ddcs = await getDdcs();
      console.log('DDCs:', ddcs);
    } catch (e) {
      error = 'Error cargando DDCS: ' + (e instanceof Error ? e.message : String(e));
      console.error('Error en getDdcs:', e);
    }
  });
</script>

<h1 class="text-xl font-bold mb-4">DDCs</h1>

{#if error}
  <p class="text-red-600">{error}</p>
{:else if !ddcs}
  <p>Cargando DDCS...</p>
{:else}
  <ul>
    {#each Object.entries(ddcs) as [key, ddc]}
      <li><strong>{key}:</strong> {JSON.stringify(ddc)}</li>
    {/each}
  </ul>
{/if}
