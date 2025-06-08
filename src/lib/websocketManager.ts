class WebSocketManager {
	private socket: WebSocket | null = null;
	private reconnectAttempts = 0;
	private readonly MAX_RECONNECT_DELAY = 30000;
	private url: string;
	private onMessageCallback: ((data: any) => void) | null = null;

	constructor(url = 'ws://localhost:8080/ws/citrix') {
		this.url = url;
	}

	connect(onMessage: (data: any) => void): WebSocket {
		if (this.socket && this.socket.readyState === WebSocket.OPEN) {
			console.warn('⚠️ Ya hay una conexión WebSocket activa.');
			return this.socket;
		}

		this.onMessageCallback = onMessage;
		this.socket = new WebSocket(this.url);

		this.socket.onopen = () => {
			console.log('🔌 WebSocket conectado');
			this.reconnectAttempts = 0;
		};

		this.socket.onmessage = (event) => {
			try {
				const message = JSON.parse(event.data);
				console.log('📥 Mensaje recibido del WebSocket:', message);  // <-- Aquí la impresión
				if (this.onMessageCallback) {
					this.onMessageCallback(message);
				} else {
					console.warn('⚠️ No se ha definido callback para manejar mensajes WebSocket');
				}
			} catch (err) {
				console.error('❌ Error al parsear mensaje WebSocket:', err);
			}
		};

		this.socket.onerror = (err) => {
			console.error('❌ Error en WebSocket:', err);
		};

		this.socket.onclose = () => {
			console.warn('🔌 WebSocket desconectado');
			this.reconnect();
		};

		return this.socket;
	}

	private reconnect() {
		this.reconnectAttempts++;
		const delay = Math.min(1000 * this.reconnectAttempts, this.MAX_RECONNECT_DELAY);
		console.warn(`🔁 Reintentando conexión WebSocket en ${delay / 1000}s...`);
		setTimeout(() => {
			if (this.onMessageCallback) {
				this.connect(this.onMessageCallback);
			}
		}, delay);
	}

	disconnect() {
		this.socket?.close(1000, 'Cierre manual de conexión WebSocket');
		this.socket = null;
	}
}

const websocketManager = new WebSocketManager();

export function connectToCitrixWebSocket(callback: (data: any) => void): WebSocket {
	return websocketManager.connect(callback);
}

export function disconnectCitrixWebSocket() {
	websocketManager.disconnect();
}
