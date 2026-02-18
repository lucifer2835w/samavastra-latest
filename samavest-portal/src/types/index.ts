// Reuse types from Chalkboard portal
export interface User {
    id: number | string;
    email: string;
    firstName: string;
    lastName: string;
    roles: Role[];
}

export interface Role {
    id: number | string;
    name: string;
    description?: string;
}

export interface Student {
    id: number;
    userId: number;
    studentNumber: string;
    grade?: string;
    status: string;
    user: User;
}

export interface Product {
    id: number;
    sku: string;
    name: string;
    description?: string;
    price: number;
    isActive: boolean;
    createdAt: string;
    inventory?: Inventory;
}

export interface Inventory {
    id: number;
    productId: number;
    quantityOnHand: number;
    reorderLevel: number;
    location?: string;
    product?: Product;
}

export interface Order {
    id: number;
    studentId: number;
    status: string;
    totalAmount: number;
    createdAt: string;
    items: OrderItem[];
    student?: Student;
    payments?: Payment[];
    logistics?: LogisticsTracking[];
}

export interface OrderItem {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    product: Product;
}

export interface Payment {
    id: number;
    orderId: number;
    amount: number;
    status: string;
    paymentMethod: string;
    transactionReference?: string;
    paidAt?: string;
    createdAt: string;
}

export interface LogisticsTracking {
    id: number;
    orderId: number;
    trackingNumber: string;
    status: string;
    estimatedDelivery?: string;
    actualDelivery?: string;
    createdAt: string;
    updatedAt: string;
    order?: Order;
}

export interface ProductionLog {
    id: number;
    productId: number;
    departmentId: number;
    batchNumber: string;
    quantityProduced: number;
    notes?: string;
    createdAt: string;
    product?: Product;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface ApiError {
    error: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
