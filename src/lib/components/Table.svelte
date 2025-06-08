<script lang="ts">
  export let rows: any[] = [];
  export let columns: { key: string; label: string }[] = [];
  export let rowMode = false; // nuevo flag para modo fila en vez de columnas
</script>

<table class="min-w-full border-collapse rounded-lg overflow-hidden shadow-lg">
  {#if !rowMode}
    <thead>
      <tr class="bg-gradient-to-r from-blue-600 to-gray-900 text-white">
        {#each columns as column}
          <th class="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
            {column.label}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row, i}
        <tr class="bg-white hover:bg-blue-50 transition-colors {i % 2 === 0 ? 'bg-gray-50' : ''}">
          {#each columns as column}
            <td class="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
              {row[column.key]}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  {:else}
    <tbody>
      {#each rows as row}
        {#each columns as column, index}
          <tr class="{index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}">
            <td class="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">{column.label}</td>
            <td class="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{row[column.key]}</td>
          </tr>
        {/each}
      {/each}
    </tbody>
  {/if}
</table>

