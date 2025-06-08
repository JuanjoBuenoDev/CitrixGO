<script lang="ts">
    import { page } from '$app/stores';
    import { derived } from 'svelte/store';
  
    const title = derived(page, ($page) => {
      const path = $page.url.pathname;
      if (path === '/site') return 'Site';
      if (path === '/dg') return 'Delivery Groups';
      if (path === '/vda') return 'VDAs';
      if (path === '/app') return 'Aplicaciones';
      if (path === '/users') return 'Usuarios Activos';
      if (path === '/settings') return 'Settings';
      return 'Citrix Control';
    });
  </script>
  
  <header class="bg-blue-700 text-white py-4 px-4 shadow w-full">
    <h1 class="text-xl font-bold text-center md:text-center">
      {$title}
    </h1>
  </header>
  