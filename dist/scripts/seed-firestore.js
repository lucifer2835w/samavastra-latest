"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const admin = __importStar(require("firebase-admin"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        let serviceAccount;
        try {
            serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        }
        catch {
            serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, 'base64').toString());
        }
        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    }
    else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        admin.initializeApp();
    }
    else if (process.env.FIREBASE_PROJECT_ID) {
        admin.initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID });
    }
    else {
        admin.initializeApp();
    }
}
const db = admin.firestore();
async function main() {
    console.log('🌱 Starting Firestore seed...');
    // Clear existing data
    console.log('🧹 Cleaning existing data...');
    const collections = [
        'payments', 'logisticsTracking', 'productionLogs', 'orderItems',
        'orders', 'inventory', 'products', 'examResults', 'exams',
        'homeworkSubmissions', 'homework', 'attendance', 'fees', 'notifications',
        'parentAccess', 'students', 'teachers', 'parents', 'userRoles', 'users',
        'roles', 'departments', 'classes', 'subjects', 'classSubjects', 'teacherSubjects',
    ];
    for (const col of collections) {
        const snap = await db.collection(col).get();
        const batch = db.batch();
        snap.docs.forEach(doc => batch.delete(doc.ref));
        if (snap.size > 0)
            await batch.commit();
    }
    // Create Roles
    console.log('👥 Creating roles...');
    const adminRoleRef = db.collection('roles').doc();
    await adminRoleRef.set({ name: 'ADMIN', description: 'System administrator with full access' });
    const studentRoleRef = db.collection('roles').doc();
    await studentRoleRef.set({ name: 'STUDENT', description: 'Student user with marketplace access' });
    const parentRoleRef = db.collection('roles').doc();
    await parentRoleRef.set({ name: 'PARENT', description: 'Parent user with student oversight' });
    const staffRoleRef = db.collection('roles').doc();
    await staffRoleRef.set({ name: 'STAFF', description: 'Staff member with department access' });
    const teacherRoleRef = db.collection('roles').doc();
    await teacherRoleRef.set({ name: 'TEACHER', description: 'Teacher with class and student management access' });
    const schoolAdminRoleRef = db.collection('roles').doc();
    await schoolAdminRoleRef.set({ name: 'SCHOOL_ADMIN', description: 'School administrator' });
    // Create Departments
    console.log('🏢 Creating departments...');
    const itDeptRef = db.collection('departments').doc();
    await itDeptRef.set({ code: 'IT', name: 'Information Technology' });
    const financeDeptRef = db.collection('departments').doc();
    await financeDeptRef.set({ code: 'FIN', name: 'Finance' });
    const logisticsDeptRef = db.collection('departments').doc();
    await logisticsDeptRef.set({ code: 'LOG', name: 'Logistics' });
    const productionDeptRef = db.collection('departments').doc();
    await productionDeptRef.set({ code: 'PROD', name: 'Production' });
    // Create Admin User
    console.log('👤 Creating admin user...');
    const passwordHash = await bcrypt_1.default.hash('12345678', 10);
    const adminUserRef = db.collection('users').doc();
    await adminUserRef.set({
        email: 'admin@samavest.com',
        passwordHash,
        firstName: 'Admin',
        lastName: 'User',
        phone: '+1234567890',
        isActive: true,
        departmentId: itDeptRef.id,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    await db.collection('userRoles').add({ userId: adminUserRef.id, roleId: adminRoleRef.id });
    // Create Staff Users
    console.log('👔 Creating staff users...');
    const financeStaffRef = db.collection('users').doc();
    await financeStaffRef.set({
        email: 'finance@samavest.com',
        passwordHash,
        firstName: 'Finance',
        lastName: 'Manager',
        phone: '+1234567891',
        isActive: true,
        departmentId: financeDeptRef.id,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    await db.collection('userRoles').add({ userId: financeStaffRef.id, roleId: staffRoleRef.id });
    // Create Student Users
    console.log('🎓 Creating student users...');
    const student1UserRef = db.collection('users').doc();
    await student1UserRef.set({
        email: 'john.doe@chalkboard.com',
        passwordHash,
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567892',
        isActive: true,
        departmentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    await db.collection('userRoles').add({ userId: student1UserRef.id, roleId: studentRoleRef.id });
    const student1Ref = db.collection('students').doc();
    await student1Ref.set({
        userId: student1UserRef.id,
        studentNumber: 'STU001',
        status: 'ACTIVE',
        classId: null,
        parentId: null,
    });
    const student2UserRef = db.collection('users').doc();
    await student2UserRef.set({
        email: 'jane.smith@chalkboard.com',
        passwordHash,
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '+1234567893',
        isActive: true,
        departmentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    await db.collection('userRoles').add({ userId: student2UserRef.id, roleId: studentRoleRef.id });
    const student2Ref = db.collection('students').doc();
    await student2Ref.set({
        userId: student2UserRef.id,
        studentNumber: 'STU002',
        status: 'ACTIVE',
        classId: null,
        parentId: null,
    });
    // Create Parent User
    console.log('👨‍👩‍👧 Creating parent user...');
    const parentUserRef = db.collection('users').doc();
    await parentUserRef.set({
        email: 'parent@chalkboard.com',
        passwordHash,
        firstName: 'Parent',
        lastName: 'Guardian',
        phone: '+1234567894',
        isActive: true,
        departmentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    await db.collection('userRoles').add({ userId: parentUserRef.id, roleId: parentRoleRef.id });
    // Create Teacher User
    console.log('👩‍🏫 Creating teacher user...');
    const teacherUserRef = db.collection('users').doc();
    await teacherUserRef.set({
        email: 'jane.smith@school.com',
        passwordHash,
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '+1234567895',
        isActive: true,
        departmentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    await db.collection('userRoles').add({ userId: teacherUserRef.id, roleId: teacherRoleRef.id });
    // Create School Admin User
    console.log('🏫 Creating school admin user...');
    const schoolAdminUserRef = db.collection('users').doc();
    await schoolAdminUserRef.set({
        email: 'admin@school.com',
        passwordHash,
        firstName: 'School',
        lastName: 'Admin',
        phone: '+1234567896',
        isActive: true,
        departmentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    await db.collection('userRoles').add({ userId: schoolAdminUserRef.id, roleId: schoolAdminRoleRef.id });
    // Create Products
    console.log('📦 Creating products...');
    const product1Ref = db.collection('products').doc();
    await product1Ref.set({
        sku: 'BOOK-001',
        name: 'Mathematics Textbook Grade 10',
        description: 'Comprehensive mathematics textbook for grade 10 students',
        price: 29.99,
        isActive: true,
    });
    await db.collection('inventory').add({
        productId: product1Ref.id,
        location: 'Warehouse A',
        quantityOnHand: 100,
        reorderLevel: 20,
    });
    const product2Ref = db.collection('products').doc();
    await product2Ref.set({
        sku: 'BOOK-002',
        name: 'Science Textbook Grade 10',
        description: 'Comprehensive science textbook for grade 10 students',
        price: 34.99,
        isActive: true,
    });
    await db.collection('inventory').add({
        productId: product2Ref.id,
        location: 'Warehouse A',
        quantityOnHand: 85,
        reorderLevel: 20,
    });
    const product3Ref = db.collection('products').doc();
    await product3Ref.set({
        sku: 'UNIFORM-001',
        name: 'School Uniform Set',
        description: 'Complete school uniform including shirt, pants, and tie',
        price: 89.99,
        isActive: true,
    });
    await db.collection('inventory').add({
        productId: product3Ref.id,
        location: 'Warehouse B',
        quantityOnHand: 50,
        reorderLevel: 10,
    });
    const product4Ref = db.collection('products').doc();
    await product4Ref.set({
        sku: 'SUPPLY-001',
        name: 'Student Supply Kit',
        description: 'Essential supplies including notebooks, pens, pencils, and calculator',
        price: 24.99,
        isActive: true,
    });
    await db.collection('inventory').add({
        productId: product4Ref.id,
        location: 'Warehouse A',
        quantityOnHand: 150,
        reorderLevel: 30,
    });
    // Create Sample Orders
    console.log('🛒 Creating sample orders...');
    const order1Ref = db.collection('orders').doc();
    await order1Ref.set({
        studentId: student1Ref.id,
        status: 'COMPLETED',
        totalAmount: 64.98,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    await db.collection('orderItems').add({
        orderId: order1Ref.id,
        productId: product1Ref.id,
        quantity: 1,
        unitPrice: 29.99,
    });
    await db.collection('orderItems').add({
        orderId: order1Ref.id,
        productId: product2Ref.id,
        quantity: 1,
        unitPrice: 34.99,
    });
    // Payment for Order 1
    await db.collection('payments').add({
        orderId: order1Ref.id,
        amount: 64.98,
        status: 'COMPLETED',
        paymentMethod: 'CREDIT_CARD',
        transactionReference: 'TXN-001-2024',
        paidAt: new Date(),
    });
    // Logistics for Order 1
    await db.collection('logisticsTracking').add({
        orderId: order1Ref.id,
        trackingNumber: 'TRACK-001',
        status: 'DELIVERED',
        estimatedDelivery: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        actualDelivery: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    });
    const order2Ref = db.collection('orders').doc();
    await order2Ref.set({
        studentId: student2Ref.id,
        status: 'PROCESSING',
        totalAmount: 114.98,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    await db.collection('orderItems').add({
        orderId: order2Ref.id,
        productId: product3Ref.id,
        quantity: 1,
        unitPrice: 89.99,
    });
    await db.collection('orderItems').add({
        orderId: order2Ref.id,
        productId: product4Ref.id,
        quantity: 1,
        unitPrice: 24.99,
    });
    // Payment for Order 2
    await db.collection('payments').add({
        orderId: order2Ref.id,
        amount: 114.98,
        status: 'PENDING',
        paymentMethod: 'BANK_TRANSFER',
        transactionReference: 'TXN-002-2024',
        paidAt: null,
    });
    // Logistics for Order 2
    await db.collection('logisticsTracking').add({
        orderId: order2Ref.id,
        trackingNumber: 'TRACK-002',
        status: 'IN_TRANSIT',
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        actualDelivery: null,
    });
    // Create Production Logs
    console.log('🏭 Creating production logs...');
    await db.collection('productionLogs').add({
        productId: product3Ref.id,
        departmentId: productionDeptRef.id,
        batchNumber: 'BATCH-001',
        quantityProduced: 50,
        timestamp: new Date(),
        notes: 'Initial production batch for school uniforms',
    });
    await db.collection('productionLogs').add({
        productId: product4Ref.id,
        departmentId: productionDeptRef.id,
        batchNumber: 'BATCH-002',
        quantityProduced: 100,
        timestamp: new Date(),
        notes: 'Supply kits assembled and packaged',
    });
    // Create Fees
    console.log('💰 Creating fees...');
    await db.collection('fees').add({
        studentId: student1Ref.id,
        title: 'Tuition Fee - Term 1',
        amount: 5000.00,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'PENDING',
        paymentDate: null,
        transactionRef: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    await db.collection('fees').add({
        studentId: student2Ref.id,
        title: 'Tuition Fee - Term 1',
        amount: 5000.00,
        dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        status: 'OVERDUE',
        paymentDate: null,
        transactionRef: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    await db.collection('fees').add({
        studentId: student1Ref.id,
        title: 'Lab Fee',
        amount: 200.00,
        dueDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        status: 'PAID',
        paymentDate: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000),
        transactionRef: 'TXN-FEE-001',
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    // Create Attendance
    console.log('📅 Creating attendance records...');
    const today = new Date();
    // Student 1 - Mostly present
    for (let i = 0; i < 5; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        await db.collection('attendance').add({
            studentId: student1Ref.id,
            date,
            dateStr,
            status: 'PRESENT',
            remarks: null,
        });
    }
    // Student 2 - Some absences
    const todayStr = today.toISOString().split('T')[0];
    await db.collection('attendance').add({
        studentId: student2Ref.id,
        date: today,
        dateStr: todayStr,
        status: 'ABSENT',
        remarks: 'Sick leave',
    });
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    await db.collection('attendance').add({
        studentId: student2Ref.id,
        date: yesterday,
        dateStr: yesterdayStr,
        status: 'LATE',
        remarks: 'Bus delay',
    });
    console.log('✅ Firestore seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log('   - Roles: 6 (ADMIN, STUDENT, PARENT, STAFF, TEACHER, SCHOOL_ADMIN)');
    console.log('   - Departments: 4 (IT, Finance, Logistics, Production)');
    console.log('   - Users: 7 (1 admin, 1 staff, 2 students, 1 parent, 1 teacher, 1 school admin)');
    console.log('   - Products: 4 (textbooks, uniforms, supplies)');
    console.log('   - Orders: 2 (1 completed, 1 processing)');
    console.log('   - Payments: 2');
    console.log('   - Logistics Tracking: 2');
    console.log('   - Production Logs: 2');
    console.log('   - Fees: 3');
    console.log('   - Attendance Records: 7');
    console.log('\n🔑 Test Credentials:');
    console.log('   Admin: admin@samavest.com / 12345678');
    console.log('   Student 1: john.doe@chalkboard.com / 12345678');
    console.log('   Student 2: jane.smith@chalkboard.com / 12345678');
    console.log('   Parent: parent@chalkboard.com / 12345678');
    console.log('   Staff: finance@samavest.com / 12345678');
    console.log('   Teacher: jane.smith@school.com / 12345678');
    console.log('   School Admin: admin@school.com / 12345678');
}
main()
    .catch((e) => {
    console.error('❌ Error seeding Firestore:', e);
    process.exit(1);
});
//# sourceMappingURL=seed-firestore.js.map