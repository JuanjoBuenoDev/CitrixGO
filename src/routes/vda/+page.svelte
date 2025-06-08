<script lang="ts">
    import { vdas } from '$stores/citrix';
    import { derived } from 'svelte/store';
    import Table from '$lib/components/Table.svelte';
    import BarChartSimple from '$lib/components/BarChartSimple.svelte';
    import type { VdaDTO } from '$lib/types';
  
    let selectedVda: VdaDTO | null = null;
  
    const columns = [
      { key: 'machineName', label: 'Machine Name' },
      { key: 'catalogName', label: 'Catalog Name' },
      { key: 'registrationState', label: 'Registration State' },
      { key: 'inMaintenanceMode', label: 'Maintenance Mode' }
    ];
  
    const top10VDAs = derived(vdas, ($vdas) =>
      $vdas
        .slice()
        .sort((a, b) => b.loadIndex - a.loadIndex)
        .slice(0, 10)
    );
  
    let labels: string[] = [];
    let data: number[] = [];
  
    $: {
      const top = $top10VDAs;
      labels = top.map((vda) => vda.machineName);
      data = top.map((vda) => vda.loadIndex);
    }
  
    function onSelectVda(vda: VdaDTO) {
      selectedVda = vda;
    }
  
    // 🔄 Verifica si el selectedVda sigue existiendo al actualizarse $vdas
    $: {
  const machineName = selectedVda?.machineName;
  if (machineName) {
    const stillExists = $vdas.some((vda) => vda.machineName === machineName);
    if (!stillExists) {
      selectedVda = null;
    }
  }
}

  </script>
  
  <h2 class="text-2xl font-semibold mb-6">Top 10 VDAs por Load Index</h2>

  <!-- Contenedor vertical -->
  <div class="flex flex-col gap-6">
    <!-- Gráfica arriba -->
    <div class="w-full min-h-[300px]">
      {#if labels.length > 0}
        <BarChartSimple {labels} {data} title="Load Index de VDAs" />
      {:else}
        <p class="text-gray-500">No hay datos disponibles.</p>
      {/if}
    </div>
  
    <!-- Tabla debajo -->
    <div class="w-full overflow-x-auto">
      <Table
        {columns}
        rows={$top10VDAs}
        on:select={(e) => onSelectVda(e.detail)}
        bind:selectedRow={selectedVda}
      />
    </div>
  </div>
  
  <!-- Detalles del VDA seleccionado debajo -->
  {#if selectedVda}
    <div class="mt-8 grid grid-cols-1 gap-6">
      <!-- Detalles -->
      <div class="bg-white rounded-xl shadow p-4">
        <h3 class="text-lg font-semibold mb-2">Detalles del VDA</h3>
        <ul class="text-sm space-y-1">
          <li><strong>Machine Name:</strong> {selectedVda.machineName}</li>
          <li><strong>Catalog Name:</strong> {selectedVda.catalogName}</li>
          <li><strong>Registration State:</strong> {selectedVda.registrationState}</li>
          <li><strong>Power State:</strong> {selectedVda.powerState}</li>
          <li><strong>Maintenance Mode:</strong> {selectedVda.inMaintenanceMode ? 'Yes' : 'No'}</li>
          <li><strong>Load Index:</strong> {selectedVda.loadIndex}</li>
          <li><strong>Agent Version:</strong> {selectedVda.agentVersion}</li>
          <li><strong>Desktop Group:</strong> {selectedVda.desktopGroupName}</li>
          <li><strong>OS Type:</strong> {selectedVda.osType}</li>
          <li><strong>Delivery Type:</strong> {selectedVda.deliveryType}</li>
          <li><strong>IP Address:</strong> {selectedVda.ipAddress}</li>
          <li><strong>Physical:</strong> {selectedVda.isPhysical}</li>
          <li><strong>Last Registration:</strong> {selectedVda.lastRegistrationTime}</li>
          <li><strong>Persist User Changes:</strong> {selectedVda.persistUserChanges}</li>
          <li><strong>Sessions Established:</strong> {selectedVda.sessionsEstablished}</li>
        </ul>
      </div>
  
      <!-- Aplicaciones -->
      <div class="bg-white rounded-xl shadow p-4 overflow-y-auto max-h-64">
        <h3 class="text-lg font-semibold mb-2">Aplicaciones</h3>
        {#if selectedVda.applications.length > 0}
          <ul class="list-disc pl-5 text-sm space-y-1">
            {#each selectedVda.applications as app}
              <li>{app}</li>
            {/each}
          </ul>
        {:else}
          <p class="text-gray-500">Este VDA no tiene aplicaciones asignadas.</p>
        {/if}
      </div>
    </div>
  {/if}
  