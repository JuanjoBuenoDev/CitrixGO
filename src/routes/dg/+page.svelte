<script lang="ts">
	import { deliveryGroups } from '$stores/citrix';
	import { derived } from 'svelte/store';
	import PieChart from '$lib/components/PieChart.svelte';
	import Table from '$lib/components/Table.svelte';
	import type { DgDTO } from '$lib/types';

	const top10DGs = derived(deliveryGroups, ($deliveryGroups) => {
		return $deliveryGroups
			.map(dg => ({
				name: dg.name,
				vdaCount: dg.vdas.length,
				original: dg
			}))
			.sort((a, b) => b.vdaCount - a.vdaCount)
			.slice(0, 10);
	});

	const columns = [
		{ key: 'name', label: 'Delivery Group' },
		{ key: 'vdaCount', label: 'Número de VDAs' }
	];

	let labels: string[] = [];
	let data: number[] = [];
	let selectedDG: DgDTO | null = null;

	$: {
		const dgs = $top10DGs;
		labels = dgs.map(d => d.name);
		data = dgs.map(d => d.vdaCount);
	}
</script>

<h2 class="text-xl font-bold text-gray-700 mb-6">Top 10 Delivery Groups con más VDAs</h2>

<div class="flex flex-col lg:flex-row gap-6">
	<!-- Tabla -->
	<div class="w-full lg:w-1/2">
		<Table
			{columns}
			rows={$top10DGs}
			selectedRow={selectedDG}
			on:select={(e) => selectedDG = e.detail.original}
		/>
	</div>

	<!-- Gráfica -->
	<div class="w-full lg:w-1/2 flex items-center justify-center">
		{#if labels.length > 0}
			<PieChart {labels} {data} title="VDAs por Delivery Group" />
		{:else}
			<p class="text-gray-500">No hay datos disponibles.</p>
		{/if}
	</div>
</div>

<!-- Detalle del DG seleccionado -->
{#if selectedDG}
	<div class="mt-8">
		<h3 class="text-lg font-semibold text-gray-800 mb-4">Detalles de "{selectedDG.name}"</h3>

		<div class="flex flex-col md:flex-row gap-6">
			<!-- Info del DG -->
			<div class="w-full md:w-1/2 border rounded-lg p-4 shadow bg-white space-y-2">
				<p><strong>UID:</strong> {selectedDG.uid}</p>
				<p><strong>Nombre:</strong> {selectedDG.name}</p>
				<p><strong>Estado:</strong> {selectedDG.state}</p>
				<p><strong>Sesiones activas:</strong> {selectedDG.sessionCount}</p>
				<p><strong>Índice de carga promedio:</strong> {selectedDG.averageLoadIndex}</p>
				<p><strong>Modo mantenimiento:</strong> {selectedDG.isMaintenanceMode ? 'Sí' : 'No'}</p>

				<hr class="my-2" />

				<h4 class="font-semibold text-gray-700">Configuración de reinicio</h4>
				<p><strong>Reinicio habilitado:</strong> {selectedDG.rebootEnabled ? 'Sí' : 'No'}</p>
				<p><strong>Frecuencia:</strong> {selectedDG.rebootFrequency}</p>
				<p><strong>Días:</strong> {selectedDG.rebootDaysOfWeek}</p>
				<p><strong>Inicio:</strong> {selectedDG.rebootStartTime}</p>
				<p><strong>Duración:</strong> {selectedDG.rebootDuration}</p>
			</div>

			<!-- Lista de VDAs -->
			<div class="w-full md:w-1/2 border rounded-lg p-4 shadow bg-white h-[300px] overflow-y-auto">
				<h4 class="font-semibold text-gray-700 mb-2">VDAs asociados</h4>
				{#if selectedDG.vdas.length > 0}
					<ul class="space-y-1 text-sm text-gray-700">
						{#each selectedDG.vdas as vda}
							<li class="border-b pb-1 truncate">{vda}</li>
						{/each}
					</ul>
				{:else}
					<p class="text-gray-500">No hay VDAs asociados.</p>
				{/if}
			</div>
		</div>
	</div>
{/if}
