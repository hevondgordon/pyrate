import axios from 'axios';
import { ROUTE as DELETE_SERVICE_ENTRY_ROUTE } from '../pages/api/services/delete_item'
import { ROUTE as DELETE_SERVICE_ROUTE } from '../pages/api/services/delete'
import { ROUTE as UPDATE_ROUTE } from '../pages/api/services/update'
import { GenericData } from '../types';
export const fetcher = (input: RequestInfo, init: RequestInit) => fetch(input, init).then(res => res.json())


export const pyrateInternalAPIClient = axios.create({
  baseURL: 'http://127.0.0.1:5001',
  timeout: 1000,
});

export const pyrateExternalAPIClient = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  timeout: 1000,
});

export const handleServiceItemDelete = async (service: string, serviceId: number) => {
  const response = await axios.delete(`${DELETE_SERVICE_ENTRY_ROUTE}?service=${service}&serviceId=${serviceId}`)
  return response
}

export const handleServiceDelete = async (service: string) => {
  const response = await axios.delete(`${DELETE_SERVICE_ROUTE}?service=${service}`)
  return response
}

export const handleServiceUpdate = async (service: string, serviceId: number, data: GenericData) => {
  const response = await axios.put(`${UPDATE_ROUTE}?service=${service}&serviceId=${serviceId}`, data)
  return response;
}

export const shouldFetch = (...args: unknown[]) => {
  const shouldFetch = args.every(arg => arg !== null && arg !== undefined && arg !== '')
  return shouldFetch;
}