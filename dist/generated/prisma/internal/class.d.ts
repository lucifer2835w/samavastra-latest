import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
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
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
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
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://pris.ly/d/raw-queries).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.user`: Exposes CRUD operations for the **User** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more Users
  * const users = await prisma.user.findMany()
  * ```
  */
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.role`: Exposes CRUD operations for the **Role** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Roles
      * const roles = await prisma.role.findMany()
      * ```
      */
    get role(): Prisma.RoleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.userRole`: Exposes CRUD operations for the **UserRole** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more UserRoles
      * const userRoles = await prisma.userRole.findMany()
      * ```
      */
    get userRole(): Prisma.UserRoleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.class`: Exposes CRUD operations for the **Class** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Classes
      * const classes = await prisma.class.findMany()
      * ```
      */
    get class(): Prisma.ClassDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.subject`: Exposes CRUD operations for the **Subject** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Subjects
      * const subjects = await prisma.subject.findMany()
      * ```
      */
    get subject(): Prisma.SubjectDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.student`: Exposes CRUD operations for the **Student** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Students
      * const students = await prisma.student.findMany()
      * ```
      */
    get student(): Prisma.StudentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.teacher`: Exposes CRUD operations for the **Teacher** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Teachers
      * const teachers = await prisma.teacher.findMany()
      * ```
      */
    get teacher(): Prisma.TeacherDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.parent`: Exposes CRUD operations for the **Parent** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Parents
      * const parents = await prisma.parent.findMany()
      * ```
      */
    get parent(): Prisma.ParentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.attendance`: Exposes CRUD operations for the **Attendance** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Attendances
      * const attendances = await prisma.attendance.findMany()
      * ```
      */
    get attendance(): Prisma.AttendanceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.homework`: Exposes CRUD operations for the **Homework** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Homework
      * const homework = await prisma.homework.findMany()
      * ```
      */
    get homework(): Prisma.HomeworkDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.homeworkSubmission`: Exposes CRUD operations for the **HomeworkSubmission** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more HomeworkSubmissions
      * const homeworkSubmissions = await prisma.homeworkSubmission.findMany()
      * ```
      */
    get homeworkSubmission(): Prisma.HomeworkSubmissionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.parentAccess`: Exposes CRUD operations for the **ParentAccess** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ParentAccesses
      * const parentAccesses = await prisma.parentAccess.findMany()
      * ```
      */
    get parentAccess(): Prisma.ParentAccessDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.exam`: Exposes CRUD operations for the **Exam** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Exams
      * const exams = await prisma.exam.findMany()
      * ```
      */
    get exam(): Prisma.ExamDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.examResult`: Exposes CRUD operations for the **ExamResult** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ExamResults
      * const examResults = await prisma.examResult.findMany()
      * ```
      */
    get examResult(): Prisma.ExamResultDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Notifications
      * const notifications = await prisma.notification.findMany()
      * ```
      */
    get notification(): Prisma.NotificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.fee`: Exposes CRUD operations for the **Fee** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Fees
      * const fees = await prisma.fee.findMany()
      * ```
      */
    get fee(): Prisma.FeeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.department`: Exposes CRUD operations for the **Department** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Departments
      * const departments = await prisma.department.findMany()
      * ```
      */
    get department(): Prisma.DepartmentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.product`: Exposes CRUD operations for the **Product** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Products
      * const products = await prisma.product.findMany()
      * ```
      */
    get product(): Prisma.ProductDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.order`: Exposes CRUD operations for the **Order** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Orders
      * const orders = await prisma.order.findMany()
      * ```
      */
    get order(): Prisma.OrderDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more OrderItems
      * const orderItems = await prisma.orderItem.findMany()
      * ```
      */
    get orderItem(): Prisma.OrderItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.inventory`: Exposes CRUD operations for the **Inventory** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Inventories
      * const inventories = await prisma.inventory.findMany()
      * ```
      */
    get inventory(): Prisma.InventoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.productionLog`: Exposes CRUD operations for the **ProductionLog** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ProductionLogs
      * const productionLogs = await prisma.productionLog.findMany()
      * ```
      */
    get productionLog(): Prisma.ProductionLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.logisticsTracking`: Exposes CRUD operations for the **LogisticsTracking** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more LogisticsTrackings
      * const logisticsTrackings = await prisma.logisticsTracking.findMany()
      * ```
      */
    get logisticsTracking(): Prisma.LogisticsTrackingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Payments
      * const payments = await prisma.payment.findMany()
      * ```
      */
    get payment(): Prisma.PaymentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map