<script lang="ts">
    import { setApiBaseUrl } from '$lib/api';
    import { setWebSocketUrl} from '$lib/websocketManager';
  
    let ipInput = '79.117.222.200';
  
    function applyNewIp() {
  const protocol = window.location.protocol === 'https:' ? 'https' : 'http';
  const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';

  const apiPort = 8080;
  const wsPort = 8443;

  const apiUrl = `${protocol}://${ipInput}:${apiPort}/api/citrix`;
  const wsUrl = `${wsProtocol}://${ipInput}:${wsPort}/ws/citrix`;

  setApiBaseUrl(apiUrl);
  setWebSocketUrl(wsUrl);

  alert('URLs actualizadas y WebSocket reconectado');
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
  
  

