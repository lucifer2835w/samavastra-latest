import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
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
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Role: "Role";
    readonly UserRole: "UserRole";
    readonly Student: "Student";
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
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
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
export declare const StudentScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly studentNumber: "studentNumber";
    readonly grade: "grade";
    readonly status: "status";
};
export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum];
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