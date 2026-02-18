export interface User {
    id: number | string;
    email: string;
    firstName: string;
    lastName: string;
    roles: Role[];
    student?: Student;
    teacher?: Teacher;
}

export interface Role {
    id: number | string;
    name: string;
    description?: string;
}


export interface Department {
    id: number;
    code: string;
    name: string;
}

export interface Class {
    id: number;
    grade: string;
    section: string;
    teacherId?: number;
    teacher?: Teacher;
}

export interface Subject {
    id: number;
    name: string;
    code: string;
    description?: string;
}

export interface Teacher {
    id: number;
    userId: number;
    employeeId: string;
    qualification?: string;
    user: User;
    classes?: Class[];
    subjects?: Subject[];
}

export interface Student {
    id: number;
    userId: number;
    studentNumber: string;
    classId?: number;
    parentId?: number;
    status: string;
    user: User;
    class?: Class;
}

export interface Product {
    id: number;
    sku: string;
    name: string;
    description?: string;
    price: number | string;
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
}

export interface CartItem {
    product: Product;
    quantity: number;
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

export interface Notification {
    id: number;
    title: string;
    message: string;
    type: string;
    isRead: boolean;
    createdAt: string;
    sender?: { firstName: string; lastName: string };
}

export interface Fee {
    id: number;
    title: string;
    amount: number;
    dueDate: string;
    status: string;
    paymentDate?: string;
}
