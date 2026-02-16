import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Student
 *
 */
export type StudentModel = runtime.Types.Result.DefaultSelection<Prisma.$StudentPayload>;
export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null;
    _avg: StudentAvgAggregateOutputType | null;
    _sum: StudentSumAggregateOutputType | null;
    _min: StudentMinAggregateOutputType | null;
    _max: StudentMaxAggregateOutputType | null;
};
export type StudentAvgAggregateOutputType = {
    id: number | null;
    userId: number | null;
    classId: number | null;
    parentId: number | null;
};
export type StudentSumAggregateOutputType = {
    id: number | null;
    userId: number | null;
    classId: number | null;
    parentId: number | null;
};
export type StudentMinAggregateOutputType = {
    id: number | null;
    userId: number | null;
    studentNumber: string | null;
    classId: number | null;
    parentId: number | null;
    status: string | null;
};
export type StudentMaxAggregateOutputType = {
    id: number | null;
    userId: number | null;
    studentNumber: string | null;
    classId: number | null;
    parentId: number | null;
    status: string | null;
};
export type StudentCountAggregateOutputType = {
    id: number;
    userId: number;
    studentNumber: number;
    classId: number;
    parentId: number;
    status: number;
    _all: number;
};
export type StudentAvgAggregateInputType = {
    id?: true;
    userId?: true;
    classId?: true;
    parentId?: true;
};
export type StudentSumAggregateInputType = {
    id?: true;
    userId?: true;
    classId?: true;
    parentId?: true;
};
export type StudentMinAggregateInputType = {
    id?: true;
    userId?: true;
    studentNumber?: true;
    classId?: true;
    parentId?: true;
    status?: true;
};
export type StudentMaxAggregateInputType = {
    id?: true;
    userId?: true;
    studentNumber?: true;
    classId?: true;
    parentId?: true;
    status?: true;
};
export type StudentCountAggregateInputType = {
    id?: true;
    userId?: true;
    studentNumber?: true;
    classId?: true;
    parentId?: true;
    status?: true;
    _all?: true;
};
export type StudentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: Prisma.StudentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Students to fetch.
     */
    orderBy?: Prisma.StudentOrderByWithRelationInput | Prisma.StudentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.StudentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Students from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Students.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: StudentAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: StudentSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType;
};
export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
    [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStudent[P]> : Prisma.GetScalarType<T[P], AggregateStudent[P]>;
};
export type StudentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StudentWhereInput;
    orderBy?: Prisma.StudentOrderByWithAggregationInput | Prisma.StudentOrderByWithAggregationInput[];
    by: Prisma.StudentScalarFieldEnum[] | Prisma.StudentScalarFieldEnum;
    having?: Prisma.StudentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StudentCountAggregateInputType | true;
    _avg?: StudentAvgAggregateInputType;
    _sum?: StudentSumAggregateInputType;
    _min?: StudentMinAggregateInputType;
    _max?: StudentMaxAggregateInputType;
};
export type StudentGroupByOutputType = {
    id: number;
    userId: number;
    studentNumber: string;
    classId: number | null;
    parentId: number | null;
    status: string;
    _count: StudentCountAggregateOutputType | null;
    _avg: StudentAvgAggregateOutputType | null;
    _sum: StudentSumAggregateOutputType | null;
    _min: StudentMinAggregateOutputType | null;
    _max: StudentMaxAggregateOutputType | null;
};
type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StudentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StudentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StudentGroupByOutputType[P]>;
}>>;
export type StudentWhereInput = {
    AND?: Prisma.StudentWhereInput | Prisma.StudentWhereInput[];
    OR?: Prisma.StudentWhereInput[];
    NOT?: Prisma.StudentWhereInput | Prisma.StudentWhereInput[];
    id?: Prisma.IntFilter<"Student"> | number;
    userId?: Prisma.IntFilter<"Student"> | number;
    studentNumber?: Prisma.StringFilter<"Student"> | string;
    classId?: Prisma.IntNullableFilter<"Student"> | number | null;
    parentId?: Prisma.IntNullableFilter<"Student"> | number | null;
    status?: Prisma.StringFilter<"Student"> | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    class?: Prisma.XOR<Prisma.ClassNullableScalarRelationFilter, Prisma.ClassWhereInput> | null;
    parent?: Prisma.XOR<Prisma.ParentNullableScalarRelationFilter, Prisma.ParentWhereInput> | null;
    orders?: Prisma.OrderListRelationFilter;
    attendance?: Prisma.AttendanceListRelationFilter;
    results?: Prisma.ExamResultListRelationFilter;
    homeworkSubmissions?: Prisma.HomeworkSubmissionListRelationFilter;
    fees?: Prisma.FeeListRelationFilter;
    parentAccess?: Prisma.ParentAccessListRelationFilter;
};
export type StudentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    studentNumber?: Prisma.SortOrder;
    classId?: Prisma.SortOrderInput | Prisma.SortOrder;
    parentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    class?: Prisma.ClassOrderByWithRelationInput;
    parent?: Prisma.ParentOrderByWithRelationInput;
    orders?: Prisma.OrderOrderByRelationAggregateInput;
    attendance?: Prisma.AttendanceOrderByRelationAggregateInput;
    results?: Prisma.ExamResultOrderByRelationAggregateInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionOrderByRelationAggregateInput;
    fees?: Prisma.FeeOrderByRelationAggregateInput;
    parentAccess?: Prisma.ParentAccessOrderByRelationAggregateInput;
};
export type StudentWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    userId?: number;
    studentNumber?: string;
    AND?: Prisma.StudentWhereInput | Prisma.StudentWhereInput[];
    OR?: Prisma.StudentWhereInput[];
    NOT?: Prisma.StudentWhereInput | Prisma.StudentWhereInput[];
    classId?: Prisma.IntNullableFilter<"Student"> | number | null;
    parentId?: Prisma.IntNullableFilter<"Student"> | number | null;
    status?: Prisma.StringFilter<"Student"> | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    class?: Prisma.XOR<Prisma.ClassNullableScalarRelationFilter, Prisma.ClassWhereInput> | null;
    parent?: Prisma.XOR<Prisma.ParentNullableScalarRelationFilter, Prisma.ParentWhereInput> | null;
    orders?: Prisma.OrderListRelationFilter;
    attendance?: Prisma.AttendanceListRelationFilter;
    results?: Prisma.ExamResultListRelationFilter;
    homeworkSubmissions?: Prisma.HomeworkSubmissionListRelationFilter;
    fees?: Prisma.FeeListRelationFilter;
    parentAccess?: Prisma.ParentAccessListRelationFilter;
}, "id" | "userId" | "studentNumber">;
export type StudentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    studentNumber?: Prisma.SortOrder;
    classId?: Prisma.SortOrderInput | Prisma.SortOrder;
    parentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    _count?: Prisma.StudentCountOrderByAggregateInput;
    _avg?: Prisma.StudentAvgOrderByAggregateInput;
    _max?: Prisma.StudentMaxOrderByAggregateInput;
    _min?: Prisma.StudentMinOrderByAggregateInput;
    _sum?: Prisma.StudentSumOrderByAggregateInput;
};
export type StudentScalarWhereWithAggregatesInput = {
    AND?: Prisma.StudentScalarWhereWithAggregatesInput | Prisma.StudentScalarWhereWithAggregatesInput[];
    OR?: Prisma.StudentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StudentScalarWhereWithAggregatesInput | Prisma.StudentScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Student"> | number;
    userId?: Prisma.IntWithAggregatesFilter<"Student"> | number;
    studentNumber?: Prisma.StringWithAggregatesFilter<"Student"> | string;
    classId?: Prisma.IntNullableWithAggregatesFilter<"Student"> | number | null;
    parentId?: Prisma.IntNullableWithAggregatesFilter<"Student"> | number | null;
    status?: Prisma.StringWithAggregatesFilter<"Student"> | string;
};
export type StudentCreateInput = {
    studentNumber: string;
    status?: string;
    user: Prisma.UserCreateNestedOneWithoutStudentInput;
    class?: Prisma.ClassCreateNestedOneWithoutStudentsInput;
    parent?: Prisma.ParentCreateNestedOneWithoutStudentsInput;
    orders?: Prisma.OrderCreateNestedManyWithoutStudentInput;
    attendance?: Prisma.AttendanceCreateNestedManyWithoutStudentInput;
    results?: Prisma.ExamResultCreateNestedManyWithoutStudentInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionCreateNestedManyWithoutStudentInput;
    fees?: Prisma.FeeCreateNestedManyWithoutStudentInput;
    parentAccess?: Prisma.ParentAccessCreateNestedManyWithoutStudentInput;
};
export type StudentUncheckedCreateInput = {
    id?: number;
    userId: number;
    studentNumber: string;
    classId?: number | null;
    parentId?: number | null;
    status?: string;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutStudentInput;
    attendance?: Prisma.AttendanceUncheckedCreateNestedManyWithoutStudentInput;
    results?: Prisma.ExamResultUncheckedCreateNestedManyWithoutStudentInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUncheckedCreateNestedManyWithoutStudentInput;
    fees?: Prisma.FeeUncheckedCreateNestedManyWithoutStudentInput;
    parentAccess?: Prisma.ParentAccessUncheckedCreateNestedManyWithoutStudentInput;
};
export type StudentUpdateInput = {
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    user?: Prisma.UserUpdateOneRequiredWithoutStudentNestedInput;
    class?: Prisma.ClassUpdateOneWithoutStudentsNestedInput;
    parent?: Prisma.ParentUpdateOneWithoutStudentsNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutStudentNestedInput;
    attendance?: Prisma.AttendanceUpdateManyWithoutStudentNestedInput;
    results?: Prisma.ExamResultUpdateManyWithoutStudentNestedInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUpdateManyWithoutStudentNestedInput;
    fees?: Prisma.FeeUpdateManyWithoutStudentNestedInput;
    parentAccess?: Prisma.ParentAccessUpdateManyWithoutStudentNestedInput;
};
export type StudentUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    parentId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutStudentNestedInput;
    attendance?: Prisma.AttendanceUncheckedUpdateManyWithoutStudentNestedInput;
    results?: Prisma.ExamResultUncheckedUpdateManyWithoutStudentNestedInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUncheckedUpdateManyWithoutStudentNestedInput;
    fees?: Prisma.FeeUncheckedUpdateManyWithoutStudentNestedInput;
    parentAccess?: Prisma.ParentAccessUncheckedUpdateManyWithoutStudentNestedInput;
};
export type StudentCreateManyInput = {
    id?: number;
    userId: number;
    studentNumber: string;
    classId?: number | null;
    parentId?: number | null;
    status?: string;
};
export type StudentUpdateManyMutationInput = {
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type StudentUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    parentId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type StudentNullableScalarRelationFilter = {
    is?: Prisma.StudentWhereInput | null;
    isNot?: Prisma.StudentWhereInput | null;
};
export type StudentListRelationFilter = {
    every?: Prisma.StudentWhereInput;
    some?: Prisma.StudentWhereInput;
    none?: Prisma.StudentWhereInput;
};
export type StudentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StudentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    studentNumber?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
};
export type StudentAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
};
export type StudentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    studentNumber?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
};
export type StudentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    studentNumber?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
};
export type StudentSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
};
export type StudentScalarRelationFilter = {
    is?: Prisma.StudentWhereInput;
    isNot?: Prisma.StudentWhereInput;
};
export type StudentCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutUserInput, Prisma.StudentUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutUserInput;
    connect?: Prisma.StudentWhereUniqueInput;
};
export type StudentUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutUserInput, Prisma.StudentUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutUserInput;
    connect?: Prisma.StudentWhereUniqueInput;
};
export type StudentUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutUserInput, Prisma.StudentUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutUserInput;
    upsert?: Prisma.StudentUpsertWithoutUserInput;
    disconnect?: Prisma.StudentWhereInput | boolean;
    delete?: Prisma.StudentWhereInput | boolean;
    connect?: Prisma.StudentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StudentUpdateToOneWithWhereWithoutUserInput, Prisma.StudentUpdateWithoutUserInput>, Prisma.StudentUncheckedUpdateWithoutUserInput>;
};
export type StudentUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutUserInput, Prisma.StudentUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutUserInput;
    upsert?: Prisma.StudentUpsertWithoutUserInput;
    disconnect?: Prisma.StudentWhereInput | boolean;
    delete?: Prisma.StudentWhereInput | boolean;
    connect?: Prisma.StudentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StudentUpdateToOneWithWhereWithoutUserInput, Prisma.StudentUpdateWithoutUserInput>, Prisma.StudentUncheckedUpdateWithoutUserInput>;
};
export type StudentCreateNestedManyWithoutClassInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutClassInput, Prisma.StudentUncheckedCreateWithoutClassInput> | Prisma.StudentCreateWithoutClassInput[] | Prisma.StudentUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutClassInput | Prisma.StudentCreateOrConnectWithoutClassInput[];
    createMany?: Prisma.StudentCreateManyClassInputEnvelope;
    connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
};
export type StudentUncheckedCreateNestedManyWithoutClassInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutClassInput, Prisma.StudentUncheckedCreateWithoutClassInput> | Prisma.StudentCreateWithoutClassInput[] | Prisma.StudentUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutClassInput | Prisma.StudentCreateOrConnectWithoutClassInput[];
    createMany?: Prisma.StudentCreateManyClassInputEnvelope;
    connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
};
export type StudentUpdateManyWithoutClassNestedInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutClassInput, Prisma.StudentUncheckedCreateWithoutClassInput> | Prisma.StudentCreateWithoutClassInput[] | Prisma.StudentUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutClassInput | Prisma.StudentCreateOrConnectWithoutClassInput[];
    upsert?: Prisma.StudentUpsertWithWhereUniqueWithoutClassInput | Prisma.StudentUpsertWithWhereUniqueWithoutClassInput[];
    createMany?: Prisma.StudentCreateManyClassInputEnvelope;
    set?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    disconnect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    delete?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    update?: Prisma.StudentUpdateWithWhereUniqueWithoutClassInput | Prisma.StudentUpdateWithWhereUniqueWithoutClassInput[];
    updateMany?: Prisma.StudentUpdateManyWithWhereWithoutClassInput | Prisma.StudentUpdateManyWithWhereWithoutClassInput[];
    deleteMany?: Prisma.StudentScalarWhereInput | Prisma.StudentScalarWhereInput[];
};
export type StudentUncheckedUpdateManyWithoutClassNestedInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutClassInput, Prisma.StudentUncheckedCreateWithoutClassInput> | Prisma.StudentCreateWithoutClassInput[] | Prisma.StudentUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutClassInput | Prisma.StudentCreateOrConnectWithoutClassInput[];
    upsert?: Prisma.StudentUpsertWithWhereUniqueWithoutClassInput | Prisma.StudentUpsertWithWhereUniqueWithoutClassInput[];
    createMany?: Prisma.StudentCreateManyClassInputEnvelope;
    set?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    disconnect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    delete?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    update?: Prisma.StudentUpdateWithWhereUniqueWithoutClassInput | Prisma.StudentUpdateWithWhereUniqueWithoutClassInput[];
    updateMany?: Prisma.StudentUpdateManyWithWhereWithoutClassInput | Prisma.StudentUpdateManyWithWhereWithoutClassInput[];
    deleteMany?: Prisma.StudentScalarWhereInput | Prisma.StudentScalarWhereInput[];
};
export type StudentCreateNestedManyWithoutParentInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutParentInput, Prisma.StudentUncheckedCreateWithoutParentInput> | Prisma.StudentCreateWithoutParentInput[] | Prisma.StudentUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutParentInput | Prisma.StudentCreateOrConnectWithoutParentInput[];
    createMany?: Prisma.StudentCreateManyParentInputEnvelope;
    connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
};
export type StudentUncheckedCreateNestedManyWithoutParentInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutParentInput, Prisma.StudentUncheckedCreateWithoutParentInput> | Prisma.StudentCreateWithoutParentInput[] | Prisma.StudentUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutParentInput | Prisma.StudentCreateOrConnectWithoutParentInput[];
    createMany?: Prisma.StudentCreateManyParentInputEnvelope;
    connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
};
export type StudentUpdateManyWithoutParentNestedInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutParentInput, Prisma.StudentUncheckedCreateWithoutParentInput> | Prisma.StudentCreateWithoutParentInput[] | Prisma.StudentUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutParentInput | Prisma.StudentCreateOrConnectWithoutParentInput[];
    upsert?: Prisma.StudentUpsertWithWhereUniqueWithoutParentInput | Prisma.StudentUpsertWithWhereUniqueWithoutParentInput[];
    createMany?: Prisma.StudentCreateManyParentInputEnvelope;
    set?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    disconnect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    delete?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    update?: Prisma.StudentUpdateWithWhereUniqueWithoutParentInput | Prisma.StudentUpdateWithWhereUniqueWithoutParentInput[];
    updateMany?: Prisma.StudentUpdateManyWithWhereWithoutParentInput | Prisma.StudentUpdateManyWithWhereWithoutParentInput[];
    deleteMany?: Prisma.StudentScalarWhereInput | Prisma.StudentScalarWhereInput[];
};
export type StudentUncheckedUpdateManyWithoutParentNestedInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutParentInput, Prisma.StudentUncheckedCreateWithoutParentInput> | Prisma.StudentCreateWithoutParentInput[] | Prisma.StudentUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutParentInput | Prisma.StudentCreateOrConnectWithoutParentInput[];
    upsert?: Prisma.StudentUpsertWithWhereUniqueWithoutParentInput | Prisma.StudentUpsertWithWhereUniqueWithoutParentInput[];
    createMany?: Prisma.StudentCreateManyParentInputEnvelope;
    set?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    disconnect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    delete?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    update?: Prisma.StudentUpdateWithWhereUniqueWithoutParentInput | Prisma.StudentUpdateWithWhereUniqueWithoutParentInput[];
    updateMany?: Prisma.StudentUpdateManyWithWhereWithoutParentInput | Prisma.StudentUpdateManyWithWhereWithoutParentInput[];
    deleteMany?: Prisma.StudentScalarWhereInput | Prisma.StudentScalarWhereInput[];
};
export type StudentCreateNestedOneWithoutAttendanceInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutAttendanceInput, Prisma.StudentUncheckedCreateWithoutAttendanceInput>;
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutAttendanceInput;
    connect?: Prisma.StudentWhereUniqueInput;
};
export type StudentUpdateOneRequiredWithoutAttendanceNestedInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutAttendanceInput, Prisma.StudentUncheckedCreateWithoutAttendanceInput>;
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutAttendanceInput;
    upsert?: Prisma.StudentUpsertWithoutAttendanceInput;
    connect?: Prisma.StudentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StudentUpdateToOneWithWhereWithoutAttendanceInput, Prisma.StudentUpdateWithoutAttendanceInput>, Prisma.StudentUncheckedUpdateWithoutAttendanceInput>;
};
export type StudentCreateNestedOneWithoutHomeworkSubmissionsInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutHomeworkSubmissionsInput, Prisma.StudentUncheckedCreateWithoutHomeworkSubmissionsInput>;
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutHomeworkSubmissionsInput;
    connect?: Prisma.StudentWhereUniqueInput;
};
export type StudentUpdateOneRequiredWithoutHomeworkSubmissionsNestedInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutHomeworkSubmissionsInput, Prisma.StudentUncheckedCreateWithoutHomeworkSubmissionsInput>;
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutHomeworkSubmissionsInput;
    upsert?: Prisma.StudentUpsertWithoutHomeworkSubmissionsInput;
    connect?: Prisma.StudentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StudentUpdateToOneWithWhereWithoutHomeworkSubmissionsInput, Prisma.StudentUpdateWithoutHomeworkSubmissionsInput>, Prisma.StudentUncheckedUpdateWithoutHomeworkSubmissionsInput>;
};
export type StudentCreateNestedOneWithoutParentAccessInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutParentAccessInput, Prisma.StudentUncheckedCreateWithoutParentAccessInput>;
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutParentAccessInput;
    connect?: Prisma.StudentWhereUniqueInput;
};
export type StudentUpdateOneRequiredWithoutParentAccessNestedInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutParentAccessInput, Prisma.StudentUncheckedCreateWithoutParentAccessInput>;
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutParentAccessInput;
    upsert?: Prisma.StudentUpsertWithoutParentAccessInput;
    connect?: Prisma.StudentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StudentUpdateToOneWithWhereWithoutParentAccessInput, Prisma.StudentUpdateWithoutParentAccessInput>, Prisma.StudentUncheckedUpdateWithoutParentAccessInput>;
};
export type StudentCreateNestedOneWithoutResultsInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutResultsInput, Prisma.StudentUncheckedCreateWithoutResultsInput>;
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutResultsInput;
    connect?: Prisma.StudentWhereUniqueInput;
};
export type StudentUpdateOneRequiredWithoutResultsNestedInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutResultsInput, Prisma.StudentUncheckedCreateWithoutResultsInput>;
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutResultsInput;
    upsert?: Prisma.StudentUpsertWithoutResultsInput;
    connect?: Prisma.StudentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StudentUpdateToOneWithWhereWithoutResultsInput, Prisma.StudentUpdateWithoutResultsInput>, Prisma.StudentUncheckedUpdateWithoutResultsInput>;
};
export type StudentCreateNestedOneWithoutFeesInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutFeesInput, Prisma.StudentUncheckedCreateWithoutFeesInput>;
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutFeesInput;
    connect?: Prisma.StudentWhereUniqueInput;
};
export type StudentUpdateOneRequiredWithoutFeesNestedInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutFeesInput, Prisma.StudentUncheckedCreateWithoutFeesInput>;
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutFeesInput;
    upsert?: Prisma.StudentUpsertWithoutFeesInput;
    connect?: Prisma.StudentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StudentUpdateToOneWithWhereWithoutFeesInput, Prisma.StudentUpdateWithoutFeesInput>, Prisma.StudentUncheckedUpdateWithoutFeesInput>;
};
export type StudentCreateNestedOneWithoutOrdersInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutOrdersInput, Prisma.StudentUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutOrdersInput;
    connect?: Prisma.StudentWhereUniqueInput;
};
export type StudentUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutOrdersInput, Prisma.StudentUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutOrdersInput;
    upsert?: Prisma.StudentUpsertWithoutOrdersInput;
    connect?: Prisma.StudentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StudentUpdateToOneWithWhereWithoutOrdersInput, Prisma.StudentUpdateWithoutOrdersInput>, Prisma.StudentUncheckedUpdateWithoutOrdersInput>;
};
export type StudentCreateWithoutUserInput = {
    studentNumber: string;
    status?: string;
    class?: Prisma.ClassCreateNestedOneWithoutStudentsInput;
    parent?: Prisma.ParentCreateNestedOneWithoutStudentsInput;
    orders?: Prisma.OrderCreateNestedManyWithoutStudentInput;
    attendance?: Prisma.AttendanceCreateNestedManyWithoutStudentInput;
    results?: Prisma.ExamResultCreateNestedManyWithoutStudentInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionCreateNestedManyWithoutStudentInput;
    fees?: Prisma.FeeCreateNestedManyWithoutStudentInput;
    parentAccess?: Prisma.ParentAccessCreateNestedManyWithoutStudentInput;
};
export type StudentUncheckedCreateWithoutUserInput = {
    id?: number;
    studentNumber: string;
    classId?: number | null;
    parentId?: number | null;
    status?: string;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutStudentInput;
    attendance?: Prisma.AttendanceUncheckedCreateNestedManyWithoutStudentInput;
    results?: Prisma.ExamResultUncheckedCreateNestedManyWithoutStudentInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUncheckedCreateNestedManyWithoutStudentInput;
    fees?: Prisma.FeeUncheckedCreateNestedManyWithoutStudentInput;
    parentAccess?: Prisma.ParentAccessUncheckedCreateNestedManyWithoutStudentInput;
};
export type StudentCreateOrConnectWithoutUserInput = {
    where: Prisma.StudentWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudentCreateWithoutUserInput, Prisma.StudentUncheckedCreateWithoutUserInput>;
};
export type StudentUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.StudentUpdateWithoutUserInput, Prisma.StudentUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.StudentCreateWithoutUserInput, Prisma.StudentUncheckedCreateWithoutUserInput>;
    where?: Prisma.StudentWhereInput;
};
export type StudentUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.StudentWhereInput;
    data: Prisma.XOR<Prisma.StudentUpdateWithoutUserInput, Prisma.StudentUncheckedUpdateWithoutUserInput>;
};
export type StudentUpdateWithoutUserInput = {
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    class?: Prisma.ClassUpdateOneWithoutStudentsNestedInput;
    parent?: Prisma.ParentUpdateOneWithoutStudentsNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutStudentNestedInput;
    attendance?: Prisma.AttendanceUpdateManyWithoutStudentNestedInput;
    results?: Prisma.ExamResultUpdateManyWithoutStudentNestedInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUpdateManyWithoutStudentNestedInput;
    fees?: Prisma.FeeUpdateManyWithoutStudentNestedInput;
    parentAccess?: Prisma.ParentAccessUpdateManyWithoutStudentNestedInput;
};
export type StudentUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    parentId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutStudentNestedInput;
    attendance?: Prisma.AttendanceUncheckedUpdateManyWithoutStudentNestedInput;
    results?: Prisma.ExamResultUncheckedUpdateManyWithoutStudentNestedInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUncheckedUpdateManyWithoutStudentNestedInput;
    fees?: Prisma.FeeUncheckedUpdateManyWithoutStudentNestedInput;
    parentAccess?: Prisma.ParentAccessUncheckedUpdateManyWithoutStudentNestedInput;
};
export type StudentCreateWithoutClassInput = {
    studentNumber: string;
    status?: string;
    user: Prisma.UserCreateNestedOneWithoutStudentInput;
    parent?: Prisma.ParentCreateNestedOneWithoutStudentsInput;
    orders?: Prisma.OrderCreateNestedManyWithoutStudentInput;
    attendance?: Prisma.AttendanceCreateNestedManyWithoutStudentInput;
    results?: Prisma.ExamResultCreateNestedManyWithoutStudentInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionCreateNestedManyWithoutStudentInput;
    fees?: Prisma.FeeCreateNestedManyWithoutStudentInput;
    parentAccess?: Prisma.ParentAccessCreateNestedManyWithoutStudentInput;
};
export type StudentUncheckedCreateWithoutClassInput = {
    id?: number;
    userId: number;
    studentNumber: string;
    parentId?: number | null;
    status?: string;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutStudentInput;
    attendance?: Prisma.AttendanceUncheckedCreateNestedManyWithoutStudentInput;
    results?: Prisma.ExamResultUncheckedCreateNestedManyWithoutStudentInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUncheckedCreateNestedManyWithoutStudentInput;
    fees?: Prisma.FeeUncheckedCreateNestedManyWithoutStudentInput;
    parentAccess?: Prisma.ParentAccessUncheckedCreateNestedManyWithoutStudentInput;
};
export type StudentCreateOrConnectWithoutClassInput = {
    where: Prisma.StudentWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudentCreateWithoutClassInput, Prisma.StudentUncheckedCreateWithoutClassInput>;
};
export type StudentCreateManyClassInputEnvelope = {
    data: Prisma.StudentCreateManyClassInput | Prisma.StudentCreateManyClassInput[];
    skipDuplicates?: boolean;
};
export type StudentUpsertWithWhereUniqueWithoutClassInput = {
    where: Prisma.StudentWhereUniqueInput;
    update: Prisma.XOR<Prisma.StudentUpdateWithoutClassInput, Prisma.StudentUncheckedUpdateWithoutClassInput>;
    create: Prisma.XOR<Prisma.StudentCreateWithoutClassInput, Prisma.StudentUncheckedCreateWithoutClassInput>;
};
export type StudentUpdateWithWhereUniqueWithoutClassInput = {
    where: Prisma.StudentWhereUniqueInput;
    data: Prisma.XOR<Prisma.StudentUpdateWithoutClassInput, Prisma.StudentUncheckedUpdateWithoutClassInput>;
};
export type StudentUpdateManyWithWhereWithoutClassInput = {
    where: Prisma.StudentScalarWhereInput;
    data: Prisma.XOR<Prisma.StudentUpdateManyMutationInput, Prisma.StudentUncheckedUpdateManyWithoutClassInput>;
};
export type StudentScalarWhereInput = {
    AND?: Prisma.StudentScalarWhereInput | Prisma.StudentScalarWhereInput[];
    OR?: Prisma.StudentScalarWhereInput[];
    NOT?: Prisma.StudentScalarWhereInput | Prisma.StudentScalarWhereInput[];
    id?: Prisma.IntFilter<"Student"> | number;
    userId?: Prisma.IntFilter<"Student"> | number;
    studentNumber?: Prisma.StringFilter<"Student"> | string;
    classId?: Prisma.IntNullableFilter<"Student"> | number | null;
    parentId?: Prisma.IntNullableFilter<"Student"> | number | null;
    status?: Prisma.StringFilter<"Student"> | string;
};
export type StudentCreateWithoutParentInput = {
    studentNumber: string;
    status?: string;
    user: Prisma.UserCreateNestedOneWithoutStudentInput;
    class?: Prisma.ClassCreateNestedOneWithoutStudentsInput;
    orders?: Prisma.OrderCreateNestedManyWithoutStudentInput;
    attendance?: Prisma.AttendanceCreateNestedManyWithoutStudentInput;
    results?: Prisma.ExamResultCreateNestedManyWithoutStudentInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionCreateNestedManyWithoutStudentInput;
    fees?: Prisma.FeeCreateNestedManyWithoutStudentInput;
    parentAccess?: Prisma.ParentAccessCreateNestedManyWithoutStudentInput;
};
export type StudentUncheckedCreateWithoutParentInput = {
    id?: number;
    userId: number;
    studentNumber: string;
    classId?: number | null;
    status?: string;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutStudentInput;
    attendance?: Prisma.AttendanceUncheckedCreateNestedManyWithoutStudentInput;
    results?: Prisma.ExamResultUncheckedCreateNestedManyWithoutStudentInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUncheckedCreateNestedManyWithoutStudentInput;
    fees?: Prisma.FeeUncheckedCreateNestedManyWithoutStudentInput;
    parentAccess?: Prisma.ParentAccessUncheckedCreateNestedManyWithoutStudentInput;
};
export type StudentCreateOrConnectWithoutParentInput = {
    where: Prisma.StudentWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudentCreateWithoutParentInput, Prisma.StudentUncheckedCreateWithoutParentInput>;
};
export type StudentCreateManyParentInputEnvelope = {
    data: Prisma.StudentCreateManyParentInput | Prisma.StudentCreateManyParentInput[];
    skipDuplicates?: boolean;
};
export type StudentUpsertWithWhereUniqueWithoutParentInput = {
    where: Prisma.StudentWhereUniqueInput;
    update: Prisma.XOR<Prisma.StudentUpdateWithoutParentInput, Prisma.StudentUncheckedUpdateWithoutParentInput>;
    create: Prisma.XOR<Prisma.StudentCreateWithoutParentInput, Prisma.StudentUncheckedCreateWithoutParentInput>;
};
export type StudentUpdateWithWhereUniqueWithoutParentInput = {
    where: Prisma.StudentWhereUniqueInput;
    data: Prisma.XOR<Prisma.StudentUpdateWithoutParentInput, Prisma.StudentUncheckedUpdateWithoutParentInput>;
};
export type StudentUpdateManyWithWhereWithoutParentInput = {
    where: Prisma.StudentScalarWhereInput;
    data: Prisma.XOR<Prisma.StudentUpdateManyMutationInput, Prisma.StudentUncheckedUpdateManyWithoutParentInput>;
};
export type StudentCreateWithoutAttendanceInput = {
    studentNumber: string;
    status?: string;
    user: Prisma.UserCreateNestedOneWithoutStudentInput;
    class?: Prisma.ClassCreateNestedOneWithoutStudentsInput;
    parent?: Prisma.ParentCreateNestedOneWithoutStudentsInput;
    orders?: Prisma.OrderCreateNestedManyWithoutStudentInput;
    results?: Prisma.ExamResultCreateNestedManyWithoutStudentInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionCreateNestedManyWithoutStudentInput;
    fees?: Prisma.FeeCreateNestedManyWithoutStudentInput;
    parentAccess?: Prisma.ParentAccessCreateNestedManyWithoutStudentInput;
};
export type StudentUncheckedCreateWithoutAttendanceInput = {
    id?: number;
    userId: number;
    studentNumber: string;
    classId?: number | null;
    parentId?: number | null;
    status?: string;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutStudentInput;
    results?: Prisma.ExamResultUncheckedCreateNestedManyWithoutStudentInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUncheckedCreateNestedManyWithoutStudentInput;
    fees?: Prisma.FeeUncheckedCreateNestedManyWithoutStudentInput;
    parentAccess?: Prisma.ParentAccessUncheckedCreateNestedManyWithoutStudentInput;
};
export type StudentCreateOrConnectWithoutAttendanceInput = {
    where: Prisma.StudentWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudentCreateWithoutAttendanceInput, Prisma.StudentUncheckedCreateWithoutAttendanceInput>;
};
export type StudentUpsertWithoutAttendanceInput = {
    update: Prisma.XOR<Prisma.StudentUpdateWithoutAttendanceInput, Prisma.StudentUncheckedUpdateWithoutAttendanceInput>;
    create: Prisma.XOR<Prisma.StudentCreateWithoutAttendanceInput, Prisma.StudentUncheckedCreateWithoutAttendanceInput>;
    where?: Prisma.StudentWhereInput;
};
export type StudentUpdateToOneWithWhereWithoutAttendanceInput = {
    where?: Prisma.StudentWhereInput;
    data: Prisma.XOR<Prisma.StudentUpdateWithoutAttendanceInput, Prisma.StudentUncheckedUpdateWithoutAttendanceInput>;
};
export type StudentUpdateWithoutAttendanceInput = {
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    user?: Prisma.UserUpdateOneRequiredWithoutStudentNestedInput;
    class?: Prisma.ClassUpdateOneWithoutStudentsNestedInput;
    parent?: Prisma.ParentUpdateOneWithoutStudentsNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutStudentNestedInput;
    results?: Prisma.ExamResultUpdateManyWithoutStudentNestedInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUpdateManyWithoutStudentNestedInput;
    fees?: Prisma.FeeUpdateManyWithoutStudentNestedInput;
    parentAccess?: Prisma.ParentAccessUpdateManyWithoutStudentNestedInput;
};
export type StudentUncheckedUpdateWithoutAttendanceInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    parentId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutStudentNestedInput;
    results?: Prisma.ExamResultUncheckedUpdateManyWithoutStudentNestedInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUncheckedUpdateManyWithoutStudentNestedInput;
    fees?: Prisma.FeeUncheckedUpdateManyWithoutStudentNestedInput;
    parentAccess?: Prisma.ParentAccessUncheckedUpdateManyWithoutStudentNestedInput;
};
export type StudentCreateWithoutHomeworkSubmissionsInput = {
    studentNumber: string;
    status?: string;
    user: Prisma.UserCreateNestedOneWithoutStudentInput;
    class?: Prisma.ClassCreateNestedOneWithoutStudentsInput;
    parent?: Prisma.ParentCreateNestedOneWithoutStudentsInput;
    orders?: Prisma.OrderCreateNestedManyWithoutStudentInput;
    attendance?: Prisma.AttendanceCreateNestedManyWithoutStudentInput;
    results?: Prisma.ExamResultCreateNestedManyWithoutStudentInput;
    fees?: Prisma.FeeCreateNestedManyWithoutStudentInput;
    parentAccess?: Prisma.ParentAccessCreateNestedManyWithoutStudentInput;
};
export type StudentUncheckedCreateWithoutHomeworkSubmissionsInput = {
    id?: number;
    userId: number;
    studentNumber: string;
    classId?: number | null;
    parentId?: number | null;
    status?: string;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutStudentInput;
    attendance?: Prisma.AttendanceUncheckedCreateNestedManyWithoutStudentInput;
    results?: Prisma.ExamResultUncheckedCreateNestedManyWithoutStudentInput;
    fees?: Prisma.FeeUncheckedCreateNestedManyWithoutStudentInput;
    parentAccess?: Prisma.ParentAccessUncheckedCreateNestedManyWithoutStudentInput;
};
export type StudentCreateOrConnectWithoutHomeworkSubmissionsInput = {
    where: Prisma.StudentWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudentCreateWithoutHomeworkSubmissionsInput, Prisma.StudentUncheckedCreateWithoutHomeworkSubmissionsInput>;
};
export type StudentUpsertWithoutHomeworkSubmissionsInput = {
    update: Prisma.XOR<Prisma.StudentUpdateWithoutHomeworkSubmissionsInput, Prisma.StudentUncheckedUpdateWithoutHomeworkSubmissionsInput>;
    create: Prisma.XOR<Prisma.StudentCreateWithoutHomeworkSubmissionsInput, Prisma.StudentUncheckedCreateWithoutHomeworkSubmissionsInput>;
    where?: Prisma.StudentWhereInput;
};
export type StudentUpdateToOneWithWhereWithoutHomeworkSubmissionsInput = {
    where?: Prisma.StudentWhereInput;
    data: Prisma.XOR<Prisma.StudentUpdateWithoutHomeworkSubmissionsInput, Prisma.StudentUncheckedUpdateWithoutHomeworkSubmissionsInput>;
};
export type StudentUpdateWithoutHomeworkSubmissionsInput = {
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    user?: Prisma.UserUpdateOneRequiredWithoutStudentNestedInput;
    class?: Prisma.ClassUpdateOneWithoutStudentsNestedInput;
    parent?: Prisma.ParentUpdateOneWithoutStudentsNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutStudentNestedInput;
    attendance?: Prisma.AttendanceUpdateManyWithoutStudentNestedInput;
    results?: Prisma.ExamResultUpdateManyWithoutStudentNestedInput;
    fees?: Prisma.FeeUpdateManyWithoutStudentNestedInput;
    parentAccess?: Prisma.ParentAccessUpdateManyWithoutStudentNestedInput;
};
export type StudentUncheckedUpdateWithoutHomeworkSubmissionsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    parentId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutStudentNestedInput;
    attendance?: Prisma.AttendanceUncheckedUpdateManyWithoutStudentNestedInput;
    results?: Prisma.ExamResultUncheckedUpdateManyWithoutStudentNestedInput;
    fees?: Prisma.FeeUncheckedUpdateManyWithoutStudentNestedInput;
    parentAccess?: Prisma.ParentAccessUncheckedUpdateManyWithoutStudentNestedInput;
};
export type StudentCreateWithoutParentAccessInput = {
    studentNumber: string;
    status?: string;
    user: Prisma.UserCreateNestedOneWithoutStudentInput;
    class?: Prisma.ClassCreateNestedOneWithoutStudentsInput;
    parent?: Prisma.ParentCreateNestedOneWithoutStudentsInput;
    orders?: Prisma.OrderCreateNestedManyWithoutStudentInput;
    attendance?: Prisma.AttendanceCreateNestedManyWithoutStudentInput;
    results?: Prisma.ExamResultCreateNestedManyWithoutStudentInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionCreateNestedManyWithoutStudentInput;
    fees?: Prisma.FeeCreateNestedManyWithoutStudentInput;
};
export type StudentUncheckedCreateWithoutParentAccessInput = {
    id?: number;
    userId: number;
    studentNumber: string;
    classId?: number | null;
    parentId?: number | null;
    status?: string;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutStudentInput;
    attendance?: Prisma.AttendanceUncheckedCreateNestedManyWithoutStudentInput;
    results?: Prisma.ExamResultUncheckedCreateNestedManyWithoutStudentInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUncheckedCreateNestedManyWithoutStudentInput;
    fees?: Prisma.FeeUncheckedCreateNestedManyWithoutStudentInput;
};
export type StudentCreateOrConnectWithoutParentAccessInput = {
    where: Prisma.StudentWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudentCreateWithoutParentAccessInput, Prisma.StudentUncheckedCreateWithoutParentAccessInput>;
};
export type StudentUpsertWithoutParentAccessInput = {
    update: Prisma.XOR<Prisma.StudentUpdateWithoutParentAccessInput, Prisma.StudentUncheckedUpdateWithoutParentAccessInput>;
    create: Prisma.XOR<Prisma.StudentCreateWithoutParentAccessInput, Prisma.StudentUncheckedCreateWithoutParentAccessInput>;
    where?: Prisma.StudentWhereInput;
};
export type StudentUpdateToOneWithWhereWithoutParentAccessInput = {
    where?: Prisma.StudentWhereInput;
    data: Prisma.XOR<Prisma.StudentUpdateWithoutParentAccessInput, Prisma.StudentUncheckedUpdateWithoutParentAccessInput>;
};
export type StudentUpdateWithoutParentAccessInput = {
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    user?: Prisma.UserUpdateOneRequiredWithoutStudentNestedInput;
    class?: Prisma.ClassUpdateOneWithoutStudentsNestedInput;
    parent?: Prisma.ParentUpdateOneWithoutStudentsNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutStudentNestedInput;
    attendance?: Prisma.AttendanceUpdateManyWithoutStudentNestedInput;
    results?: Prisma.ExamResultUpdateManyWithoutStudentNestedInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUpdateManyWithoutStudentNestedInput;
    fees?: Prisma.FeeUpdateManyWithoutStudentNestedInput;
};
export type StudentUncheckedUpdateWithoutParentAccessInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    parentId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutStudentNestedInput;
    attendance?: Prisma.AttendanceUncheckedUpdateManyWithoutStudentNestedInput;
    results?: Prisma.ExamResultUncheckedUpdateManyWithoutStudentNestedInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUncheckedUpdateManyWithoutStudentNestedInput;
    fees?: Prisma.FeeUncheckedUpdateManyWithoutStudentNestedInput;
};
export type StudentCreateWithoutResultsInput = {
    studentNumber: string;
    status?: string;
    user: Prisma.UserCreateNestedOneWithoutStudentInput;
    class?: Prisma.ClassCreateNestedOneWithoutStudentsInput;
    parent?: Prisma.ParentCreateNestedOneWithoutStudentsInput;
    orders?: Prisma.OrderCreateNestedManyWithoutStudentInput;
    attendance?: Prisma.AttendanceCreateNestedManyWithoutStudentInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionCreateNestedManyWithoutStudentInput;
    fees?: Prisma.FeeCreateNestedManyWithoutStudentInput;
    parentAccess?: Prisma.ParentAccessCreateNestedManyWithoutStudentInput;
};
export type StudentUncheckedCreateWithoutResultsInput = {
    id?: number;
    userId: number;
    studentNumber: string;
    classId?: number | null;
    parentId?: number | null;
    status?: string;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutStudentInput;
    attendance?: Prisma.AttendanceUncheckedCreateNestedManyWithoutStudentInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUncheckedCreateNestedManyWithoutStudentInput;
    fees?: Prisma.FeeUncheckedCreateNestedManyWithoutStudentInput;
    parentAccess?: Prisma.ParentAccessUncheckedCreateNestedManyWithoutStudentInput;
};
export type StudentCreateOrConnectWithoutResultsInput = {
    where: Prisma.StudentWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudentCreateWithoutResultsInput, Prisma.StudentUncheckedCreateWithoutResultsInput>;
};
export type StudentUpsertWithoutResultsInput = {
    update: Prisma.XOR<Prisma.StudentUpdateWithoutResultsInput, Prisma.StudentUncheckedUpdateWithoutResultsInput>;
    create: Prisma.XOR<Prisma.StudentCreateWithoutResultsInput, Prisma.StudentUncheckedCreateWithoutResultsInput>;
    where?: Prisma.StudentWhereInput;
};
export type StudentUpdateToOneWithWhereWithoutResultsInput = {
    where?: Prisma.StudentWhereInput;
    data: Prisma.XOR<Prisma.StudentUpdateWithoutResultsInput, Prisma.StudentUncheckedUpdateWithoutResultsInput>;
};
export type StudentUpdateWithoutResultsInput = {
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    user?: Prisma.UserUpdateOneRequiredWithoutStudentNestedInput;
    class?: Prisma.ClassUpdateOneWithoutStudentsNestedInput;
    parent?: Prisma.ParentUpdateOneWithoutStudentsNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutStudentNestedInput;
    attendance?: Prisma.AttendanceUpdateManyWithoutStudentNestedInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUpdateManyWithoutStudentNestedInput;
    fees?: Prisma.FeeUpdateManyWithoutStudentNestedInput;
    parentAccess?: Prisma.ParentAccessUpdateManyWithoutStudentNestedInput;
};
export type StudentUncheckedUpdateWithoutResultsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    parentId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutStudentNestedInput;
    attendance?: Prisma.AttendanceUncheckedUpdateManyWithoutStudentNestedInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUncheckedUpdateManyWithoutStudentNestedInput;
    fees?: Prisma.FeeUncheckedUpdateManyWithoutStudentNestedInput;
    parentAccess?: Prisma.ParentAccessUncheckedUpdateManyWithoutStudentNestedInput;
};
export type StudentCreateWithoutFeesInput = {
    studentNumber: string;
    status?: string;
    user: Prisma.UserCreateNestedOneWithoutStudentInput;
    class?: Prisma.ClassCreateNestedOneWithoutStudentsInput;
    parent?: Prisma.ParentCreateNestedOneWithoutStudentsInput;
    orders?: Prisma.OrderCreateNestedManyWithoutStudentInput;
    attendance?: Prisma.AttendanceCreateNestedManyWithoutStudentInput;
    results?: Prisma.ExamResultCreateNestedManyWithoutStudentInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionCreateNestedManyWithoutStudentInput;
    parentAccess?: Prisma.ParentAccessCreateNestedManyWithoutStudentInput;
};
export type StudentUncheckedCreateWithoutFeesInput = {
    id?: number;
    userId: number;
    studentNumber: string;
    classId?: number | null;
    parentId?: number | null;
    status?: string;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutStudentInput;
    attendance?: Prisma.AttendanceUncheckedCreateNestedManyWithoutStudentInput;
    results?: Prisma.ExamResultUncheckedCreateNestedManyWithoutStudentInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUncheckedCreateNestedManyWithoutStudentInput;
    parentAccess?: Prisma.ParentAccessUncheckedCreateNestedManyWithoutStudentInput;
};
export type StudentCreateOrConnectWithoutFeesInput = {
    where: Prisma.StudentWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudentCreateWithoutFeesInput, Prisma.StudentUncheckedCreateWithoutFeesInput>;
};
export type StudentUpsertWithoutFeesInput = {
    update: Prisma.XOR<Prisma.StudentUpdateWithoutFeesInput, Prisma.StudentUncheckedUpdateWithoutFeesInput>;
    create: Prisma.XOR<Prisma.StudentCreateWithoutFeesInput, Prisma.StudentUncheckedCreateWithoutFeesInput>;
    where?: Prisma.StudentWhereInput;
};
export type StudentUpdateToOneWithWhereWithoutFeesInput = {
    where?: Prisma.StudentWhereInput;
    data: Prisma.XOR<Prisma.StudentUpdateWithoutFeesInput, Prisma.StudentUncheckedUpdateWithoutFeesInput>;
};
export type StudentUpdateWithoutFeesInput = {
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    user?: Prisma.UserUpdateOneRequiredWithoutStudentNestedInput;
    class?: Prisma.ClassUpdateOneWithoutStudentsNestedInput;
    parent?: Prisma.ParentUpdateOneWithoutStudentsNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutStudentNestedInput;
    attendance?: Prisma.AttendanceUpdateManyWithoutStudentNestedInput;
    results?: Prisma.ExamResultUpdateManyWithoutStudentNestedInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUpdateManyWithoutStudentNestedInput;
    parentAccess?: Prisma.ParentAccessUpdateManyWithoutStudentNestedInput;
};
export type StudentUncheckedUpdateWithoutFeesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    parentId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutStudentNestedInput;
    attendance?: Prisma.AttendanceUncheckedUpdateManyWithoutStudentNestedInput;
    results?: Prisma.ExamResultUncheckedUpdateManyWithoutStudentNestedInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUncheckedUpdateManyWithoutStudentNestedInput;
    parentAccess?: Prisma.ParentAccessUncheckedUpdateManyWithoutStudentNestedInput;
};
export type StudentCreateWithoutOrdersInput = {
    studentNumber: string;
    status?: string;
    user: Prisma.UserCreateNestedOneWithoutStudentInput;
    class?: Prisma.ClassCreateNestedOneWithoutStudentsInput;
    parent?: Prisma.ParentCreateNestedOneWithoutStudentsInput;
    attendance?: Prisma.AttendanceCreateNestedManyWithoutStudentInput;
    results?: Prisma.ExamResultCreateNestedManyWithoutStudentInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionCreateNestedManyWithoutStudentInput;
    fees?: Prisma.FeeCreateNestedManyWithoutStudentInput;
    parentAccess?: Prisma.ParentAccessCreateNestedManyWithoutStudentInput;
};
export type StudentUncheckedCreateWithoutOrdersInput = {
    id?: number;
    userId: number;
    studentNumber: string;
    classId?: number | null;
    parentId?: number | null;
    status?: string;
    attendance?: Prisma.AttendanceUncheckedCreateNestedManyWithoutStudentInput;
    results?: Prisma.ExamResultUncheckedCreateNestedManyWithoutStudentInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUncheckedCreateNestedManyWithoutStudentInput;
    fees?: Prisma.FeeUncheckedCreateNestedManyWithoutStudentInput;
    parentAccess?: Prisma.ParentAccessUncheckedCreateNestedManyWithoutStudentInput;
};
export type StudentCreateOrConnectWithoutOrdersInput = {
    where: Prisma.StudentWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudentCreateWithoutOrdersInput, Prisma.StudentUncheckedCreateWithoutOrdersInput>;
};
export type StudentUpsertWithoutOrdersInput = {
    update: Prisma.XOR<Prisma.StudentUpdateWithoutOrdersInput, Prisma.StudentUncheckedUpdateWithoutOrdersInput>;
    create: Prisma.XOR<Prisma.StudentCreateWithoutOrdersInput, Prisma.StudentUncheckedCreateWithoutOrdersInput>;
    where?: Prisma.StudentWhereInput;
};
export type StudentUpdateToOneWithWhereWithoutOrdersInput = {
    where?: Prisma.StudentWhereInput;
    data: Prisma.XOR<Prisma.StudentUpdateWithoutOrdersInput, Prisma.StudentUncheckedUpdateWithoutOrdersInput>;
};
export type StudentUpdateWithoutOrdersInput = {
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    user?: Prisma.UserUpdateOneRequiredWithoutStudentNestedInput;
    class?: Prisma.ClassUpdateOneWithoutStudentsNestedInput;
    parent?: Prisma.ParentUpdateOneWithoutStudentsNestedInput;
    attendance?: Prisma.AttendanceUpdateManyWithoutStudentNestedInput;
    results?: Prisma.ExamResultUpdateManyWithoutStudentNestedInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUpdateManyWithoutStudentNestedInput;
    fees?: Prisma.FeeUpdateManyWithoutStudentNestedInput;
    parentAccess?: Prisma.ParentAccessUpdateManyWithoutStudentNestedInput;
};
export type StudentUncheckedUpdateWithoutOrdersInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    parentId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    attendance?: Prisma.AttendanceUncheckedUpdateManyWithoutStudentNestedInput;
    results?: Prisma.ExamResultUncheckedUpdateManyWithoutStudentNestedInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUncheckedUpdateManyWithoutStudentNestedInput;
    fees?: Prisma.FeeUncheckedUpdateManyWithoutStudentNestedInput;
    parentAccess?: Prisma.ParentAccessUncheckedUpdateManyWithoutStudentNestedInput;
};
export type StudentCreateManyClassInput = {
    id?: number;
    userId: number;
    studentNumber: string;
    parentId?: number | null;
    status?: string;
};
export type StudentUpdateWithoutClassInput = {
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    user?: Prisma.UserUpdateOneRequiredWithoutStudentNestedInput;
    parent?: Prisma.ParentUpdateOneWithoutStudentsNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutStudentNestedInput;
    attendance?: Prisma.AttendanceUpdateManyWithoutStudentNestedInput;
    results?: Prisma.ExamResultUpdateManyWithoutStudentNestedInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUpdateManyWithoutStudentNestedInput;
    fees?: Prisma.FeeUpdateManyWithoutStudentNestedInput;
    parentAccess?: Prisma.ParentAccessUpdateManyWithoutStudentNestedInput;
};
export type StudentUncheckedUpdateWithoutClassInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutStudentNestedInput;
    attendance?: Prisma.AttendanceUncheckedUpdateManyWithoutStudentNestedInput;
    results?: Prisma.ExamResultUncheckedUpdateManyWithoutStudentNestedInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUncheckedUpdateManyWithoutStudentNestedInput;
    fees?: Prisma.FeeUncheckedUpdateManyWithoutStudentNestedInput;
    parentAccess?: Prisma.ParentAccessUncheckedUpdateManyWithoutStudentNestedInput;
};
export type StudentUncheckedUpdateManyWithoutClassInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type StudentCreateManyParentInput = {
    id?: number;
    userId: number;
    studentNumber: string;
    classId?: number | null;
    status?: string;
};
export type StudentUpdateWithoutParentInput = {
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    user?: Prisma.UserUpdateOneRequiredWithoutStudentNestedInput;
    class?: Prisma.ClassUpdateOneWithoutStudentsNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutStudentNestedInput;
    attendance?: Prisma.AttendanceUpdateManyWithoutStudentNestedInput;
    results?: Prisma.ExamResultUpdateManyWithoutStudentNestedInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUpdateManyWithoutStudentNestedInput;
    fees?: Prisma.FeeUpdateManyWithoutStudentNestedInput;
    parentAccess?: Prisma.ParentAccessUpdateManyWithoutStudentNestedInput;
};
export type StudentUncheckedUpdateWithoutParentInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutStudentNestedInput;
    attendance?: Prisma.AttendanceUncheckedUpdateManyWithoutStudentNestedInput;
    results?: Prisma.ExamResultUncheckedUpdateManyWithoutStudentNestedInput;
    homeworkSubmissions?: Prisma.HomeworkSubmissionUncheckedUpdateManyWithoutStudentNestedInput;
    fees?: Prisma.FeeUncheckedUpdateManyWithoutStudentNestedInput;
    parentAccess?: Prisma.ParentAccessUncheckedUpdateManyWithoutStudentNestedInput;
};
export type StudentUncheckedUpdateManyWithoutParentInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    studentNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
};
/**
 * Count Type StudentCountOutputType
 */
export type StudentCountOutputType = {
    orders: number;
    attendance: number;
    results: number;
    homeworkSubmissions: number;
    fees: number;
    parentAccess: number;
};
export type StudentCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    orders?: boolean | StudentCountOutputTypeCountOrdersArgs;
    attendance?: boolean | StudentCountOutputTypeCountAttendanceArgs;
    results?: boolean | StudentCountOutputTypeCountResultsArgs;
    homeworkSubmissions?: boolean | StudentCountOutputTypeCountHomeworkSubmissionsArgs;
    fees?: boolean | StudentCountOutputTypeCountFeesArgs;
    parentAccess?: boolean | StudentCountOutputTypeCountParentAccessArgs;
};
/**
 * StudentCountOutputType without action
 */
export type StudentCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: Prisma.StudentCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * StudentCountOutputType without action
 */
export type StudentCountOutputTypeCountOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderWhereInput;
};
/**
 * StudentCountOutputType without action
 */
export type StudentCountOutputTypeCountAttendanceArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttendanceWhereInput;
};
/**
 * StudentCountOutputType without action
 */
export type StudentCountOutputTypeCountResultsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExamResultWhereInput;
};
/**
 * StudentCountOutputType without action
 */
export type StudentCountOutputTypeCountHomeworkSubmissionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HomeworkSubmissionWhereInput;
};
/**
 * StudentCountOutputType without action
 */
export type StudentCountOutputTypeCountFeesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FeeWhereInput;
};
/**
 * StudentCountOutputType without action
 */
export type StudentCountOutputTypeCountParentAccessArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ParentAccessWhereInput;
};
export type StudentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    studentNumber?: boolean;
    classId?: boolean;
    parentId?: boolean;
    status?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    class?: boolean | Prisma.Student$classArgs<ExtArgs>;
    parent?: boolean | Prisma.Student$parentArgs<ExtArgs>;
    orders?: boolean | Prisma.Student$ordersArgs<ExtArgs>;
    attendance?: boolean | Prisma.Student$attendanceArgs<ExtArgs>;
    results?: boolean | Prisma.Student$resultsArgs<ExtArgs>;
    homeworkSubmissions?: boolean | Prisma.Student$homeworkSubmissionsArgs<ExtArgs>;
    fees?: boolean | Prisma.Student$feesArgs<ExtArgs>;
    parentAccess?: boolean | Prisma.Student$parentAccessArgs<ExtArgs>;
    _count?: boolean | Prisma.StudentCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["student"]>;
export type StudentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    studentNumber?: boolean;
    classId?: boolean;
    parentId?: boolean;
    status?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    class?: boolean | Prisma.Student$classArgs<ExtArgs>;
    parent?: boolean | Prisma.Student$parentArgs<ExtArgs>;
}, ExtArgs["result"]["student"]>;
export type StudentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    studentNumber?: boolean;
    classId?: boolean;
    parentId?: boolean;
    status?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    class?: boolean | Prisma.Student$classArgs<ExtArgs>;
    parent?: boolean | Prisma.Student$parentArgs<ExtArgs>;
}, ExtArgs["result"]["student"]>;
export type StudentSelectScalar = {
    id?: boolean;
    userId?: boolean;
    studentNumber?: boolean;
    classId?: boolean;
    parentId?: boolean;
    status?: boolean;
};
export type StudentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "studentNumber" | "classId" | "parentId" | "status", ExtArgs["result"]["student"]>;
export type StudentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    class?: boolean | Prisma.Student$classArgs<ExtArgs>;
    parent?: boolean | Prisma.Student$parentArgs<ExtArgs>;
    orders?: boolean | Prisma.Student$ordersArgs<ExtArgs>;
    attendance?: boolean | Prisma.Student$attendanceArgs<ExtArgs>;
    results?: boolean | Prisma.Student$resultsArgs<ExtArgs>;
    homeworkSubmissions?: boolean | Prisma.Student$homeworkSubmissionsArgs<ExtArgs>;
    fees?: boolean | Prisma.Student$feesArgs<ExtArgs>;
    parentAccess?: boolean | Prisma.Student$parentAccessArgs<ExtArgs>;
    _count?: boolean | Prisma.StudentCountOutputTypeDefaultArgs<ExtArgs>;
};
export type StudentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    class?: boolean | Prisma.Student$classArgs<ExtArgs>;
    parent?: boolean | Prisma.Student$parentArgs<ExtArgs>;
};
export type StudentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    class?: boolean | Prisma.Student$classArgs<ExtArgs>;
    parent?: boolean | Prisma.Student$parentArgs<ExtArgs>;
};
export type $StudentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Student";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        class: Prisma.$ClassPayload<ExtArgs> | null;
        parent: Prisma.$ParentPayload<ExtArgs> | null;
        orders: Prisma.$OrderPayload<ExtArgs>[];
        attendance: Prisma.$AttendancePayload<ExtArgs>[];
        results: Prisma.$ExamResultPayload<ExtArgs>[];
        homeworkSubmissions: Prisma.$HomeworkSubmissionPayload<ExtArgs>[];
        fees: Prisma.$FeePayload<ExtArgs>[];
        parentAccess: Prisma.$ParentAccessPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        userId: number;
        studentNumber: string;
        classId: number | null;
        parentId: number | null;
        status: string;
    }, ExtArgs["result"]["student"]>;
    composites: {};
};
export type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StudentPayload, S>;
export type StudentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StudentCountAggregateInputType | true;
};
export interface StudentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Student'];
        meta: {
            name: 'Student';
        };
    };
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: Prisma.SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: Prisma.SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     *
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const studentWithIdOnly = await prisma.student.findMany({ select: { id: true } })
     *
     */
    findMany<T extends StudentFindManyArgs>(args?: Prisma.SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     *
     */
    create<T extends StudentCreateArgs>(args: Prisma.SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends StudentCreateManyArgs>(args?: Prisma.SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Students and returns the data saved in the database.
     * @param {StudentCreateManyAndReturnArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends StudentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     *
     */
    delete<T extends StudentDeleteArgs>(args: Prisma.SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends StudentUpdateArgs>(args: Prisma.SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: Prisma.SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends StudentUpdateManyArgs>(args: Prisma.SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Students and returns the data updated in the database.
     * @param {StudentUpdateManyAndReturnArgs} args - Arguments to update many Students.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends StudentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StudentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: Prisma.SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(args?: Prisma.Subset<T, StudentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StudentCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAggregateArgs>(args: Prisma.Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>;
    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends StudentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StudentGroupByArgs['orderBy'];
    } : {
        orderBy?: StudentGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Student model
     */
    readonly fields: StudentFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Student.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__StudentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    class<T extends Prisma.Student$classArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Student$classArgs<ExtArgs>>): Prisma.Prisma__ClassClient<runtime.Types.Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    parent<T extends Prisma.Student$parentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Student$parentArgs<ExtArgs>>): Prisma.Prisma__ParentClient<runtime.Types.Result.GetResult<Prisma.$ParentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    orders<T extends Prisma.Student$ordersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Student$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    attendance<T extends Prisma.Student$attendanceArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Student$attendanceArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    results<T extends Prisma.Student$resultsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Student$resultsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExamResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    homeworkSubmissions<T extends Prisma.Student$homeworkSubmissionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Student$homeworkSubmissionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HomeworkSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    fees<T extends Prisma.Student$feesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Student$feesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    parentAccess<T extends Prisma.Student$parentAccessArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Student$parentAccessArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParentAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Student model
 */
export interface StudentFieldRefs {
    readonly id: Prisma.FieldRef<"Student", 'Int'>;
    readonly userId: Prisma.FieldRef<"Student", 'Int'>;
    readonly studentNumber: Prisma.FieldRef<"Student", 'String'>;
    readonly classId: Prisma.FieldRef<"Student", 'Int'>;
    readonly parentId: Prisma.FieldRef<"Student", 'Int'>;
    readonly status: Prisma.FieldRef<"Student", 'String'>;
}
/**
 * Student findUnique
 */
export type StudentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: Prisma.StudentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Student
     */
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudentInclude<ExtArgs> | null;
    /**
     * Filter, which Student to fetch.
     */
    where: Prisma.StudentWhereUniqueInput;
};
/**
 * Student findUniqueOrThrow
 */
export type StudentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: Prisma.StudentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Student
     */
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudentInclude<ExtArgs> | null;
    /**
     * Filter, which Student to fetch.
     */
    where: Prisma.StudentWhereUniqueInput;
};
/**
 * Student findFirst
 */
export type StudentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: Prisma.StudentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Student
     */
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudentInclude<ExtArgs> | null;
    /**
     * Filter, which Student to fetch.
     */
    where?: Prisma.StudentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Students to fetch.
     */
    orderBy?: Prisma.StudentOrderByWithRelationInput | Prisma.StudentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Students.
     */
    cursor?: Prisma.StudentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Students from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Students.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Students.
     */
    distinct?: Prisma.StudentScalarFieldEnum | Prisma.StudentScalarFieldEnum[];
};
/**
 * Student findFirstOrThrow
 */
export type StudentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: Prisma.StudentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Student
     */
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudentInclude<ExtArgs> | null;
    /**
     * Filter, which Student to fetch.
     */
    where?: Prisma.StudentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Students to fetch.
     */
    orderBy?: Prisma.StudentOrderByWithRelationInput | Prisma.StudentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Students.
     */
    cursor?: Prisma.StudentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Students from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Students.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Students.
     */
    distinct?: Prisma.StudentScalarFieldEnum | Prisma.StudentScalarFieldEnum[];
};
/**
 * Student findMany
 */
export type StudentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: Prisma.StudentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Student
     */
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudentInclude<ExtArgs> | null;
    /**
     * Filter, which Students to fetch.
     */
    where?: Prisma.StudentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Students to fetch.
     */
    orderBy?: Prisma.StudentOrderByWithRelationInput | Prisma.StudentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Students.
     */
    cursor?: Prisma.StudentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Students from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Students.
     */
    skip?: number;
    distinct?: Prisma.StudentScalarFieldEnum | Prisma.StudentScalarFieldEnum[];
};
/**
 * Student create
 */
export type StudentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: Prisma.StudentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Student
     */
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudentInclude<ExtArgs> | null;
    /**
     * The data needed to create a Student.
     */
    data: Prisma.XOR<Prisma.StudentCreateInput, Prisma.StudentUncheckedCreateInput>;
};
/**
 * Student createMany
 */
export type StudentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: Prisma.StudentCreateManyInput | Prisma.StudentCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Student createManyAndReturn
 */
export type StudentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: Prisma.StudentSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Student
     */
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    /**
     * The data used to create many Students.
     */
    data: Prisma.StudentCreateManyInput | Prisma.StudentCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudentIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Student update
 */
export type StudentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: Prisma.StudentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Student
     */
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudentInclude<ExtArgs> | null;
    /**
     * The data needed to update a Student.
     */
    data: Prisma.XOR<Prisma.StudentUpdateInput, Prisma.StudentUncheckedUpdateInput>;
    /**
     * Choose, which Student to update.
     */
    where: Prisma.StudentWhereUniqueInput;
};
/**
 * Student updateMany
 */
export type StudentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: Prisma.XOR<Prisma.StudentUpdateManyMutationInput, Prisma.StudentUncheckedUpdateManyInput>;
    /**
     * Filter which Students to update
     */
    where?: Prisma.StudentWhereInput;
    /**
     * Limit how many Students to update.
     */
    limit?: number;
};
/**
 * Student updateManyAndReturn
 */
export type StudentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: Prisma.StudentSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Student
     */
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    /**
     * The data used to update Students.
     */
    data: Prisma.XOR<Prisma.StudentUpdateManyMutationInput, Prisma.StudentUncheckedUpdateManyInput>;
    /**
     * Filter which Students to update
     */
    where?: Prisma.StudentWhereInput;
    /**
     * Limit how many Students to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Student upsert
 */
export type StudentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: Prisma.StudentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Student
     */
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudentInclude<ExtArgs> | null;
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: Prisma.StudentWhereUniqueInput;
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: Prisma.XOR<Prisma.StudentCreateInput, Prisma.StudentUncheckedCreateInput>;
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.StudentUpdateInput, Prisma.StudentUncheckedUpdateInput>;
};
/**
 * Student delete
 */
export type StudentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: Prisma.StudentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Student
     */
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudentInclude<ExtArgs> | null;
    /**
     * Filter which Student to delete.
     */
    where: Prisma.StudentWhereUniqueInput;
};
/**
 * Student deleteMany
 */
export type StudentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: Prisma.StudentWhereInput;
    /**
     * Limit how many Students to delete.
     */
    limit?: number;
};
/**
 * Student.class
 */
export type Student$classArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: Prisma.ClassSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Class
     */
    omit?: Prisma.ClassOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ClassInclude<ExtArgs> | null;
    where?: Prisma.ClassWhereInput;
};
/**
 * Student.parent
 */
export type Student$parentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parent
     */
    select?: Prisma.ParentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Parent
     */
    omit?: Prisma.ParentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParentInclude<ExtArgs> | null;
    where?: Prisma.ParentWhereInput;
};
/**
 * Student.orders
 */
export type Student$ordersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: Prisma.OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: Prisma.OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderInclude<ExtArgs> | null;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput | Prisma.OrderOrderByWithRelationInput[];
    cursor?: Prisma.OrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderScalarFieldEnum | Prisma.OrderScalarFieldEnum[];
};
/**
 * Student.attendance
 */
export type Student$attendanceArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: Prisma.AttendanceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Attendance
     */
    omit?: Prisma.AttendanceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AttendanceInclude<ExtArgs> | null;
    where?: Prisma.AttendanceWhereInput;
    orderBy?: Prisma.AttendanceOrderByWithRelationInput | Prisma.AttendanceOrderByWithRelationInput[];
    cursor?: Prisma.AttendanceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AttendanceScalarFieldEnum | Prisma.AttendanceScalarFieldEnum[];
};
/**
 * Student.results
 */
export type Student$resultsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamResult
     */
    select?: Prisma.ExamResultSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ExamResult
     */
    omit?: Prisma.ExamResultOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ExamResultInclude<ExtArgs> | null;
    where?: Prisma.ExamResultWhereInput;
    orderBy?: Prisma.ExamResultOrderByWithRelationInput | Prisma.ExamResultOrderByWithRelationInput[];
    cursor?: Prisma.ExamResultWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExamResultScalarFieldEnum | Prisma.ExamResultScalarFieldEnum[];
};
/**
 * Student.homeworkSubmissions
 */
export type Student$homeworkSubmissionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeworkSubmission
     */
    select?: Prisma.HomeworkSubmissionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the HomeworkSubmission
     */
    omit?: Prisma.HomeworkSubmissionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HomeworkSubmissionInclude<ExtArgs> | null;
    where?: Prisma.HomeworkSubmissionWhereInput;
    orderBy?: Prisma.HomeworkSubmissionOrderByWithRelationInput | Prisma.HomeworkSubmissionOrderByWithRelationInput[];
    cursor?: Prisma.HomeworkSubmissionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HomeworkSubmissionScalarFieldEnum | Prisma.HomeworkSubmissionScalarFieldEnum[];
};
/**
 * Student.fees
 */
export type Student$feesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fee
     */
    select?: Prisma.FeeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Fee
     */
    omit?: Prisma.FeeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FeeInclude<ExtArgs> | null;
    where?: Prisma.FeeWhereInput;
    orderBy?: Prisma.FeeOrderByWithRelationInput | Prisma.FeeOrderByWithRelationInput[];
    cursor?: Prisma.FeeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FeeScalarFieldEnum | Prisma.FeeScalarFieldEnum[];
};
/**
 * Student.parentAccess
 */
export type Student$parentAccessArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentAccess
     */
    select?: Prisma.ParentAccessSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ParentAccess
     */
    omit?: Prisma.ParentAccessOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParentAccessInclude<ExtArgs> | null;
    where?: Prisma.ParentAccessWhereInput;
    orderBy?: Prisma.ParentAccessOrderByWithRelationInput | Prisma.ParentAccessOrderByWithRelationInput[];
    cursor?: Prisma.ParentAccessWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ParentAccessScalarFieldEnum | Prisma.ParentAccessScalarFieldEnum[];
};
/**
 * Student without action
 */
export type StudentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: Prisma.StudentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Student
     */
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StudentInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Student.d.ts.map