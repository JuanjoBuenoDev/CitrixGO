<script lang="ts">
  import Table from '$lib/components/Table.svelte';
  import UserCountChart from '$lib/components/UserCountChart.svelte';
  import { ddc, citrixsite, users } from '$stores/citrix';

  let error = '';

  function formatBoolean(value: any): string {
    if (value === true) return 'Sí';
    if (value === false) return 'No';
    return String(value);
  }

  $: citrixLicenseRows = $citrixsite
    ? [
        { label: 'Edición de licencia', value: $citrixsite.licenseEdition },
        { label: 'Servidor de licencia', value: $citrixsite.licenseServerName },
        { label: 'Puerto licencia', value: $citrixsite.licenseServerPort },
        { label: 'Horas gracia licencia', value: $citrixsite.licensingGraceHoursLeft },
        { label: 'Periodo gracia activo', value: formatBoolean($citrixsite.licensingGracePeriodActive) },
        { label: 'Cache local activada', value: formatBoolean($citrixsite.localHostCacheEnabled) },
        { label: 'Usuarios concurrentes pico', value: $citrixsite.peakConcurrentLicenseUsers },
        { label: 'Dispositivos licenciados pico', value: $citrixsite.peakConcurrentLicensedDevices },
        { label: 'Sitio Data Store', value: $citrixsite.dataStoreSite },
        { label: 'Monitor Data Store', value: $citrixsite.dataStoreMonitor },
        { label: 'Log Data Store', value: $citrixsite.dataStoreLog }
      ]
    : [];

  // Reactivo para obtener el número actual de usuarios del store
  $: userCount = $users ? $users.length : 0;
</script>

<div class="space-y-8">
  <!-- Sección DDCs -->
  <section>
    <h1 class="text-xl font-bold mb-4">DDCs (desde store)</h1>

    {#if error}
      <p class="text-red-600">{error}</p>
    {:else if !$ddc || $ddc.length === 0}
      <p class="text-gray-600">Cargando DDCS...</p>
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
  </section>

  <!-- Sección Información del sitio -->
  <section>
    <h1 class="text-xl font-bold mb-4">Información del sitio Citrix</h1>

    {#if !$citrixsite}
      <p class="text-gray-600">Cargando información del sitio...</p>
    {:else}
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <table class="min-w-full">
          <tbody>
            {#each citrixLicenseRows as row, i}
              <tr class="{i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors">
                <td class="border-b border-gray-200 px-6 py-3 font-semibold text-gray-700 w-1/3">
                  {row.label}
                </td>
                <td class="border-b border-gray-200 px-6 py-3 text-gray-900">
                  {row.value || 'N/A'}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </section>

  <!-- Sección Gráfica de usuarios -->
  <section>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-gray-800">
        Usuarios conectados (última hora)
      </h2>
      <div class="text-sm text-gray-600">
        Usuarios actuales: <span class="font-bold text-blue-600">{userCount}</span>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-md">
      <UserCountChart userCount={userCount} />
    </div>
  </section>
</div>