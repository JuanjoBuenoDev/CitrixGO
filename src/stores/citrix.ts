// src/stores/citrix.ts
import { writable } from 'svelte/store';
import type { DDCDTO, DgDTO, VdaDTO, CitrixSiteDTO, AppDTO, UserDTO } from '$lib/types/index.ts';

export const ddc = writable<DDCDTO[]>([]);
export const deliveryGroups = writable<DgDTO[]>([]);
export const vdas = writable<VdaDTO[]>([]);
export const citrixsite = writable<CitrixSiteDTO | null>(null);
export const apps = writable<AppDTO[]>([]);
export const users = writable<UserDTO[]>([]);
