import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Auth API calls
export const authAPI = {
    signup: (data) => api.post('/auth/signup', data),
    login: (data) => api.post('/auth/login', data),
    logout: () => api.post('/auth/logout'),
    getCurrentUser: () => api.get('/auth/me')
};

// User API calls
export const userAPI = {
    getAllUsers: (page = 1, limit = 10) => api.get(`/users?page=${page}&limit=${limit}`),
    getUserProfile: (id) => api.get(`/users/profile/${id}`),
    updateUserProfile: (id, data) => api.put(`/users/profile/${id}`, data),
    changePassword: (id, data) => api.put(`/users/change-password/${id}`, data),
    activateUser: (id) => api.put(`/users/activate/${id}`),
    deactivateUser: (id) => api.put(`/users/deactivate/${id}`)
};

export default api;
