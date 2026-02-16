import { apiClient } from './client';
import type {
    LoginRequest,
    LoginResponse,
    Product,
    Order,
    Payment,
    LogisticsTracking,
    Student,
    Teacher,
    Class,
    Subject,
    Department,
    Notification,
    Fee,
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
        const response = await apiClient.get('/chalkboard/students', { params: { page, limit } });
        return response.data;
    },
    getById: async (id: number): Promise<Student> => {
        const response = await apiClient.get(`/chalkboard/students/${id}`);
        return response.data;
    },
    create: async (data: Partial<Student>): Promise<Student> => {
        const response = await apiClient.post('/chalkboard/students', data);
        return response.data;
    },
    update: async (id: number, data: Partial<Student>): Promise<Student> => {
        const response = await apiClient.put(`/chalkboard/students/${id}`, data);
        return response.data;
    },
};

// Teachers API
export const teachersApi = {
    getAll: async (page = 1, limit = 20): Promise<{ teachers: Teacher[]; pagination: any }> => {
        const response = await apiClient.get('/chalkboard/teachers', { params: { page, limit } });
        return response.data;
    },
    getById: async (id: number): Promise<Teacher> => {
        const response = await apiClient.get(`/chalkboard/teachers/${id}`);
        return response.data;
    },
};

// Academics API
export const academicsApi = {
    getClasses: async (): Promise<Class[]> => {
        const response = await apiClient.get('/chalkboard/academics/classes');
        return response.data;
    },
    getSubjects: async (): Promise<Subject[]> => {
        const response = await apiClient.get('/chalkboard/academics/subjects');
        return response.data;
    },
};

// Departments API
export const departmentsApi = {
    getAll: async (): Promise<Department[]> => {
        const response = await apiClient.get('/chalkboard/departments');
        return response.data;
    },
};

// Notifications API
export const notificationsApi = {
    getMy: async (): Promise<Notification[]> => {
        const response = await apiClient.get('/notifications/my');
        return response.data;
    },
    send: async (data: any): Promise<Notification> => {
        const response = await apiClient.post('/notifications/send', data);
        return response.data;
    },
};

// Fees API
export const feesApi = {
    getStudentFees: async (studentId: number): Promise<Fee[]> => {
        const response = await apiClient.get(`/fees/student/${studentId}`);
        return response.data;
    },
    payFee: async (data: { feeId: number; transactionRef: string }): Promise<Fee> => {
        const response = await apiClient.post('/fees/pay', data);
        return response.data;
    },
};

// Products API
export const productsApi = {
    getAll: async (page = 1, limit = 20): Promise<{ products: Product[]; pagination: any }> => {
        const response = await apiClient.get('/chalkboard/products', {
            params: { page, limit },
        });
        return response.data;
    },

    search: async (query: string): Promise<Product[]> => {
        const response = await apiClient.get('/chalkboard/products/search', {
            params: { q: query },
        });
        return response.data;
    },

    getById: async (id: number): Promise<Product> => {
        const response = await apiClient.get(`/chalkboard/products/${id}`);
        return response.data;
    },
};

// Orders API
export const ordersApi = {
    create: async (data: { studentId: number; items: { productId: number; quantity: number }[] }): Promise<Order> => {
        const response = await apiClient.post('/chalkboard/orders', data);
        return response.data;
    },

    getById: async (id: number): Promise<Order> => {
        const response = await apiClient.get(`/chalkboard/orders/${id}`);
        return response.data;
    },

    getMyOrders: async (page = 1, limit = 20): Promise<{ orders: Order[]; pagination: any }> => {
        const response = await apiClient.get('/chalkboard/orders/my-orders', { params: { page, limit } });
        return response.data;
    },

    cancel: async (id: number): Promise<Order> => {
        const response = await apiClient.post(`/chalkboard/orders/${id}/cancel`);
        return response.data;
    },
};

// Payments API
export const paymentsApi = {
    create: async (data: {
        orderId: number;
        amount: number;
        paymentMethod: string;
    }): Promise<Payment> => {
        const response = await apiClient.post('/chalkboard/payments', data);
        return response.data;
    },

    getByOrder: async (orderId: number): Promise<Payment[]> => {
        const response = await apiClient.get(`/chalkboard/payments/order/${orderId}`);
        return response.data;
    },
};

// Logistics API
export const logisticsApi = {
    trackByNumber: async (trackingNumber: string): Promise<LogisticsTracking> => {
        const response = await apiClient.get(`/chalkboard/logistics/track/${trackingNumber}`);
        return response.data;
    },

    getByOrder: async (orderId: number): Promise<LogisticsTracking[]> => {
        const response = await apiClient.get(`/chalkboard/logistics/order/${orderId}`);
        return response.data;
    },
};

// Homework API
// Homework API
export const homeworkApi = {
    getAll: async (filters?: any): Promise<any> => {
        const response = await apiClient.get('/chalkboard/homework', { params: filters });
        return response.data;
    },
    getByClass: async (classId: number): Promise<any> => {
        const response = await apiClient.get(`/chalkboard/homework/class/${classId}`);
        return response.data;
    },
    create: async (data: any): Promise<any> => {
        const response = await apiClient.post('/chalkboard/homework', data);
        return response.data;
    },
    getById: async (id: number): Promise<any> => {
        const response = await apiClient.get(`/chalkboard/homework/${id}`);
        return response.data;
    },
    submit: async (id: number, data: any): Promise<any> => {
        const response = await apiClient.post('/chalkboard/homework/submit', { ...data, homeworkId: id });
        return response.data;
    },
    grade: async (submissionId: number, data: any): Promise<any> => {
        const response = await apiClient.post(`/chalkboard/homework/submissions/${submissionId}/grade`, data);
        return response.data;
    },
};

// Parent API
export const parentApi = {
    getChildren: async (parentId: number): Promise<any> => {
        const response = await apiClient.get(`/chalkboard/parents/${parentId}/children`);
        return response.data;
    },
    getChildPerformance: async (parentId: number, studentId: number): Promise<any> => {
        const response = await apiClient.get(`/chalkboard/parents/${parentId}/children/${studentId}/performance`);
        return response.data;
    },
    getChildGrades: async (parentId: number, studentId: number): Promise<any> => {
        const response = await apiClient.get(`/chalkboard/parents/${parentId}/children/${studentId}/grades`);
        return response.data;
    },
    getChildAttendance: async (parentId: number, studentId: number): Promise<any> => {
        const response = await apiClient.get(`/chalkboard/parents/${parentId}/children/${studentId}/attendance`);
        return response.data;
    },
    getChildHomework: async (parentId: number, studentId: number): Promise<any> => {
        const response = await apiClient.get(`/chalkboard/parents/${parentId}/children/${studentId}/homework`);
        return response.data;
    },
};

// Reports API
export const reportsApi = {
    getStudentReport: async (studentId: number): Promise<any> => {
        const response = await apiClient.get(`/chalkboard/reports/student/${studentId}`);
        return response.data;
    },
    getClassReport: async (classId: number): Promise<any> => {
        const response = await apiClient.get(`/chalkboard/reports/class/${classId}`);
        return response.data;
    },
    getAttendanceReport: async (params: any): Promise<any> => {
        const response = await apiClient.get('/chalkboard/reports/attendance', { params });
        return response.data;
    },
    getFeesReport: async (params: any): Promise<any> => {
        const response = await apiClient.get('/chalkboard/reports/fees', { params });
        return response.data;
    },
    getTeacherWorkload: async (): Promise<any> => {
        const response = await apiClient.get('/chalkboard/reports/teacher-workload');
        return response.data;
    },
};
