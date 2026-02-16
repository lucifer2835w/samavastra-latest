import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Starting database seed...');

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🧹 Cleaning existing data...');
    await prisma.payment.deleteMany();
    await prisma.logisticsTracking.deleteMany();
    await prisma.productionLog.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.inventory.deleteMany();
    await prisma.product.deleteMany();
    await prisma.student.deleteMany();
    await prisma.userRole.deleteMany();
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();
    await prisma.department.deleteMany();

    // Create Roles
    console.log('👥 Creating roles...');
    const adminRole = await prisma.role.create({
        data: { name: 'ADMIN', description: 'System administrator with full access' },
    });
    const studentRole = await prisma.role.create({
        data: { name: 'STUDENT', description: 'Student user with marketplace access' },
    });
    const parentRole = await prisma.role.create({
        data: { name: 'PARENT', description: 'Parent user with student oversight' },
    });
    const staffRole = await prisma.role.create({
        data: { name: 'STAFF', description: 'Staff member with department access' },
    });
    const teacherRole = await prisma.role.create({
        data: { name: 'TEACHER', description: 'Teacher with class and student management access' },
    });
    const schoolAdminRole = await prisma.role.create({
        data: { name: 'SCHOOL_ADMIN', description: 'School administrator' },
    });

    // Create Departments
    console.log('🏢 Creating departments...');
    const itDept = await prisma.department.create({
        data: { code: 'IT', name: 'Information Technology' },
    });
    const financeDept = await prisma.department.create({
        data: { code: 'FIN', name: 'Finance' },
    });
    const logisticsDept = await prisma.department.create({
        data: { code: 'LOG', name: 'Logistics' },
    });
    const productionDept = await prisma.department.create({
        data: { code: 'PROD', name: 'Production' },
    });

    // Create Admin User
    console.log('👤 Creating admin user...');
    const adminPasswordHash = await bcrypt.hash('admin123', 10);
    const adminUser = await prisma.user.create({
        data: {
            email: 'admin@samavest.com',
            passwordHash: adminPasswordHash,
            firstName: 'Admin',
            lastName: 'User',
            phone: '+1234567890',
            isActive: true,
            departmentId: itDept.id,
        },
    });
    await prisma.userRole.create({
        data: { userId: adminUser.id, roleId: adminRole.id },
    });

    // Create Staff Users
    console.log('👔 Creating staff users...');
    const staffPasswordHash = await bcrypt.hash('staff123', 10);
    const financeStaff = await prisma.user.create({
        data: {
            email: 'finance@samavest.com',
            passwordHash: staffPasswordHash,
            firstName: 'Finance',
            lastName: 'Manager',
            phone: '+1234567891',
            departmentId: financeDept.id,
        },
    });
    await prisma.userRole.create({
        data: { userId: financeStaff.id, roleId: staffRole.id },
    });

    // Create Student Users
    console.log('🎓 Creating student users...');
    const studentPasswordHash = await bcrypt.hash('student123', 10);

    const student1User = await prisma.user.create({
        data: {
            email: 'john.doe@chalkboard.com',
            passwordHash: studentPasswordHash,
            firstName: 'John',
            lastName: 'Doe',
            phone: '+1234567892',
        },
    });
    await prisma.userRole.create({
        data: { userId: student1User.id, roleId: studentRole.id },
    });
    const student1 = await prisma.student.create({
        data: {
            user: { connect: { id: student1User.id } },
            studentNumber: 'STU001',
            status: 'ACTIVE',
        },
    });

    const student2User = await prisma.user.create({
        data: {
            email: 'jane.smith@chalkboard.com',
            passwordHash: studentPasswordHash,
            firstName: 'Jane',
            lastName: 'Smith',
            phone: '+1234567893',
        },
    });
    await prisma.userRole.create({
        data: { userId: student2User.id, roleId: studentRole.id },
    });
    const student2 = await prisma.student.create({
        data: {
            user: { connect: { id: student2User.id } },
            studentNumber: 'STU002',
            status: 'ACTIVE',
        },
    });

    // Create Parent User
    console.log('👨‍👩‍👧 Creating parent user...');
    const parentPasswordHash = await bcrypt.hash('parent123', 10);
    const parentUser = await prisma.user.create({
        data: {
            email: 'parent@chalkboard.com',
            passwordHash: parentPasswordHash,
            firstName: 'Parent',
            lastName: 'Guardian',
            phone: '+1234567894',
        },
    });
    await prisma.userRole.create({
        data: { userId: parentUser.id, roleId: parentRole.id },
    });

    // Create Teacher User
    console.log('👩‍🏫 Creating teacher user...');
    const teacherPasswordHash = await bcrypt.hash('teacher123', 10);
    const teacherUser = await prisma.user.create({
        data: {
            email: 'jane.smith@school.com',
            passwordHash: teacherPasswordHash,
            firstName: 'Jane',
            lastName: 'Smith',
            phone: '+1234567895',
        },
    });
    await prisma.userRole.create({
        data: { userId: teacherUser.id, roleId: teacherRole.id },
    });

    // Create School Admin User
    console.log('🏫 Creating school admin user...');
    const schoolAdminPasswordHash = await bcrypt.hash('admin123', 10);
    const schoolAdminUser = await prisma.user.create({
        data: {
            email: 'admin@school.com',
            passwordHash: schoolAdminPasswordHash,
            firstName: 'School',
            lastName: 'Admin',
            phone: '+1234567896',
        },
    });
    await prisma.userRole.create({
        data: { userId: schoolAdminUser.id, roleId: schoolAdminRole.id },
    });

    // Create Products
    console.log('📦 Creating products...');
    const product1 = await prisma.product.create({
        data: {
            sku: 'BOOK-001',
            name: 'Mathematics Textbook Grade 10',
            description: 'Comprehensive mathematics textbook for grade 10 students',
            price: 29.99,
            isActive: true,
        },
    });
    await prisma.inventory.create({
        data: {
            productId: product1.id,
            location: 'Warehouse A',
            quantityOnHand: 100,
            reorderLevel: 20,
        },
    });

    const product2 = await prisma.product.create({
        data: {
            sku: 'BOOK-002',
            name: 'Science Textbook Grade 10',
            description: 'Comprehensive science textbook for grade 10 students',
            price: 34.99,
            isActive: true,
        },
    });
    await prisma.inventory.create({
        data: {
            productId: product2.id,
            location: 'Warehouse A',
            quantityOnHand: 85,
            reorderLevel: 20,
        },
    });

    const product3 = await prisma.product.create({
        data: {
            sku: 'UNIFORM-001',
            name: 'School Uniform Set',
            description: 'Complete school uniform including shirt, pants, and tie',
            price: 89.99,
            isActive: true,
        },
    });
    await prisma.inventory.create({
        data: {
            productId: product3.id,
            location: 'Warehouse B',
            quantityOnHand: 50,
            reorderLevel: 10,
        },
    });

    const product4 = await prisma.product.create({
        data: {
            sku: 'SUPPLY-001',
            name: 'Student Supply Kit',
            description: 'Essential supplies including notebooks, pens, pencils, and calculator',
            price: 24.99,
            isActive: true,
        },
    });
    await prisma.inventory.create({
        data: {
            productId: product4.id,
            location: 'Warehouse A',
            quantityOnHand: 150,
            reorderLevel: 30,
        },
    });

    // Create Sample Orders
    console.log('🛒 Creating sample orders...');
    const order1 = await prisma.order.create({
        data: {
            studentId: student1.id,
            status: 'COMPLETED',
            totalAmount: 64.98,
            items: {
                create: [
                    {
                        productId: product1.id,
                        quantity: 1,
                        unitPrice: 29.99,
                    },
                    {
                        productId: product2.id,
                        quantity: 1,
                        unitPrice: 34.99,
                    },
                ],
            },
        },
    });

    // Create Payment for Order 1
    await prisma.payment.create({
        data: {
            orderId: order1.id,
            amount: 64.98,
            status: 'COMPLETED',
            paymentMethod: 'CREDIT_CARD',
            transactionReference: 'TXN-001-2024',
            paidAt: new Date(),
        },
    });

    // Create Logistics Tracking for Order 1
    await prisma.logisticsTracking.create({
        data: {
            orderId: order1.id,
            trackingNumber: 'TRACK-001',
            status: 'DELIVERED',
            estimatedDelivery: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            actualDelivery: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        },
    });

    const order2 = await prisma.order.create({
        data: {
            studentId: student2.id,
            status: 'PROCESSING',
            totalAmount: 114.98,
            items: {
                create: [
                    {
                        productId: product3.id,
                        quantity: 1,
                        unitPrice: 89.99,
                    },
                    {
                        productId: product4.id,
                        quantity: 1,
                        unitPrice: 24.99,
                    },
                ],
            },
        },
    });

    // Create Payment for Order 2
    await prisma.payment.create({
        data: {
            orderId: order2.id,
            amount: 114.98,
            status: 'PENDING',
            paymentMethod: 'BANK_TRANSFER',
            transactionReference: 'TXN-002-2024',
        },
    });

    // Create Logistics Tracking for Order 2
    await prisma.logisticsTracking.create({
        data: {
            orderId: order2.id,
            trackingNumber: 'TRACK-002',
            status: 'IN_TRANSIT',
            estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        },
    });

    // Create Production Logs
    console.log('🏭 Creating production logs...');
    await prisma.productionLog.create({
        data: {
            productId: product3.id,
            departmentId: productionDept.id,
            batchNumber: 'BATCH-001',
            quantityProduced: 50,
            notes: 'Initial production batch for school uniforms',
        },
    });

    await prisma.productionLog.create({
        data: {
            productId: product4.id,
            departmentId: productionDept.id,
            batchNumber: 'BATCH-002',
            quantityProduced: 100,
            notes: 'Supply kits assembled and packaged',
        },
    });

    // Create Fees
    console.log('💰 Creating fees...');
    await prisma.fee.create({
        data: {
            studentId: student1.id,
            title: 'Tuition Fee - Term 1',
            amount: 5000.00,
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            status: 'PENDING',
        }
    });

    await prisma.fee.create({
        data: {
            studentId: student2.id,
            title: 'Tuition Fee - Term 1',
            amount: 5000.00,
            dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // Overdue
            status: 'OVERDUE',
        }
    });

    await prisma.fee.create({
        data: {
            studentId: student1.id,
            title: 'Lab Fee',
            amount: 200.00,
            dueDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
            status: 'PAID',
            paymentDate: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000),
            transactionRef: 'TXN-FEE-001',
        }
    });

    // Create Attendance
    console.log('📅 Creating attendance records...');
    const today = new Date();
    // Student 1 - Mostly present
    for (let i = 0; i < 5; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        await prisma.attendance.create({
            data: {
                studentId: student1.id,
                date: date,
                status: 'PRESENT',
            }
        });
    }

    // Student 2 - Some absences
    await prisma.attendance.create({
        data: {
            studentId: student2.id,
            date: new Date(today),
            status: 'ABSENT',
            remarks: 'Sick leave',
        }
    });
    await prisma.attendance.create({
        data: {
            studentId: student2.id,
            date: new Date(today.getTime() - 24 * 60 * 60 * 1000),
            status: 'LATE',
            remarks: 'Bus delay',
        }
    });

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Roles: 4 (ADMIN, STUDENT, PARENT, STAFF)`);
    console.log(`   - Departments: 4 (IT, Finance, Logistics, Production)`);
    console.log(`   - Users: 6 (1 admin, 1 staff, 2 students, 1 parent, 1 finance)`);
    console.log(`   - Products: 4 (textbooks, uniforms, supplies)`);
    console.log(`   - Orders: 2 (1 completed, 1 processing)`);
    console.log(`   - Payments: 2`);
    console.log(`   - Logistics Tracking: 2`);
    console.log(`   - Production Logs: 2`);
    console.log(`   - Fees: 3`);
    console.log(`   - Attendance Records: 7`);
    console.log(`   - Production Logs: 2`);
    console.log('\n🔑 Test Credentials:');
    console.log('   Admin: admin@samavest.com / admin123');
    console.log('   Student 1: john.doe@chalkboard.com / student123');
    console.log('   Student 2: jane.smith@chalkboard.com / student123');
    console.log('   Parent: parent@chalkboard.com / parent123');
    console.log('   Staff: finance@samavest.com / staff123');
    console.log('   Teacher: jane.smith@school.com / teacher123');
    console.log('   School Admin: admin@school.com / admin123');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
