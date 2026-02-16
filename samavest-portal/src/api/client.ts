import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add JWT token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Admin API
export const adminApi = {
    // Users
    getAllUsers: (filters?: { role?: string; search?: string }) =>
        apiClient.get('/samavest/admin/users', { params: filters }),
    getUserById: (id: number) =>
        apiClient.get(`/samavest/admin/users/${id}`),
    createUser: (data: any) =>
        apiClient.post('/samavest/admin/users', data),
    updateUser: (id: number, data: any) =>
        apiClient.put(`/samavest/admin/users/${id}`, data),
    assignRoles: (id: number, roles: string[]) =>
        apiClient.post(`/samavest/admin/users/${id}/roles`, { roles }),
    deactivateUser: (id: number) =>
        apiClient.post(`/samavest/admin/users/${id}/deactivate`),
    resetPassword: (id: number, newPassword: string) =>
        apiClient.post(`/samavest/admin/users/${id}/reset-password`, { newPassword }),

    // Analytics
    getSystemAnalytics: () =>
        apiClient.get('/samavest/admin/analytics'),
    getEnrollmentTrends: (months?: number) =>
        apiClient.get('/samavest/admin/analytics/enrollment-trends', { params: { months } }),
    getClassDistribution: () =>
        apiClient.get('/samavest/admin/analytics/class-distribution'),
};

// Homework API
export const homeworkApi = {
    getAll: (filters?: any) => apiClient.get('/samavest/homework', { params: filters }),
    getByClass: (classId: number) => apiClient.get(`/samavest/homework/class/${classId}`),
    create: (data: any) => apiClient.post('/samavest/homework', data),
    getById: (id: number) => apiClient.get(`/samavest/homework/${id}`),
    submit: (id: number, data: any) => apiClient.post(`/samavest/homework/${id}/submit`, data),
    grade: (submissionId: number, data: any) => apiClient.post(`/samavest/homework/submissions/${submissionId}/grade`, data),
};

// Parent API
export const parentApi = {
    getChildren: (parentId: number) => apiClient.get(`/samavest/parents/${parentId}/children`),
    getChildPerformance: (parentId: number, studentId: number) => apiClient.get(`/samavest/parents/${parentId}/children/${studentId}/performance`),
    getChildGrades: (parentId: number, studentId: number) => apiClient.get(`/samavest/parents/${parentId}/children/${studentId}/grades`),
    getChildAttendance: (parentId: number, studentId: number) => apiClient.get(`/samavest/parents/${parentId}/children/${studentId}/attendance`),
    getChildHomework: (parentId: number, studentId: number) => apiClient.get(`/samavest/parents/${parentId}/children/${studentId}/homework`),
};

// Reports API
export const reportsApi = {
    getStudentReport: (studentId: number) => apiClient.get(`/samavest/reports/student/${studentId}`),
    getClassReport: (classId: number) => apiClient.get(`/samavest/reports/class/${classId}`),
    getAttendanceReport: (params: any) => apiClient.get('/samavest/reports/attendance', { params }),
    getFeesReport: (params: any) => apiClient.get('/samavest/reports/fees', { params }),
    getTeacherWorkload: () => apiClient.get('/samavest/reports/teacher-workload'),
};

