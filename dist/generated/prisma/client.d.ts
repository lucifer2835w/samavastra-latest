import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class";
import * as Prisma from "./internal/prismaNamespace";
export * as $Enums from './enums';
export * from "./enums";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model Role
 *
 */
export type Role = Prisma.RoleModel;
/**
 * Model UserRole
 *
 */
export type UserRole = Prisma.UserRoleModel;
/**
 * Model Class
 *
 */
export type Class = Prisma.ClassModel;
/**
 * Model Subject
 *
 */
export type Subject = Prisma.SubjectModel;
/**
 * Model Student
 *
 */
export type Student = Prisma.StudentModel;
/**
 * Model Teacher
 *
 */
export type Teacher = Prisma.TeacherModel;
/**
 * Model Parent
 *
 */
export type Parent = Prisma.ParentModel;
/**
 * Model Attendance
 *
 */
export type Attendance = Prisma.AttendanceModel;
/**
 * Model Homework
 *
 */
export type Homework = Prisma.HomeworkModel;
/**
 * Model HomeworkSubmission
 *
 */
export type HomeworkSubmission = Prisma.HomeworkSubmissionModel;
/**
 * Model ParentAccess
 *
 */
export type ParentAccess = Prisma.ParentAccessModel;
/**
 * Model Exam
 *
 */
export type Exam = Prisma.ExamModel;
/**
 * Model ExamResult
 *
 */
export type ExamResult = Prisma.ExamResultModel;
/**
 * Model Notification
 *
 */
export type Notification = Prisma.NotificationModel;
/**
 * Model Fee
 *
 */
export type Fee = Prisma.FeeModel;
/**
 * Model Department
 *
 */
export type Department = Prisma.DepartmentModel;
/**
 * Model Product
 *
 */
export type Product = Prisma.ProductModel;
/**
 * Model Order
 *
 */
export type Order = Prisma.OrderModel;
/**
 * Model OrderItem
 *
 */
export type OrderItem = Prisma.OrderItemModel;
/**
 * Model Inventory
 *
 */
export type Inventory = Prisma.InventoryModel;
/**
 * Model ProductionLog
 *
 */
export type ProductionLog = Prisma.ProductionLogModel;
/**
 * Model LogisticsTracking
 *
 */
export type LogisticsTracking = Prisma.LogisticsTrackingModel;
/**
 * Model Payment
 *
 */
export type Payment = Prisma.PaymentModel;
//# sourceMappingURL=client.d.ts.map