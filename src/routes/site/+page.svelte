<script lang="ts">
  import Table from '$lib/components/Table.svelte';
  import type { DDCDTO } from '$lib/types/DDCDTO';
  import type { CitrixSiteDTO } from '$lib/types/CitrixSiteDTO';
  import { ddc, citrixsite } from '$stores/citrix';

  let error = ''; // Opcional: si quieres mostrar errores propios de la UI, pero conexión ya no es manejada aquí

  // Función para formatear valores booleanos a Sí / No
  function formatBoolean(value: any): string {
    if (value === true) return 'Sí';
    if (value === false) return 'No';
    return String(value);
  }

  // Convertimos $citrixsite a array clave-valor para filas con valores formateados
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

<h1 class="text-xl font-bold mt-8 mb-4">Información del sitio Citrix</h1>

{#if !$citrixsite}
  <p>Cargando información del sitio...</p>
{:else}
  <table class="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
    <tbody>
      {#each citrixLicenseRows as row, i}
        <tr class="{i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors">
          <td class="border px-6 py-3 font-semibold text-gray-700 w-1/3">{row.label}</td>
          <td class="border px-6 py-3 text-gray-900">{row.value}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
