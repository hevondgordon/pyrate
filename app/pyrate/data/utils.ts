import axios from 'axios';
import { ROUTE as DELETE_ROUTE } from '../pages/api/services/delete'
export const fetcher = (input: RequestInfo, init: RequestInit) => fetch(input, init).then(res => res.json())


export const pyrateInternalAPIClient = axios.create({
  baseURL: 'http://127.0.0.1:5001',
  timeout: 1000,
});

export const pyrateExternalAPIClient = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  timeout: 1000,
});

export const toTitleCase = (str: string) => {
  return str.split(' ').map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ');
}

export const handleServiceDelete = async (service: string, serviceId: number) => {
  const response = await axios.delete(`${DELETE_ROUTE}?service=${service}&serviceId=${serviceId}`)
  return response
}