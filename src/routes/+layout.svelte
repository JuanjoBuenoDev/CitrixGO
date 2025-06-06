<script lang="ts">
	import '../app.css';

	import { page } from '$app/stores';
	$: currentPath = $page.url.pathname;
  
	function linkClass(href: string) {
	  return currentPath === href
		? 'bg-gray-700 p-2 rounded font-semibold'
		: 'hover:bg-gray-700 p-2 rounded';
	}
  </script>
  
  <div class="flex h-screen">
	<!-- Sidebar escritorio -->
	<aside class="hidden md:flex w-64 bg-gray-900 text-white p-6 flex flex-col gap-4">
	  <h1 class="text-2xl font-bold mb-6">CitrixGO</h1>
	  <nav class="flex flex-col gap-2">
		<a href="/settings" class={linkClass('/settings')}>🛠 Settings</a>
		<a href="/ddc" class={linkClass('/ddc')}>🖥 DDC - DG</a>
		<a href="/vda" class={linkClass('/vda')}>🧩 VDA</a>
		<a href="/app" class={linkClass('/app')}>📦 App</a>
		<a href="/users" class={linkClass('/users')}>👥 Users</a>
	  </nav>
	</aside>
  
	<!-- Main content -->
	<main class="flex-1 p-6 bg-gray-100 overflow-auto mb-16 md:mb-0">
	  <slot />
	</main>
  </div>
  
  <!-- Barra inferior móvil -->
  <nav class="fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex justify-around p-3 md:hidden z-50">
	<a href="/settings" class={linkClass('/settings')}>🛠</a>
	<a href="/ddc" class={linkClass('/ddc')}>🖥</a>
	<a href="/vda" class={linkClass('/vda')}>🧩</a>
	<a href="/app" class={linkClass('/app')}>📦</a>
	<a href="/users" class={linkClass('/users')}>👥</a>
  </nav>
  