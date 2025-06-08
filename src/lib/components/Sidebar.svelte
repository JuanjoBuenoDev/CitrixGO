<script lang="ts">
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';

  import { Server, Grid, Monitor, Home, Users, Settings } from 'lucide-svelte';

  const currentPath = derived(page, $page => $page.url.pathname);

  const items = [
    { path: '/site', label: 'Site', icon: Server },
    { path: '/dg', label: 'Delivery Groups', icon: Grid },
    { path: '/vda', label: 'VDAs', icon: Monitor },
    { path: '/app', label: 'Aplicaciones', icon: Home },
    { path: '/users', label: 'Usuarios Activos', icon: Users },
    { path: '/settings', label: 'Settings', icon: Settings }
  ];
</script>

<!-- Escritorio -->
<nav class="hidden md:flex flex-col w-64 h-full bg-gray-900 text-white p-4 fixed left-0 top-0">
  <div class="mb-6 px-3 py-4 text-2xl font-extrabold tracking-wide text-blue-400 select-none">
    CitrixGO
  </div>
  {#each items as { path, label, icon: Icon }}
    <a
      href={path}
      class="mb-2 px-3 py-2 rounded hover:bg-blue-800 transition-all flex items-center gap-3"
      class:selected={$currentPath === path}
    >
      <Icon class="w-5 h-5" />
      <span>{label}</span>
    </a>
  {/each}
</nav>

<!-- Móvil -->
<nav class="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex justify-around py-2 shadow z-20">
  {#each items as { path, label, icon: Icon }}
  <a
  href={path}
  class="flex flex-col items-center text-xs hover:text-blue-300 rounded-md px-2 py-1"
  class:selected={$currentPath === path}
>
  <Icon class="w-5 h-5 mb-1" />
  {label}
</a>

  {/each}
</nav>

<style>
  a.selected {
    background-color: #1e40af; /* bg-blue-800 */
    font-weight: bold;
  }
</style>

