import { ddc, citrixsite, vdas, users, deliveryGroups, apps } from '$stores/citrix';
import type { DDCDTO } from '$lib/types/DDCDTO';
import type { CitrixSiteDTO } from '$lib/types/CitrixSiteDTO';
import { connectToCitrixWebSocket } from '$lib/websocketManager';

interface CitrixMessage {
	type: 'ddc' | 'site' | 'vda' | 'user' | 'dg' | 'app';
	payload: any;
}

class CitrixSyncService {
	private socket: WebSocket | null = null;

	start() {
		if (this.socket && this.socket.readyState === WebSocket.OPEN) return;

		this.socket = connectToCitrixWebSocket((data: CitrixMessage) => {
			try {
				switch (data.type) {
					case 'ddc':
						ddc.set(data.payload as DDCDTO[]);
						break;
					case 'site':
						citrixsite.set(data.payload as CitrixSiteDTO);
						break;
					case 'vda':
						vdas.set(data.payload);
						break;
					case 'user':
						users.set(data.payload);
						break;
					case 'dg':
						deliveryGroups.set(data.payload);
						break;
					case 'app':
						apps.set(data.payload);
						break;
					default:
						console.warn('Tipo de mensaje WebSocket no manejado:', data.type);
				}
			} catch (e) {
				console.error('Error procesando datos del WebSocket:', e);
			}
		});
	}

	stop() {
		this.socket?.close(1000, 'Parada manual de WebSocket');
		this.socket = null;
	}
}

export const citrixSyncService = new CitrixSyncService();
