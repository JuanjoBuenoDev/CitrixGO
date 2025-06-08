// $lib/types.ts
export interface WebSocketMessage<T> {
	type: string;
	payload: T;
}