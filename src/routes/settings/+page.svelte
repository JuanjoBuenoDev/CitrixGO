<script lang="ts">
    import { setApiBaseUrl } from '$lib/api';
    import { setWebSocketUrl, disconnectCitrixWebSocket } from '$lib/websocketManager';
  
    let ipInput = '79.117.222.200';
  
    const apiPortPath = ':8080/api/citrix';
    const wsPortPath = ':8080/ws/citrix';
  
    function applyNewIp() {
      const apiUrl = `http://${ipInput}${apiPortPath}`;
      const wsUrl = `ws://${ipInput}${wsPortPath}`;
  
      setApiBaseUrl(apiUrl);
      setWebSocketUrl(wsUrl);
      disconnectCitrixWebSocket();
  
      alert('URLs actualizadas');
    }
  </script>
  
  <div class="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">Configurar IP del servidor</h2>
    <label class="block mb-4">
      <span class="text-gray-700 font-medium mb-1 block">IP o dominio:</span>
      <input
        type="text"
        bind:value={ipInput}
        placeholder="79.117.222.200"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </label>
    <button
      on:click={applyNewIp}
      class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition-colors duration-300"
    >
      Aplicar nueva IP
    </button>
  </div>
  

