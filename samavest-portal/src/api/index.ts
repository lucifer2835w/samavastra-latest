import { apiClient } from './client';
import type {
    LoginRequest,
    LoginResponse,
    Student,
    Product,
    Order,
    Inventory,
    LogisticsTracking,
    Payment,
    ProductionLog,
} from '../types';

// Auth API
export const authApi = {
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>('/auth/login', data);
        return response.data;
    },
};

// Students API
export const studentsApi = {
    getAll: async (page = 1, limit = 20): Promise<{ students: Student[]; pagination: any }> => {
        const response = await apiClient.get('/samavest/students', { params: { page, limit } });
        return response.data;
    },

    search: async (query: string): Promise<Student[]> => {
        const response = await apiClient.get('/samavest/students/search', { params: { q: query } });
        return response.data;
    },

    getById: async (id: number): Promise<Student> => {
        const response = await apiClient.get(`/samavest/students/${id}`);
        return response.data;
    },

    create: async (data: Partial<Student>): Promise<Student> => {
        const response = await apiClient.post('/samavest/students', data);
        return response.data;
    },

    update: async (id: number, data: Partial<Student>): Promise<Student> => {
        const response = await apiClient.put(`/samavest/students/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/samavest/students/${id}`);
    },
};

// Products API
export const productsApi = {
    getAll: async (page = 1, limit = 20): Promise<{ products: Product[]; pagination: any }> => {
        const response = await apiClient.get('/samavest/products', { params: { page, limit } });
        return response.data;
    },

    search: async (query: string): Promise<Product[]> => {
        const response = await apiClient.get('/samavest/products/search', { params: { q: query } });
        return response.data;
    },

    getById: async (id: number): Promise<Product> => {
        const response = await apiClient.get(`/samavest/products/${id}`);
        return response.data;
    },

    create: async (data: Partial<Product>): Promise<Product> => {
        const response = await apiClient.post('/samavest/products', data);
        return response.data;
    },

    update: async (id: number, data: Partial<Product>): Promise<Product> => {
        const response = await apiClient.put(`/samavest/products/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/samavest/products/${id}`);
    },
};

// Orders API
export const ordersApi = {
    getAll: async (page = 1, limit = 20): Promise<{ orders: Order[]; pagination: any }> => {
        const response = await apiClient.get('/samavest/orders', { params: { page, limit } });
        return response.data;
    },

    getById: async (id: number): Promise<Order> => {
        const response = await apiClient.get(`/samavest/orders/${id}`);
        return response.data;
    },

    updateStatus: async (id: number, status: string): Promise<Order> => {
        const response = await apiClient.put(`/samavest/orders/${id}/status`, { status });
        return response.data;
    },

    cancel: async (id: number): Promise<Order> => {
        const response = await apiClient.post(`/samavest/orders/${id}/cancel`);
        return response.data;
    },

    getStats: async (): Promise<any> => {
        const response = await apiClient.get('/samavest/orders/stats');
        return response.data;
    },
};

// Inventory API
export const inventoryApi = {
    getAll: async (page = 1, limit = 20): Promise<{ inventory: Inventory[]; pagination: any }> => {
        const response = await apiClient.get('/samavest/inventory', { params: { page, limit } });
        return response.data;
    },

    adjust: async (id: number, quantity: number): Promise<Inventory> => {
        const response = await apiClient.post(`/samavest/inventory/${id}/adjust`, { quantity });
        return response.data;
    },

    getLowStock: async (): Promise<Inventory[]> => {
        const response = await apiClient.get('/samavest/inventory/low-stock');
        return response.data;
    },

    getStats: async (): Promise<any> => {
        const response = await apiClient.get('/samavest/inventory/stats');
        return response.data;
    },
};

// Logistics API
export const logisticsApi = {
    getAll: async (): Promise<LogisticsTracking[]> => {
        const response = await apiClient.get('/samavest/logistics');
        return response.data;
    },

    create: async (data: Partial<LogisticsTracking>): Promise<LogisticsTracking> => {
        const response = await apiClient.post('/samavest/logistics', data);
        return response.data;
    },

    update: async (id: number, data: Partial<LogisticsTracking>): Promise<LogisticsTracking> => {
        const response = await apiClient.put(`/samavest/logistics/${id}`, data);
        return response.data;
    },

    getStats: async (): Promise<any> => {
        const response = await apiClient.get('/samavest/logistics/stats');
        return response.data;
    },
};


// Payments API
export const paymentsApi = {
    getAll: async (): Promise<Payment[]> => {
        const response = await apiClient.get('/samavest/payments');
        return response.data;
    },

    getByOrder: async (orderId: number): Promise<Payment[]> => {
        const response = await apiClient.get(`/samavest/payments/order/${orderId}`);
        return response.data;
    },

    refund: async (id: number): Promise<Payment> => {
        const response = await apiClient.post(`/samavest/payments/${id}/refund`);
        return response.data;
    },
};

// Production API
export const productionApi = {
    getAllLogs: async (page = 1, limit = 20): Promise<{ logs: ProductionLog[]; pagination: any }> => {
        const response = await apiClient.get('/samavest/production', { params: { page, limit } });
        return response.data;
    },

    createLog: async (data: Partial<ProductionLog>): Promise<ProductionLog> => {
        const response = await apiClient.post('/samavest/production', data);
        return response.data;
    },

    getStats: async (): Promise<any> => {
        const response = await apiClient.get('/samavest/production/stats');
        return response.data;
    },
};
