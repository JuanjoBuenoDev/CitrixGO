<script lang="ts">
	import { onDestroy } from 'svelte';
	import Table from '$lib/components/Table.svelte';
	import type { DDCDTO } from '$lib/types/DDCDTO';
	import { ddc } from '$stores/citrix';
  
	let error = '';
	let unsubscribe: () => void;
  
	// Solo nos suscribimos al store, no abrimos WebSocket aquí
	unsubscribe = ddc.subscribe((val) => {
	  console.log('📦 DDC Store actualizado:', val);
	  // Si quieres, aquí podrías resetear error cuando haya datos válidos
	  if (val && val.length > 0) {
		error = '';
	  }
	});
  
	onDestroy(() => {
	  unsubscribe?.();
	});
  </script>
  
  <h1 class="text-xl font-bold mb-4">DDCs (desde store)</h1>
  
  {#if error}
	<p class="text-red-600">{error}</p>
  {:else if !$ddc || $ddc.length === 0}
	<p>Cargando DDCS...</p>
  {:else}
	<Table
	  rows={$ddc}
	  columns={[
		{ key: 'dnsName', label: 'DNS Name' },
		{ key: 'state', label: 'Estado' },
		{ key: 'desktopsRegistered', label: 'Escritorios Registrados' }
	  ]}
	/>
  {/if}
