<script lang="ts">
    import { apps } from '$stores/citrix'; // importa la store real de apps
    import { derived, get } from 'svelte/store';
    import DoubleBarChart from '$lib/components/BarChartDouble.svelte';
    import type { AppDTO } from '$lib/types';
  
    // Guardamos solo el uid seleccionado para luego actualizar el objeto completo
    let selectedAppUid: string | null = null;
    let selectedApp: AppDTO | null = null;
  
    // Columnas para la tabla
    const columns = [
      { key: 'name', label: 'Nombre' },
      { key: 'enabled', label: 'Habilitada' }
    ];
  
    // Top 10 apps por uso = combinación de vdas y usuarios activos
    const top10Apps = derived(apps, $apps =>
      $apps
        .slice()
        .sort((a, b) => (b.vdas.length + b.activeUsers.length) - (a.vdas.length + a.activeUsers.length))
        .slice(0, 10)
    );
  
    // Datos para la gráfica
    const chartData = derived(top10Apps, ($top10Apps) =>
      $top10Apps.map(app => ({
        name: app.name,
        vdaCount: app.vdas.length,
        userCount: app.activeUsers.length
      }))
    );
  
    // Actualizar selectedApp cada vez que apps cambia para mantener datos frescos
    apps.subscribe($apps => {
      if (selectedAppUid) {
        const found = $apps.find(a => a.uid === selectedAppUid);
        selectedApp = found ?? null;
      }
    });
  
    // Función para seleccionar app y guardar uid
    function selectApp(app: AppDTO) {
      selectedAppUid = app.uid;
      selectedApp = app;
    }
  </script>
  
  <h1 class="text-2xl font-semibold mb-4">Página de Aplicaciones</h1>
  
  <div class="flex flex-col lg:flex-row gap-6">
    <!-- Tabla -->
    <div class="w-full lg:w-2/5 overflow-auto max-h-[400px] border rounded shadow-sm">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            {#each columns as col}
              <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {col.label}
              </th>
            {/each}
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each $apps as app}
            <tr
              class="cursor-pointer hover:bg-blue-100"
              class:selected={selectedApp?.uid === app.uid}
              on:click={() => selectApp(app)}
            >
              <td class="px-4 py-2">{app.name}</td>
              <td class="px-4 py-2">{app.enabled ? 'Sí' : 'No'}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  
    <!-- Gráfica -->
    <div class="w-full lg:w-3/5">
        <DoubleBarChart dataStore={chartData} title="Top 10 Apps por Uso" />
    </div>
  </div>
  
  {#if selectedApp}
    <div class="mt-8">
      <!-- Detalles generales ocupa todo el ancho -->
      <div class="bg-white rounded-lg shadow p-4 mb-6">
        <h2 class="text-lg font-semibold mb-3">Detalles de la Aplicación</h2>
        <ul class="text-sm space-y-1">
          <li><strong>UID:</strong> {selectedApp.uid}</li>
          <li><strong>Nombre:</strong> {selectedApp.name}</li>
          <li><strong>Application Name:</strong> {selectedApp.applicationName}</li>
          <li><strong>Browser Name:</strong> {selectedApp.browserName}</li>
          <li><strong>Published Name:</strong> {selectedApp.publishedName}</li>
          <li><strong>Máx Instancias Totales:</strong> {selectedApp.maxTotalInstances ?? 'N/A'}</li>
          <li><strong>Máx Instancias por Usuario:</strong> {selectedApp.maxPerUserInstances ?? 'N/A'}</li>
          <li><strong>Comando Ejecutable:</strong> {selectedApp.commandLineExecutable}</li>
          <li><strong>Argumentos:</strong> {selectedApp.commandLineArguments}</li>
          <li><strong>Directorio:</strong> {selectedApp.directory}</li>
          <li><strong>Carpeta Usuario:</strong> {selectedApp.userFolder}</li>
          <li><strong>Habilitada:</strong> {selectedApp.enabled ? 'Sí' : 'No'}</li>
          <li><strong>Executable Path:</strong> {selectedApp.executablePath}</li>
        </ul>
      </div>
  
      <!-- Listas Desktop Groups, VDAs y Usuarios Activos lado a lado con scroll -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Desktop Groups -->
        <div class="bg-white rounded-lg shadow p-4 overflow-auto max-h-64">
          <h3 class="font-semibold mb-2">Desktop Groups</h3>
          {#if selectedApp.desktopGroups.length > 0}
            <ul class="list-disc pl-5 text-sm space-y-1">
              {#each selectedApp.desktopGroups as group}
                <li>{group}</li>
              {/each}
            </ul>
          {:else}
            <p class="text-gray-500 text-sm">No hay Desktop Groups asignados.</p>
          {/if}
        </div>
  
        <!-- VDAs -->
        <div class="bg-white rounded-lg shadow p-4 overflow-auto max-h-64">
          <h3 class="font-semibold mb-2">VDAs</h3>
          {#if selectedApp.vdas.length > 0}
            <ul class="list-disc pl-5 text-sm space-y-1">
              {#each selectedApp.vdas as vda}
                <li>{vda}</li>
              {/each}
            </ul>
          {:else}
            <p class="text-gray-500 text-sm">No hay VDAs asignados.</p>
          {/if}
        </div>
  
        <!-- Usuarios Activos -->
        <div class="bg-white rounded-lg shadow p-4 overflow-auto max-h-64">
          <h3 class="font-semibold mb-2">Usuarios Activos</h3>
          {#if selectedApp.activeUsers.length > 0}
            <ul class="list-disc pl-5 text-sm space-y-1">
              {#each selectedApp.activeUsers as user}
                <li>{user}</li>
              {/each}
            </ul>
          {:else}
            <p class="text-gray-500 text-sm">No hay usuarios activos.</p>
          {/if}
        </div>
      </div>
    </div>
  {/if}
  
  <style>
    tr.selected {
      background-color: #bfdbfe; /* azul claro */
    }
  </style>
  