import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Helper to set the bearer token for subsequent requests
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const authService = {
    login: (email, password) => api.post('/auth/login', { email, password }),
};

export const complaintService = {
    submitComplaint: (data) => api.post('/complaint', data),
    trackComplaint: (id) => api.get(`/complaint/${id}`),
};

export const adminService = {
    getComplaints: (params) => api.get('/admin/complaints', { params }),
    updateStatus: (id, status) => api.put(`/admin/update-status/${id}`, { status }),
    overrideComplaint: (id, data) => api.put(`/admin/override/${id}`, data),
};

export const departmentService = {
    getDepartmentComplaints: (name) => api.get(`/department/${name}`),
    updateDepartmentComplaint: (id, data) => api.put(`/department/update/${id}`, data),
};

export default api;
