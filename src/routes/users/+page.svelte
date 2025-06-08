<script lang="ts">
    import { users } from '$stores/citrix';
    import { onDestroy } from 'svelte';
    import { writable } from 'svelte/store';
    import Table from '$lib/components/Table.svelte';
    import type { UserDTO } from '$lib/types';
  
    let selectedUserUid: string | null = null;
    let selectedUser = writable<UserDTO | null>(null);
  
    const columns = [
      { key: 'username', label: 'Usuario' },
      { key: 'lastMachineUsed', label: 'Última Máquina Usada' },
      { key: 'lastConnectionFailureReason', label: 'Último Error de Conexión' },
    ];
  
    const unsubscribe = users.subscribe($users => {
      if (selectedUserUid) {
        const found = $users.find(u => u.username === selectedUserUid) ?? null;
        selectedUser.set(found);
      }
    });
  
    onDestroy(() => {
      unsubscribe();
    });
  
    function onSelect(row: UserDTO) {
      selectedUserUid = row.username;
      selectedUser.set(row);
    }
  </script>
  
  <h1 class="text-2xl font-semibold mb-4">Usuarios</h1>
  
  <div class="overflow-auto border rounded shadow mb-6">
    <Table {columns} rows={$users} on:select={(e) => onSelect(e.detail)} selectedRow={$selectedUser} />
  </div>
  
  {#if $selectedUser}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded shadow p-4 max-h-64 overflow-auto">
        <h2 class="font-semibold mb-2">Aplicaciones en Uso</h2>
        {#if $selectedUser.aplicacionesEnUso.length > 0}
          <ul class="list-disc pl-5 space-y-1 text-sm">
            {#each $selectedUser.aplicacionesEnUso as app}
              <li>{app}</li>
            {/each}
          </ul>
        {:else}
          <p class="text-gray-500 text-sm">No hay aplicaciones en uso.</p>
        {/if}
      </div>
  
      <div class="bg-white rounded shadow p-4 max-h-64 overflow-auto">
        <h2 class="font-semibold mb-2">Máquinas</h2>
        {#if $selectedUser.maquinas.length > 0}
          <ul class="list-disc pl-5 space-y-1 text-sm">
            {#each $selectedUser.maquinas as machine}
              <li>{machine}</li>
            {/each}
          </ul>
        {:else}
          <p class="text-gray-500 text-sm">No hay máquinas asignadas.</p>
        {/if}
      </div>
  
      <div class="bg-white rounded shadow p-4 max-h-64 overflow-auto">
        <h2 class="font-semibold mb-2">Desktop Groups</h2>
        {#if $selectedUser.desktopGroups.length > 0}
          <ul class="list-disc pl-5 space-y-1 text-sm">
            {#each $selectedUser.desktopGroups as dg}
              <li>{dg}</li>
            {/each}
          </ul>
        {:else}
          <p class="text-gray-500 text-sm">No hay Desktop Groups asignados.</p>
        {/if}
      </div>
    </div>
  {/if}
  