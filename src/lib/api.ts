import axios from 'axios';
import type { DDCDTO } from '$lib/types/DDCDTO';
import type { DgDTO } from './types/DgDTO';
import type { UserDTO } from './types/UserDTO';
import type { VdaDTO } from './types/VdaDTO';
import type { AppDTO } from './types/AppDTO';
import type { CitrixSiteDTO } from './types/CitrixSiteDTO';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/citrix',
    timeout: 5000,
    headers: {
    'Content-Type': 'application/json'
    }
});

export const getDdcs = (): Promise<Record<string, DDCDTO>> => 
    apiClient.get('/ddcs').then(res => res.data);
export const getDeliveryGroups = (): Promise<Record<string, DgDTO>> => 
    apiClient.get('/delivery-groups').then(res => res.data);
export const getActiveUsers = (): Promise<Record<string, UserDTO>> => 
    apiClient.get('/active-users').then(res => res.data);
export const getVdas = (): Promise<Record<string, VdaDTO>> => 
    apiClient.get('/vdas').then(res => res.data);
export const getApps = (): Promise<Record<string, AppDTO>> => 
    apiClient.get('/apps').then(res => res.data);
export const getSite = (): Promise<CitrixSiteDTO> =>
    apiClient.get('/site').then(res => res.data);

