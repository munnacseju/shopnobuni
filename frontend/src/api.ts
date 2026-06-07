import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getProducts = () => axios.get(`${API_URL}/products`);
export const getProduct = (id: number) => axios.get(`${API_URL}/products/${id}`);
export const createProduct = (product: any) => axios.post(`${API_URL}/products`, product);
export const updateProduct = (id: number, product: any) => axios.put(`${API_URL}/products/${id}`, product);
export const deleteProduct = (id: number) => axios.delete(`${API_URL}/products/${id}`);

export const createOrder = (order: any) => axios.post(`${API_URL}/orders`, order);
