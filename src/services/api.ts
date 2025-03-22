import axios from 'axios';
import type { User, Product, Post, PostsResponse, ProductsResponse, CommentsResponse } from '../types';

const BASE_URL = 'https://dummyjson.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  login: async (username: string, password: string): Promise<User> => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },
};

export const productsApi = {
  getAll: async (): Promise<ProductsResponse> => {
    const response = await api.get('/products');
    return response.data;
  },
  getById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
};

export const postsApi = {
  getAll: async (): Promise<PostsResponse> => {
    try {
      console.log('Making posts API request...');
      const response = await api.get('/posts');
      console.log('Posts API response:', response);
      return response.data;
    } catch (error) {
      console.error('Posts API error:', error);
      throw error;
    }
  },
  getById: async (id: string): Promise<Post> => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },
};

export const commentsApi = {
  getAll: async (): Promise<CommentsResponse> => {
    const response = await api.get('/comments');
    return response.data;
  },
};

// Add auth interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('API Request:', {
    url: config.url,
    method: config.method,
    token: token ? 'present' : 'missing'
  });
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
