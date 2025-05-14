// src/api/client.ts
import axios, { type InternalAxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: "https://localhost:7242/api/v1",
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000, // 10s
});

// Opcional: interceptors para injetar token ou tratar erros globalmente
api.interceptors.request.use((config : InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
