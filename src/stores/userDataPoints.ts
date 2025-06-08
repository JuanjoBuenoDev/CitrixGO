// src/stores/userDataPoints.ts
import { writable } from 'svelte/store';

export interface DataPoint {
  x: number; // timestamp en ms (Date.now())
  y: number; // valor de usuarios activos
}

// Store con un array de DataPoint, inicial vacío
export const userDataPoints = writable<DataPoint[]>([]);

