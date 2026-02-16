import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: any;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: any;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: any;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: any;
export declare const ModelName: {
    readonly User: "User";
    readonly Role: "Role";
    readonly UserRole: "UserRole";
    readonly Class: "Class";
    readonly Subject: "Subject";
    readonly Student: "Student";
    readonly Teacher: "Teacher";
    readonly Parent: "Parent";
    readonly Attendance: "Attendance";
    readonly Homework: "Homework";
    readonly HomeworkSubmission: "HomeworkSubmission";
    readonly ParentAccess: "ParentAccess";
    readonly Exam: "Exam";
    readonly ExamResult: "ExamResult";
    readonly Notification: "Notification";
    readonly Fee: "Fee";
    readonly Department: "Department";
    readonly Product: "Product";
    readonly Order: "Order";
    readonly OrderItem: "OrderItem";
    readonly Inventory: "Inventory";
    readonly ProductionLog: "ProductionLog";
    readonly LogisticsTracking: "LogisticsTracking";
    readonly Payment: "Payment";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: any;
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly phone: "phone";
    readonly isActive: "isActive";
    readonly departmentId: "departmentId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const RoleScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
};
export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum];
export declare const UserRoleScalarFieldEnum: {
    readonly userId: "userId";
    readonly roleId: "roleId";
};
export type UserRoleScalarFieldEnum = (typeof UserRoleScalarFieldEnum)[keyof typeof UserRoleScalarFieldEnum];
export declare const ClassScalarFieldEnum: {
    readonly id: "id";
    readonly grade: "grade";
    readonly section: "section";
    readonly teacherId: "teacherId";
};
export type ClassScalarFieldEnum = (typeof ClassScalarFieldEnum)[keyof typeof ClassScalarFieldEnum];
export declare const SubjectScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly code: "code";
    readonly description: "description";
};
export type SubjectScalarFieldEnum = (typeof SubjectScalarFieldEnum)[keyof typeof SubjectScalarFieldEnum];
export declare const StudentScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly studentNumber: "studentNumber";
    readonly classId: "classId";
    readonly parentId: "parentId";
    readonly status: "status";
};
export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum];
export declare const TeacherScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly employeeId: "employeeId";
    readonly qualification: "qualification";
};
export type TeacherScalarFieldEnum = (typeof TeacherScalarFieldEnum)[keyof typeof TeacherScalarFieldEnum];
export declare const ParentScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
};
export type ParentScalarFieldEnum = (typeof ParentScalarFieldEnum)[keyof typeof ParentScalarFieldEnum];
export declare const AttendanceScalarFieldEnum: {
    readonly id: "id";
    readonly studentId: "studentId";
    readonly date: "date";
    readonly status: "status";
    readonly remarks: "remarks";
};
export type AttendanceScalarFieldEnum = (typeof AttendanceScalarFieldEnum)[keyof typeof AttendanceScalarFieldEnum];
export declare const HomeworkScalarFieldEnum: {
    readonly id: "id";
    readonly subjectId: "subjectId";
    readonly title: "title";
    readonly description: "description";
    readonly dueDate: "dueDate";
};
export type HomeworkScalarFieldEnum = (typeof HomeworkScalarFieldEnum)[keyof typeof HomeworkScalarFieldEnum];
export declare const HomeworkSubmissionScalarFieldEnum: {
    readonly id: "id";
    readonly homeworkId: "homeworkId";
    readonly studentId: "studentId";
    readonly content: "content";
    readonly fileUrl: "fileUrl";
    readonly submittedAt: "submittedAt";
    readonly grade: "grade";
};
export type HomeworkSubmissionScalarFieldEnum = (typeof HomeworkSubmissionScalarFieldEnum)[keyof typeof HomeworkSubmissionScalarFieldEnum];
export declare const ParentAccessScalarFieldEnum: {
    readonly id: "id";
    readonly parentId: "parentId";
    readonly studentId: "studentId";
    readonly canViewGrades: "canViewGrades";
    readonly canViewAttendance: "canViewAttendance";
    readonly canViewFees: "canViewFees";
    readonly canViewHomework: "canViewHomework";
};
export type ParentAccessScalarFieldEnum = (typeof ParentAccessScalarFieldEnum)[keyof typeof ParentAccessScalarFieldEnum];
export declare const ExamScalarFieldEnum: {
    readonly id: "id";
    readonly subjectId: "subjectId";
    readonly name: "name";
    readonly date: "date";
    readonly maxMarks: "maxMarks";
};
export type ExamScalarFieldEnum = (typeof ExamScalarFieldEnum)[keyof typeof ExamScalarFieldEnum];
export declare const ExamResultScalarFieldEnum: {
    readonly id: "id";
    readonly examId: "examId";
    readonly studentId: "studentId";
    readonly marksObtained: "marksObtained";
    readonly grade: "grade";
};
export type ExamResultScalarFieldEnum = (typeof ExamResultScalarFieldEnum)[keyof typeof ExamResultScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly message: "message";
    readonly type: "type";
    readonly senderId: "senderId";
    readonly recipientId: "recipientId";
    readonly targetRole: "targetRole";
    readonly classId: "classId";
    readonly isRead: "isRead";
    readonly createdAt: "createdAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const FeeScalarFieldEnum: {
    readonly id: "id";
    readonly studentId: "studentId";
    readonly title: "title";
    readonly amount: "amount";
    readonly dueDate: "dueDate";
    readonly status: "status";
    readonly paymentDate: "paymentDate";
    readonly transactionRef: "transactionRef";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type FeeScalarFieldEnum = (typeof FeeScalarFieldEnum)[keyof typeof FeeScalarFieldEnum];
export declare const DepartmentScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly name: "name";
};
export type DepartmentScalarFieldEnum = (typeof DepartmentScalarFieldEnum)[keyof typeof DepartmentScalarFieldEnum];
export declare const ProductScalarFieldEnum: {
    readonly id: "id";
    readonly sku: "sku";
    readonly name: "name";
    readonly description: "description";
    readonly price: "price";
    readonly isActive: "isActive";
};
export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];
export declare const OrderScalarFieldEnum: {
    readonly id: "id";
    readonly studentId: "studentId";
    readonly status: "status";
    readonly totalAmount: "totalAmount";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const OrderItemScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly productId: "productId";
    readonly quantity: "quantity";
    readonly unitPrice: "unitPrice";
};
export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum];
export declare const InventoryScalarFieldEnum: {
    readonly id: "id";
    readonly productId: "productId";
    readonly location: "location";
    readonly quantityOnHand: "quantityOnHand";
    readonly reorderLevel: "reorderLevel";
};
export type InventoryScalarFieldEnum = (typeof InventoryScalarFieldEnum)[keyof typeof InventoryScalarFieldEnum];
export declare const ProductionLogScalarFieldEnum: {
    readonly id: "id";
    readonly productId: "productId";
    readonly departmentId: "departmentId";
    readonly batchNumber: "batchNumber";
    readonly quantityProduced: "quantityProduced";
    readonly timestamp: "timestamp";
    readonly notes: "notes";
};
export type ProductionLogScalarFieldEnum = (typeof ProductionLogScalarFieldEnum)[keyof typeof ProductionLogScalarFieldEnum];
export declare const LogisticsTrackingScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly trackingNumber: "trackingNumber";
    readonly status: "status";
    readonly estimatedDelivery: "estimatedDelivery";
    readonly actualDelivery: "actualDelivery";
};
export type LogisticsTrackingScalarFieldEnum = (typeof LogisticsTrackingScalarFieldEnum)[keyof typeof LogisticsTrackingScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly amount: "amount";
    readonly status: "status";
    readonly paymentMethod: "paymentMethod";
    readonly transactionReference: "transactionReference";
    readonly paidAt: "paidAt";
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map