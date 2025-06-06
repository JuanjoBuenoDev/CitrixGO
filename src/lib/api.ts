import axios from 'axios';
import type { DDCDTO } from '$lib/types/DDCDTO';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/citrix',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getDdcs = (): Promise<Record<string, DDCDTO>> => 
    apiClient.get('/ddcs').then(res => res.data);
  
export const getDeliveryGroups = () => apiClient.get('/delivery-groups').then(res => res.data);
export const getActiveUsers = () => apiClient.get('/active-users').then(res => res.data);
export const getVdas = () => apiClient.get('/vdas').then(res => res.data);
export const getApps = () => apiClient.get('/apps').then(res => res.data);
export const getSite = () => apiClient.get('/site').then(res => res.data);
