<script lang="ts">
	import { onMount } from 'svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import AppBar from '$lib/components/AppBar.svelte';
	import { citrixSyncService } from '$lib/services/CitrixSyncService';
	import '../app.css';

	onMount(() => {
		citrixSyncService.start();
	});
</script>

<div class="flex h-screen flex-col md:flex-row">
	<!-- Sidebar se adapta dentro -->
	<Sidebar />

	<!-- Contenido -->
	<div class="flex flex-col flex-1 md:ml-64">
		<AppBar />
		<main class="p-6 overflow-y-auto flex-1 mb-12 md:mb-0">
			<slot />
		</main>
	</div>
</div>
