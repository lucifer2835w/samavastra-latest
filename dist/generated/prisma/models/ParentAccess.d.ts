import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model ParentAccess
 *
 */
export type ParentAccessModel = runtime.Types.Result.DefaultSelection<Prisma.$ParentAccessPayload>;
export type AggregateParentAccess = {
    _count: ParentAccessCountAggregateOutputType | null;
    _avg: ParentAccessAvgAggregateOutputType | null;
    _sum: ParentAccessSumAggregateOutputType | null;
    _min: ParentAccessMinAggregateOutputType | null;
    _max: ParentAccessMaxAggregateOutputType | null;
};
export type ParentAccessAvgAggregateOutputType = {
    id: number | null;
    parentId: number | null;
    studentId: number | null;
};
export type ParentAccessSumAggregateOutputType = {
    id: number | null;
    parentId: number | null;
    studentId: number | null;
};
export type ParentAccessMinAggregateOutputType = {
    id: number | null;
    parentId: number | null;
    studentId: number | null;
    canViewGrades: boolean | null;
    canViewAttendance: boolean | null;
    canViewFees: boolean | null;
    canViewHomework: boolean | null;
};
export type ParentAccessMaxAggregateOutputType = {
    id: number | null;
    parentId: number | null;
    studentId: number | null;
    canViewGrades: boolean | null;
    canViewAttendance: boolean | null;
    canViewFees: boolean | null;
    canViewHomework: boolean | null;
};
export type ParentAccessCountAggregateOutputType = {
    id: number;
    parentId: number;
    studentId: number;
    canViewGrades: number;
    canViewAttendance: number;
    canViewFees: number;
    canViewHomework: number;
    _all: number;
};
export type ParentAccessAvgAggregateInputType = {
    id?: true;
    parentId?: true;
    studentId?: true;
};
export type ParentAccessSumAggregateInputType = {
    id?: true;
    parentId?: true;
    studentId?: true;
};
export type ParentAccessMinAggregateInputType = {
    id?: true;
    parentId?: true;
    studentId?: true;
    canViewGrades?: true;
    canViewAttendance?: true;
    canViewFees?: true;
    canViewHomework?: true;
};
export type ParentAccessMaxAggregateInputType = {
    id?: true;
    parentId?: true;
    studentId?: true;
    canViewGrades?: true;
    canViewAttendance?: true;
    canViewFees?: true;
    canViewHomework?: true;
};
export type ParentAccessCountAggregateInputType = {
    id?: true;
    parentId?: true;
    studentId?: true;
    canViewGrades?: true;
    canViewAttendance?: true;
    canViewFees?: true;
    canViewHomework?: true;
    _all?: true;
};
export type ParentAccessAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ParentAccess to aggregate.
     */
    where?: Prisma.ParentAccessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ParentAccesses to fetch.
     */
    orderBy?: Prisma.ParentAccessOrderByWithRelationInput | Prisma.ParentAccessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ParentAccessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ParentAccesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ParentAccesses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ParentAccesses
    **/
    _count?: true | ParentAccessCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: ParentAccessAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: ParentAccessSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ParentAccessMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ParentAccessMaxAggregateInputType;
};
export type GetParentAccessAggregateType<T extends ParentAccessAggregateArgs> = {
    [P in keyof T & keyof AggregateParentAccess]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateParentAccess[P]> : Prisma.GetScalarType<T[P], AggregateParentAccess[P]>;
};
export type ParentAccessGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ParentAccessWhereInput;
    orderBy?: Prisma.ParentAccessOrderByWithAggregationInput | Prisma.ParentAccessOrderByWithAggregationInput[];
    by: Prisma.ParentAccessScalarFieldEnum[] | Prisma.ParentAccessScalarFieldEnum;
    having?: Prisma.ParentAccessScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ParentAccessCountAggregateInputType | true;
    _avg?: ParentAccessAvgAggregateInputType;
    _sum?: ParentAccessSumAggregateInputType;
    _min?: ParentAccessMinAggregateInputType;
    _max?: ParentAccessMaxAggregateInputType;
};
export type ParentAccessGroupByOutputType = {
    id: number;
    parentId: number;
    studentId: number;
    canViewGrades: boolean;
    canViewAttendance: boolean;
    canViewFees: boolean;
    canViewHomework: boolean;
    _count: ParentAccessCountAggregateOutputType | null;
    _avg: ParentAccessAvgAggregateOutputType | null;
    _sum: ParentAccessSumAggregateOutputType | null;
    _min: ParentAccessMinAggregateOutputType | null;
    _max: ParentAccessMaxAggregateOutputType | null;
};
type GetParentAccessGroupByPayload<T extends ParentAccessGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ParentAccessGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ParentAccessGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ParentAccessGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ParentAccessGroupByOutputType[P]>;
}>>;
export type ParentAccessWhereInput = {
    AND?: Prisma.ParentAccessWhereInput | Prisma.ParentAccessWhereInput[];
    OR?: Prisma.ParentAccessWhereInput[];
    NOT?: Prisma.ParentAccessWhereInput | Prisma.ParentAccessWhereInput[];
    id?: Prisma.IntFilter<"ParentAccess"> | number;
    parentId?: Prisma.IntFilter<"ParentAccess"> | number;
    studentId?: Prisma.IntFilter<"ParentAccess"> | number;
    canViewGrades?: Prisma.BoolFilter<"ParentAccess"> | boolean;
    canViewAttendance?: Prisma.BoolFilter<"ParentAccess"> | boolean;
    canViewFees?: Prisma.BoolFilter<"ParentAccess"> | boolean;
    canViewHomework?: Prisma.BoolFilter<"ParentAccess"> | boolean;
    parent?: Prisma.XOR<Prisma.ParentScalarRelationFilter, Prisma.ParentWhereInput>;
    student?: Prisma.XOR<Prisma.StudentScalarRelationFilter, Prisma.StudentWhereInput>;
};
export type ParentAccessOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    studentId?: Prisma.SortOrder;
    canViewGrades?: Prisma.SortOrder;
    canViewAttendance?: Prisma.SortOrder;
    canViewFees?: Prisma.SortOrder;
    canViewHomework?: Prisma.SortOrder;
    parent?: Prisma.ParentOrderByWithRelationInput;
    student?: Prisma.StudentOrderByWithRelationInput;
};
export type ParentAccessWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    parentId_studentId?: Prisma.ParentAccessParentIdStudentIdCompoundUniqueInput;
    AND?: Prisma.ParentAccessWhereInput | Prisma.ParentAccessWhereInput[];
    OR?: Prisma.ParentAccessWhereInput[];
    NOT?: Prisma.ParentAccessWhereInput | Prisma.ParentAccessWhereInput[];
    parentId?: Prisma.IntFilter<"ParentAccess"> | number;
    studentId?: Prisma.IntFilter<"ParentAccess"> | number;
    canViewGrades?: Prisma.BoolFilter<"ParentAccess"> | boolean;
    canViewAttendance?: Prisma.BoolFilter<"ParentAccess"> | boolean;
    canViewFees?: Prisma.BoolFilter<"ParentAccess"> | boolean;
    canViewHomework?: Prisma.BoolFilter<"ParentAccess"> | boolean;
    parent?: Prisma.XOR<Prisma.ParentScalarRelationFilter, Prisma.ParentWhereInput>;
    student?: Prisma.XOR<Prisma.StudentScalarRelationFilter, Prisma.StudentWhereInput>;
}, "id" | "parentId_studentId">;
export type ParentAccessOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    studentId?: Prisma.SortOrder;
    canViewGrades?: Prisma.SortOrder;
    canViewAttendance?: Prisma.SortOrder;
    canViewFees?: Prisma.SortOrder;
    canViewHomework?: Prisma.SortOrder;
    _count?: Prisma.ParentAccessCountOrderByAggregateInput;
    _avg?: Prisma.ParentAccessAvgOrderByAggregateInput;
    _max?: Prisma.ParentAccessMaxOrderByAggregateInput;
    _min?: Prisma.ParentAccessMinOrderByAggregateInput;
    _sum?: Prisma.ParentAccessSumOrderByAggregateInput;
};
export type ParentAccessScalarWhereWithAggregatesInput = {
    AND?: Prisma.ParentAccessScalarWhereWithAggregatesInput | Prisma.ParentAccessScalarWhereWithAggregatesInput[];
    OR?: Prisma.ParentAccessScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ParentAccessScalarWhereWithAggregatesInput | Prisma.ParentAccessScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"ParentAccess"> | number;
    parentId?: Prisma.IntWithAggregatesFilter<"ParentAccess"> | number;
    studentId?: Prisma.IntWithAggregatesFilter<"ParentAccess"> | number;
    canViewGrades?: Prisma.BoolWithAggregatesFilter<"ParentAccess"> | boolean;
    canViewAttendance?: Prisma.BoolWithAggregatesFilter<"ParentAccess"> | boolean;
    canViewFees?: Prisma.BoolWithAggregatesFilter<"ParentAccess"> | boolean;
    canViewHomework?: Prisma.BoolWithAggregatesFilter<"ParentAccess"> | boolean;
};
export type ParentAccessCreateInput = {
    canViewGrades?: boolean;
    canViewAttendance?: boolean;
    canViewFees?: boolean;
    canViewHomework?: boolean;
    parent: Prisma.ParentCreateNestedOneWithoutParentAccessInput;
    student: Prisma.StudentCreateNestedOneWithoutParentAccessInput;
};
export type ParentAccessUncheckedCreateInput = {
    id?: number;
    parentId: number;
    studentId: number;
    canViewGrades?: boolean;
    canViewAttendance?: boolean;
    canViewFees?: boolean;
    canViewHomework?: boolean;
};
export type ParentAccessUpdateInput = {
    canViewGrades?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewAttendance?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewFees?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewHomework?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    parent?: Prisma.ParentUpdateOneRequiredWithoutParentAccessNestedInput;
    student?: Prisma.StudentUpdateOneRequiredWithoutParentAccessNestedInput;
};
export type ParentAccessUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    parentId?: Prisma.IntFieldUpdateOperationsInput | number;
    studentId?: Prisma.IntFieldUpdateOperationsInput | number;
    canViewGrades?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewAttendance?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewFees?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewHomework?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type ParentAccessCreateManyInput = {
    id?: number;
    parentId: number;
    studentId: number;
    canViewGrades?: boolean;
    canViewAttendance?: boolean;
    canViewFees?: boolean;
    canViewHomework?: boolean;
};
export type ParentAccessUpdateManyMutationInput = {
    canViewGrades?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewAttendance?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewFees?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewHomework?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type ParentAccessUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    parentId?: Prisma.IntFieldUpdateOperationsInput | number;
    studentId?: Prisma.IntFieldUpdateOperationsInput | number;
    canViewGrades?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewAttendance?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewFees?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewHomework?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type ParentAccessListRelationFilter = {
    every?: Prisma.ParentAccessWhereInput;
    some?: Prisma.ParentAccessWhereInput;
    none?: Prisma.ParentAccessWhereInput;
};
export type ParentAccessOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ParentAccessParentIdStudentIdCompoundUniqueInput = {
    parentId: number;
    studentId: number;
};
export type ParentAccessCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    studentId?: Prisma.SortOrder;
    canViewGrades?: Prisma.SortOrder;
    canViewAttendance?: Prisma.SortOrder;
    canViewFees?: Prisma.SortOrder;
    canViewHomework?: Prisma.SortOrder;
};
export type ParentAccessAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    studentId?: Prisma.SortOrder;
};
export type ParentAccessMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    studentId?: Prisma.SortOrder;
    canViewGrades?: Prisma.SortOrder;
    canViewAttendance?: Prisma.SortOrder;
    canViewFees?: Prisma.SortOrder;
    canViewHomework?: Prisma.SortOrder;
};
export type ParentAccessMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    studentId?: Prisma.SortOrder;
    canViewGrades?: Prisma.SortOrder;
    canViewAttendance?: Prisma.SortOrder;
    canViewFees?: Prisma.SortOrder;
    canViewHomework?: Prisma.SortOrder;
};
export type ParentAccessSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    studentId?: Prisma.SortOrder;
};
export type ParentAccessCreateNestedManyWithoutStudentInput = {
    create?: Prisma.XOR<Prisma.ParentAccessCreateWithoutStudentInput, Prisma.ParentAccessUncheckedCreateWithoutStudentInput> | Prisma.ParentAccessCreateWithoutStudentInput[] | Prisma.ParentAccessUncheckedCreateWithoutStudentInput[];
    connectOrCreate?: Prisma.ParentAccessCreateOrConnectWithoutStudentInput | Prisma.ParentAccessCreateOrConnectWithoutStudentInput[];
    createMany?: Prisma.ParentAccessCreateManyStudentInputEnvelope;
    connect?: Prisma.ParentAccessWhereUniqueInput | Prisma.ParentAccessWhereUniqueInput[];
};
export type ParentAccessUncheckedCreateNestedManyWithoutStudentInput = {
    create?: Prisma.XOR<Prisma.ParentAccessCreateWithoutStudentInput, Prisma.ParentAccessUncheckedCreateWithoutStudentInput> | Prisma.ParentAccessCreateWithoutStudentInput[] | Prisma.ParentAccessUncheckedCreateWithoutStudentInput[];
    connectOrCreate?: Prisma.ParentAccessCreateOrConnectWithoutStudentInput | Prisma.ParentAccessCreateOrConnectWithoutStudentInput[];
    createMany?: Prisma.ParentAccessCreateManyStudentInputEnvelope;
    connect?: Prisma.ParentAccessWhereUniqueInput | Prisma.ParentAccessWhereUniqueInput[];
};
export type ParentAccessUpdateManyWithoutStudentNestedInput = {
    create?: Prisma.XOR<Prisma.ParentAccessCreateWithoutStudentInput, Prisma.ParentAccessUncheckedCreateWithoutStudentInput> | Prisma.ParentAccessCreateWithoutStudentInput[] | Prisma.ParentAccessUncheckedCreateWithoutStudentInput[];
    connectOrCreate?: Prisma.ParentAccessCreateOrConnectWithoutStudentInput | Prisma.ParentAccessCreateOrConnectWithoutStudentInput[];
    upsert?: Prisma.ParentAccessUpsertWithWhereUniqueWithoutStudentInput | Prisma.ParentAccessUpsertWithWhereUniqueWithoutStudentInput[];
    createMany?: Prisma.ParentAccessCreateManyStudentInputEnvelope;
    set?: Prisma.ParentAccessWhereUniqueInput | Prisma.ParentAccessWhereUniqueInput[];
    disconnect?: Prisma.ParentAccessWhereUniqueInput | Prisma.ParentAccessWhereUniqueInput[];
    delete?: Prisma.ParentAccessWhereUniqueInput | Prisma.ParentAccessWhereUniqueInput[];
    connect?: Prisma.ParentAccessWhereUniqueInput | Prisma.ParentAccessWhereUniqueInput[];
    update?: Prisma.ParentAccessUpdateWithWhereUniqueWithoutStudentInput | Prisma.ParentAccessUpdateWithWhereUniqueWithoutStudentInput[];
    updateMany?: Prisma.ParentAccessUpdateManyWithWhereWithoutStudentInput | Prisma.ParentAccessUpdateManyWithWhereWithoutStudentInput[];
    deleteMany?: Prisma.ParentAccessScalarWhereInput | Prisma.ParentAccessScalarWhereInput[];
};
export type ParentAccessUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: Prisma.XOR<Prisma.ParentAccessCreateWithoutStudentInput, Prisma.ParentAccessUncheckedCreateWithoutStudentInput> | Prisma.ParentAccessCreateWithoutStudentInput[] | Prisma.ParentAccessUncheckedCreateWithoutStudentInput[];
    connectOrCreate?: Prisma.ParentAccessCreateOrConnectWithoutStudentInput | Prisma.ParentAccessCreateOrConnectWithoutStudentInput[];
    upsert?: Prisma.ParentAccessUpsertWithWhereUniqueWithoutStudentInput | Prisma.ParentAccessUpsertWithWhereUniqueWithoutStudentInput[];
    createMany?: Prisma.ParentAccessCreateManyStudentInputEnvelope;
    set?: Prisma.ParentAccessWhereUniqueInput | Prisma.ParentAccessWhereUniqueInput[];
    disconnect?: Prisma.ParentAccessWhereUniqueInput | Prisma.ParentAccessWhereUniqueInput[];
    delete?: Prisma.ParentAccessWhereUniqueInput | Prisma.ParentAccessWhereUniqueInput[];
    connect?: Prisma.ParentAccessWhereUniqueInput | Prisma.ParentAccessWhereUniqueInput[];
    update?: Prisma.ParentAccessUpdateWithWhereUniqueWithoutStudentInput | Prisma.ParentAccessUpdateWithWhereUniqueWithoutStudentInput[];
    updateMany?: Prisma.ParentAccessUpdateManyWithWhereWithoutStudentInput | Prisma.ParentAccessUpdateManyWithWhereWithoutStudentInput[];
    deleteMany?: Prisma.ParentAccessScalarWhereInput | Prisma.ParentAccessScalarWhereInput[];
};
export type ParentAccessCreateNestedManyWithoutParentInput = {
    create?: Prisma.XOR<Prisma.ParentAccessCreateWithoutParentInput, Prisma.ParentAccessUncheckedCreateWithoutParentInput> | Prisma.ParentAccessCreateWithoutParentInput[] | Prisma.ParentAccessUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.ParentAccessCreateOrConnectWithoutParentInput | Prisma.ParentAccessCreateOrConnectWithoutParentInput[];
    createMany?: Prisma.ParentAccessCreateManyParentInputEnvelope;
    connect?: Prisma.ParentAccessWhereUniqueInput | Prisma.ParentAccessWhereUniqueInput[];
};
export type ParentAccessUncheckedCreateNestedManyWithoutParentInput = {
    create?: Prisma.XOR<Prisma.ParentAccessCreateWithoutParentInput, Prisma.ParentAccessUncheckedCreateWithoutParentInput> | Prisma.ParentAccessCreateWithoutParentInput[] | Prisma.ParentAccessUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.ParentAccessCreateOrConnectWithoutParentInput | Prisma.ParentAccessCreateOrConnectWithoutParentInput[];
    createMany?: Prisma.ParentAccessCreateManyParentInputEnvelope;
    connect?: Prisma.ParentAccessWhereUniqueInput | Prisma.ParentAccessWhereUniqueInput[];
};
export type ParentAccessUpdateManyWithoutParentNestedInput = {
    create?: Prisma.XOR<Prisma.ParentAccessCreateWithoutParentInput, Prisma.ParentAccessUncheckedCreateWithoutParentInput> | Prisma.ParentAccessCreateWithoutParentInput[] | Prisma.ParentAccessUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.ParentAccessCreateOrConnectWithoutParentInput | Prisma.ParentAccessCreateOrConnectWithoutParentInput[];
    upsert?: Prisma.ParentAccessUpsertWithWhereUniqueWithoutParentInput | Prisma.ParentAccessUpsertWithWhereUniqueWithoutParentInput[];
    createMany?: Prisma.ParentAccessCreateManyParentInputEnvelope;
    set?: Prisma.ParentAccessWhereUniqueInput | Prisma.ParentAccessWhereUniqueInput[];
    disconnect?: Prisma.ParentAccessWhereUniqueInput | Prisma.ParentAccessWhereUniqueInput[];
    delete?: Prisma.ParentAccessWhereUniqueInput | Prisma.ParentAccessWhereUniqueInput[];
    connect?: Prisma.ParentAccessWhereUniqueInput | Prisma.ParentAccessWhereUniqueInput[];
    update?: Prisma.ParentAccessUpdateWithWhereUniqueWithoutParentInput | Prisma.ParentAccessUpdateWithWhereUniqueWithoutParentInput[];
    updateMany?: Prisma.ParentAccessUpdateManyWithWhereWithoutParentInput | Prisma.ParentAccessUpdateManyWithWhereWithoutParentInput[];
    deleteMany?: Prisma.ParentAccessScalarWhereInput | Prisma.ParentAccessScalarWhereInput[];
};
export type ParentAccessUncheckedUpdateManyWithoutParentNestedInput = {
    create?: Prisma.XOR<Prisma.ParentAccessCreateWithoutParentInput, Prisma.ParentAccessUncheckedCreateWithoutParentInput> | Prisma.ParentAccessCreateWithoutParentInput[] | Prisma.ParentAccessUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.ParentAccessCreateOrConnectWithoutParentInput | Prisma.ParentAccessCreateOrConnectWithoutParentInput[];
    upsert?: Prisma.ParentAccessUpsertWithWhereUniqueWithoutParentInput | Prisma.ParentAccessUpsertWithWhereUniqueWithoutParentInput[];
    createMany?: Prisma.ParentAccessCreateManyParentInputEnvelope;
    set?: Prisma.ParentAccessWhereUniqueInput | Prisma.ParentAccessWhereUniqueInput[];
    disconnect?: Prisma.ParentAccessWhereUniqueInput | Prisma.ParentAccessWhereUniqueInput[];
    delete?: Prisma.ParentAccessWhereUniqueInput | Prisma.ParentAccessWhereUniqueInput[];
    connect?: Prisma.ParentAccessWhereUniqueInput | Prisma.ParentAccessWhereUniqueInput[];
    update?: Prisma.ParentAccessUpdateWithWhereUniqueWithoutParentInput | Prisma.ParentAccessUpdateWithWhereUniqueWithoutParentInput[];
    updateMany?: Prisma.ParentAccessUpdateManyWithWhereWithoutParentInput | Prisma.ParentAccessUpdateManyWithWhereWithoutParentInput[];
    deleteMany?: Prisma.ParentAccessScalarWhereInput | Prisma.ParentAccessScalarWhereInput[];
};
export type ParentAccessCreateWithoutStudentInput = {
    canViewGrades?: boolean;
    canViewAttendance?: boolean;
    canViewFees?: boolean;
    canViewHomework?: boolean;
    parent: Prisma.ParentCreateNestedOneWithoutParentAccessInput;
};
export type ParentAccessUncheckedCreateWithoutStudentInput = {
    id?: number;
    parentId: number;
    canViewGrades?: boolean;
    canViewAttendance?: boolean;
    canViewFees?: boolean;
    canViewHomework?: boolean;
};
export type ParentAccessCreateOrConnectWithoutStudentInput = {
    where: Prisma.ParentAccessWhereUniqueInput;
    create: Prisma.XOR<Prisma.ParentAccessCreateWithoutStudentInput, Prisma.ParentAccessUncheckedCreateWithoutStudentInput>;
};
export type ParentAccessCreateManyStudentInputEnvelope = {
    data: Prisma.ParentAccessCreateManyStudentInput | Prisma.ParentAccessCreateManyStudentInput[];
    skipDuplicates?: boolean;
};
export type ParentAccessUpsertWithWhereUniqueWithoutStudentInput = {
    where: Prisma.ParentAccessWhereUniqueInput;
    update: Prisma.XOR<Prisma.ParentAccessUpdateWithoutStudentInput, Prisma.ParentAccessUncheckedUpdateWithoutStudentInput>;
    create: Prisma.XOR<Prisma.ParentAccessCreateWithoutStudentInput, Prisma.ParentAccessUncheckedCreateWithoutStudentInput>;
};
export type ParentAccessUpdateWithWhereUniqueWithoutStudentInput = {
    where: Prisma.ParentAccessWhereUniqueInput;
    data: Prisma.XOR<Prisma.ParentAccessUpdateWithoutStudentInput, Prisma.ParentAccessUncheckedUpdateWithoutStudentInput>;
};
export type ParentAccessUpdateManyWithWhereWithoutStudentInput = {
    where: Prisma.ParentAccessScalarWhereInput;
    data: Prisma.XOR<Prisma.ParentAccessUpdateManyMutationInput, Prisma.ParentAccessUncheckedUpdateManyWithoutStudentInput>;
};
export type ParentAccessScalarWhereInput = {
    AND?: Prisma.ParentAccessScalarWhereInput | Prisma.ParentAccessScalarWhereInput[];
    OR?: Prisma.ParentAccessScalarWhereInput[];
    NOT?: Prisma.ParentAccessScalarWhereInput | Prisma.ParentAccessScalarWhereInput[];
    id?: Prisma.IntFilter<"ParentAccess"> | number;
    parentId?: Prisma.IntFilter<"ParentAccess"> | number;
    studentId?: Prisma.IntFilter<"ParentAccess"> | number;
    canViewGrades?: Prisma.BoolFilter<"ParentAccess"> | boolean;
    canViewAttendance?: Prisma.BoolFilter<"ParentAccess"> | boolean;
    canViewFees?: Prisma.BoolFilter<"ParentAccess"> | boolean;
    canViewHomework?: Prisma.BoolFilter<"ParentAccess"> | boolean;
};
export type ParentAccessCreateWithoutParentInput = {
    canViewGrades?: boolean;
    canViewAttendance?: boolean;
    canViewFees?: boolean;
    canViewHomework?: boolean;
    student: Prisma.StudentCreateNestedOneWithoutParentAccessInput;
};
export type ParentAccessUncheckedCreateWithoutParentInput = {
    id?: number;
    studentId: number;
    canViewGrades?: boolean;
    canViewAttendance?: boolean;
    canViewFees?: boolean;
    canViewHomework?: boolean;
};
export type ParentAccessCreateOrConnectWithoutParentInput = {
    where: Prisma.ParentAccessWhereUniqueInput;
    create: Prisma.XOR<Prisma.ParentAccessCreateWithoutParentInput, Prisma.ParentAccessUncheckedCreateWithoutParentInput>;
};
export type ParentAccessCreateManyParentInputEnvelope = {
    data: Prisma.ParentAccessCreateManyParentInput | Prisma.ParentAccessCreateManyParentInput[];
    skipDuplicates?: boolean;
};
export type ParentAccessUpsertWithWhereUniqueWithoutParentInput = {
    where: Prisma.ParentAccessWhereUniqueInput;
    update: Prisma.XOR<Prisma.ParentAccessUpdateWithoutParentInput, Prisma.ParentAccessUncheckedUpdateWithoutParentInput>;
    create: Prisma.XOR<Prisma.ParentAccessCreateWithoutParentInput, Prisma.ParentAccessUncheckedCreateWithoutParentInput>;
};
export type ParentAccessUpdateWithWhereUniqueWithoutParentInput = {
    where: Prisma.ParentAccessWhereUniqueInput;
    data: Prisma.XOR<Prisma.ParentAccessUpdateWithoutParentInput, Prisma.ParentAccessUncheckedUpdateWithoutParentInput>;
};
export type ParentAccessUpdateManyWithWhereWithoutParentInput = {
    where: Prisma.ParentAccessScalarWhereInput;
    data: Prisma.XOR<Prisma.ParentAccessUpdateManyMutationInput, Prisma.ParentAccessUncheckedUpdateManyWithoutParentInput>;
};
export type ParentAccessCreateManyStudentInput = {
    id?: number;
    parentId: number;
    canViewGrades?: boolean;
    canViewAttendance?: boolean;
    canViewFees?: boolean;
    canViewHomework?: boolean;
};
export type ParentAccessUpdateWithoutStudentInput = {
    canViewGrades?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewAttendance?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewFees?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewHomework?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    parent?: Prisma.ParentUpdateOneRequiredWithoutParentAccessNestedInput;
};
export type ParentAccessUncheckedUpdateWithoutStudentInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    parentId?: Prisma.IntFieldUpdateOperationsInput | number;
    canViewGrades?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewAttendance?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewFees?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewHomework?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type ParentAccessUncheckedUpdateManyWithoutStudentInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    parentId?: Prisma.IntFieldUpdateOperationsInput | number;
    canViewGrades?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewAttendance?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewFees?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewHomework?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type ParentAccessCreateManyParentInput = {
    id?: number;
    studentId: number;
    canViewGrades?: boolean;
    canViewAttendance?: boolean;
    canViewFees?: boolean;
    canViewHomework?: boolean;
};
export type ParentAccessUpdateWithoutParentInput = {
    canViewGrades?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewAttendance?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewFees?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewHomework?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    student?: Prisma.StudentUpdateOneRequiredWithoutParentAccessNestedInput;
};
export type ParentAccessUncheckedUpdateWithoutParentInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    studentId?: Prisma.IntFieldUpdateOperationsInput | number;
    canViewGrades?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewAttendance?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewFees?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewHomework?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type ParentAccessUncheckedUpdateManyWithoutParentInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    studentId?: Prisma.IntFieldUpdateOperationsInput | number;
    canViewGrades?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewAttendance?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewFees?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    canViewHomework?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type ParentAccessSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    parentId?: boolean;
    studentId?: boolean;
    canViewGrades?: boolean;
    canViewAttendance?: boolean;
    canViewFees?: boolean;
    canViewHomework?: boolean;
    parent?: boolean | Prisma.ParentDefaultArgs<ExtArgs>;
    student?: boolean | Prisma.StudentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["parentAccess"]>;
export type ParentAccessSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    parentId?: boolean;
    studentId?: boolean;
    canViewGrades?: boolean;
    canViewAttendance?: boolean;
    canViewFees?: boolean;
    canViewHomework?: boolean;
    parent?: boolean | Prisma.ParentDefaultArgs<ExtArgs>;
    student?: boolean | Prisma.StudentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["parentAccess"]>;
export type ParentAccessSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    parentId?: boolean;
    studentId?: boolean;
    canViewGrades?: boolean;
    canViewAttendance?: boolean;
    canViewFees?: boolean;
    canViewHomework?: boolean;
    parent?: boolean | Prisma.ParentDefaultArgs<ExtArgs>;
    student?: boolean | Prisma.StudentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["parentAccess"]>;
export type ParentAccessSelectScalar = {
    id?: boolean;
    parentId?: boolean;
    studentId?: boolean;
    canViewGrades?: boolean;
    canViewAttendance?: boolean;
    canViewFees?: boolean;
    canViewHomework?: boolean;
};
export type ParentAccessOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "parentId" | "studentId" | "canViewGrades" | "canViewAttendance" | "canViewFees" | "canViewHomework", ExtArgs["result"]["parentAccess"]>;
export type ParentAccessInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    parent?: boolean | Prisma.ParentDefaultArgs<ExtArgs>;
    student?: boolean | Prisma.StudentDefaultArgs<ExtArgs>;
};
export type ParentAccessIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    parent?: boolean | Prisma.ParentDefaultArgs<ExtArgs>;
    student?: boolean | Prisma.StudentDefaultArgs<ExtArgs>;
};
export type ParentAccessIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    parent?: boolean | Prisma.ParentDefaultArgs<ExtArgs>;
    student?: boolean | Prisma.StudentDefaultArgs<ExtArgs>;
};
export type $ParentAccessPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ParentAccess";
    objects: {
        parent: Prisma.$ParentPayload<ExtArgs>;
        student: Prisma.$StudentPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        parentId: number;
        studentId: number;
        canViewGrades: boolean;
        canViewAttendance: boolean;
        canViewFees: boolean;
        canViewHomework: boolean;
    }, ExtArgs["result"]["parentAccess"]>;
    composites: {};
};
export type ParentAccessGetPayload<S extends boolean | null | undefined | ParentAccessDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ParentAccessPayload, S>;
export type ParentAccessCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ParentAccessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ParentAccessCountAggregateInputType | true;
};
export interface ParentAccessDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ParentAccess'];
        meta: {
            name: 'ParentAccess';
        };
    };
    /**
     * Find zero or one ParentAccess that matches the filter.
     * @param {ParentAccessFindUniqueArgs} args - Arguments to find a ParentAccess
     * @example
     * // Get one ParentAccess
     * const parentAccess = await prisma.parentAccess.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParentAccessFindUniqueArgs>(args: Prisma.SelectSubset<T, ParentAccessFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ParentAccessClient<runtime.Types.Result.GetResult<Prisma.$ParentAccessPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ParentAccess that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParentAccessFindUniqueOrThrowArgs} args - Arguments to find a ParentAccess
     * @example
     * // Get one ParentAccess
     * const parentAccess = await prisma.parentAccess.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParentAccessFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ParentAccessFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ParentAccessClient<runtime.Types.Result.GetResult<Prisma.$ParentAccessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ParentAccess that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentAccessFindFirstArgs} args - Arguments to find a ParentAccess
     * @example
     * // Get one ParentAccess
     * const parentAccess = await prisma.parentAccess.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParentAccessFindFirstArgs>(args?: Prisma.SelectSubset<T, ParentAccessFindFirstArgs<ExtArgs>>): Prisma.Prisma__ParentAccessClient<runtime.Types.Result.GetResult<Prisma.$ParentAccessPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ParentAccess that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentAccessFindFirstOrThrowArgs} args - Arguments to find a ParentAccess
     * @example
     * // Get one ParentAccess
     * const parentAccess = await prisma.parentAccess.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParentAccessFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ParentAccessFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ParentAccessClient<runtime.Types.Result.GetResult<Prisma.$ParentAccessPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ParentAccesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentAccessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ParentAccesses
     * const parentAccesses = await prisma.parentAccess.findMany()
     *
     * // Get first 10 ParentAccesses
     * const parentAccesses = await prisma.parentAccess.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const parentAccessWithIdOnly = await prisma.parentAccess.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ParentAccessFindManyArgs>(args?: Prisma.SelectSubset<T, ParentAccessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParentAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ParentAccess.
     * @param {ParentAccessCreateArgs} args - Arguments to create a ParentAccess.
     * @example
     * // Create one ParentAccess
     * const ParentAccess = await prisma.parentAccess.create({
     *   data: {
     *     // ... data to create a ParentAccess
     *   }
     * })
     *
     */
    create<T extends ParentAccessCreateArgs>(args: Prisma.SelectSubset<T, ParentAccessCreateArgs<ExtArgs>>): Prisma.Prisma__ParentAccessClient<runtime.Types.Result.GetResult<Prisma.$ParentAccessPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ParentAccesses.
     * @param {ParentAccessCreateManyArgs} args - Arguments to create many ParentAccesses.
     * @example
     * // Create many ParentAccesses
     * const parentAccess = await prisma.parentAccess.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ParentAccessCreateManyArgs>(args?: Prisma.SelectSubset<T, ParentAccessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ParentAccesses and returns the data saved in the database.
     * @param {ParentAccessCreateManyAndReturnArgs} args - Arguments to create many ParentAccesses.
     * @example
     * // Create many ParentAccesses
     * const parentAccess = await prisma.parentAccess.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ParentAccesses and only return the `id`
     * const parentAccessWithIdOnly = await prisma.parentAccess.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ParentAccessCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ParentAccessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParentAccessPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ParentAccess.
     * @param {ParentAccessDeleteArgs} args - Arguments to delete one ParentAccess.
     * @example
     * // Delete one ParentAccess
     * const ParentAccess = await prisma.parentAccess.delete({
     *   where: {
     *     // ... filter to delete one ParentAccess
     *   }
     * })
     *
     */
    delete<T extends ParentAccessDeleteArgs>(args: Prisma.SelectSubset<T, ParentAccessDeleteArgs<ExtArgs>>): Prisma.Prisma__ParentAccessClient<runtime.Types.Result.GetResult<Prisma.$ParentAccessPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ParentAccess.
     * @param {ParentAccessUpdateArgs} args - Arguments to update one ParentAccess.
     * @example
     * // Update one ParentAccess
     * const parentAccess = await prisma.parentAccess.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ParentAccessUpdateArgs>(args: Prisma.SelectSubset<T, ParentAccessUpdateArgs<ExtArgs>>): Prisma.Prisma__ParentAccessClient<runtime.Types.Result.GetResult<Prisma.$ParentAccessPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ParentAccesses.
     * @param {ParentAccessDeleteManyArgs} args - Arguments to filter ParentAccesses to delete.
     * @example
     * // Delete a few ParentAccesses
     * const { count } = await prisma.parentAccess.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ParentAccessDeleteManyArgs>(args?: Prisma.SelectSubset<T, ParentAccessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ParentAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentAccessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ParentAccesses
     * const parentAccess = await prisma.parentAccess.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ParentAccessUpdateManyArgs>(args: Prisma.SelectSubset<T, ParentAccessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ParentAccesses and returns the data updated in the database.
     * @param {ParentAccessUpdateManyAndReturnArgs} args - Arguments to update many ParentAccesses.
     * @example
     * // Update many ParentAccesses
     * const parentAccess = await prisma.parentAccess.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ParentAccesses and only return the `id`
     * const parentAccessWithIdOnly = await prisma.parentAccess.updateManyAndReturn({
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
    updateManyAndReturn<T extends ParentAccessUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ParentAccessUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParentAccessPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ParentAccess.
     * @param {ParentAccessUpsertArgs} args - Arguments to update or create a ParentAccess.
     * @example
     * // Update or create a ParentAccess
     * const parentAccess = await prisma.parentAccess.upsert({
     *   create: {
     *     // ... data to create a ParentAccess
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ParentAccess we want to update
     *   }
     * })
     */
    upsert<T extends ParentAccessUpsertArgs>(args: Prisma.SelectSubset<T, ParentAccessUpsertArgs<ExtArgs>>): Prisma.Prisma__ParentAccessClient<runtime.Types.Result.GetResult<Prisma.$ParentAccessPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ParentAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentAccessCountArgs} args - Arguments to filter ParentAccesses to count.
     * @example
     * // Count the number of ParentAccesses
     * const count = await prisma.parentAccess.count({
     *   where: {
     *     // ... the filter for the ParentAccesses we want to count
     *   }
     * })
    **/
    count<T extends ParentAccessCountArgs>(args?: Prisma.Subset<T, ParentAccessCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ParentAccessCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ParentAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentAccessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ParentAccessAggregateArgs>(args: Prisma.Subset<T, ParentAccessAggregateArgs>): Prisma.PrismaPromise<GetParentAccessAggregateType<T>>;
    /**
     * Group by ParentAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentAccessGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ParentAccessGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ParentAccessGroupByArgs['orderBy'];
    } : {
        orderBy?: ParentAccessGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ParentAccessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParentAccessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ParentAccess model
     */
    readonly fields: ParentAccessFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ParentAccess.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ParentAccessClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    parent<T extends Prisma.ParentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ParentDefaultArgs<ExtArgs>>): Prisma.Prisma__ParentClient<runtime.Types.Result.GetResult<Prisma.$ParentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    student<T extends Prisma.StudentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StudentDefaultArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the ParentAccess model
 */
export interface ParentAccessFieldRefs {
    readonly id: Prisma.FieldRef<"ParentAccess", 'Int'>;
    readonly parentId: Prisma.FieldRef<"ParentAccess", 'Int'>;
    readonly studentId: Prisma.FieldRef<"ParentAccess", 'Int'>;
    readonly canViewGrades: Prisma.FieldRef<"ParentAccess", 'Boolean'>;
    readonly canViewAttendance: Prisma.FieldRef<"ParentAccess", 'Boolean'>;
    readonly canViewFees: Prisma.FieldRef<"ParentAccess", 'Boolean'>;
    readonly canViewHomework: Prisma.FieldRef<"ParentAccess", 'Boolean'>;
}
/**
 * ParentAccess findUnique
 */
export type ParentAccessFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ParentAccess to fetch.
     */
    where: Prisma.ParentAccessWhereUniqueInput;
};
/**
 * ParentAccess findUniqueOrThrow
 */
export type ParentAccessFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ParentAccess to fetch.
     */
    where: Prisma.ParentAccessWhereUniqueInput;
};
/**
 * ParentAccess findFirst
 */
export type ParentAccessFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ParentAccess to fetch.
     */
    where?: Prisma.ParentAccessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ParentAccesses to fetch.
     */
    orderBy?: Prisma.ParentAccessOrderByWithRelationInput | Prisma.ParentAccessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ParentAccesses.
     */
    cursor?: Prisma.ParentAccessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ParentAccesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ParentAccesses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ParentAccesses.
     */
    distinct?: Prisma.ParentAccessScalarFieldEnum | Prisma.ParentAccessScalarFieldEnum[];
};
/**
 * ParentAccess findFirstOrThrow
 */
export type ParentAccessFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ParentAccess to fetch.
     */
    where?: Prisma.ParentAccessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ParentAccesses to fetch.
     */
    orderBy?: Prisma.ParentAccessOrderByWithRelationInput | Prisma.ParentAccessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ParentAccesses.
     */
    cursor?: Prisma.ParentAccessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ParentAccesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ParentAccesses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ParentAccesses.
     */
    distinct?: Prisma.ParentAccessScalarFieldEnum | Prisma.ParentAccessScalarFieldEnum[];
};
/**
 * ParentAccess findMany
 */
export type ParentAccessFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ParentAccesses to fetch.
     */
    where?: Prisma.ParentAccessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ParentAccesses to fetch.
     */
    orderBy?: Prisma.ParentAccessOrderByWithRelationInput | Prisma.ParentAccessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ParentAccesses.
     */
    cursor?: Prisma.ParentAccessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ParentAccesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ParentAccesses.
     */
    skip?: number;
    distinct?: Prisma.ParentAccessScalarFieldEnum | Prisma.ParentAccessScalarFieldEnum[];
};
/**
 * ParentAccess create
 */
export type ParentAccessCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a ParentAccess.
     */
    data: Prisma.XOR<Prisma.ParentAccessCreateInput, Prisma.ParentAccessUncheckedCreateInput>;
};
/**
 * ParentAccess createMany
 */
export type ParentAccessCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ParentAccesses.
     */
    data: Prisma.ParentAccessCreateManyInput | Prisma.ParentAccessCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ParentAccess createManyAndReturn
 */
export type ParentAccessCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentAccess
     */
    select?: Prisma.ParentAccessSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ParentAccess
     */
    omit?: Prisma.ParentAccessOmit<ExtArgs> | null;
    /**
     * The data used to create many ParentAccesses.
     */
    data: Prisma.ParentAccessCreateManyInput | Prisma.ParentAccessCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParentAccessIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * ParentAccess update
 */
export type ParentAccessUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a ParentAccess.
     */
    data: Prisma.XOR<Prisma.ParentAccessUpdateInput, Prisma.ParentAccessUncheckedUpdateInput>;
    /**
     * Choose, which ParentAccess to update.
     */
    where: Prisma.ParentAccessWhereUniqueInput;
};
/**
 * ParentAccess updateMany
 */
export type ParentAccessUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ParentAccesses.
     */
    data: Prisma.XOR<Prisma.ParentAccessUpdateManyMutationInput, Prisma.ParentAccessUncheckedUpdateManyInput>;
    /**
     * Filter which ParentAccesses to update
     */
    where?: Prisma.ParentAccessWhereInput;
    /**
     * Limit how many ParentAccesses to update.
     */
    limit?: number;
};
/**
 * ParentAccess updateManyAndReturn
 */
export type ParentAccessUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentAccess
     */
    select?: Prisma.ParentAccessSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ParentAccess
     */
    omit?: Prisma.ParentAccessOmit<ExtArgs> | null;
    /**
     * The data used to update ParentAccesses.
     */
    data: Prisma.XOR<Prisma.ParentAccessUpdateManyMutationInput, Prisma.ParentAccessUncheckedUpdateManyInput>;
    /**
     * Filter which ParentAccesses to update
     */
    where?: Prisma.ParentAccessWhereInput;
    /**
     * Limit how many ParentAccesses to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ParentAccessIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * ParentAccess upsert
 */
export type ParentAccessUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the ParentAccess to update in case it exists.
     */
    where: Prisma.ParentAccessWhereUniqueInput;
    /**
     * In case the ParentAccess found by the `where` argument doesn't exist, create a new ParentAccess with this data.
     */
    create: Prisma.XOR<Prisma.ParentAccessCreateInput, Prisma.ParentAccessUncheckedCreateInput>;
    /**
     * In case the ParentAccess was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ParentAccessUpdateInput, Prisma.ParentAccessUncheckedUpdateInput>;
};
/**
 * ParentAccess delete
 */
export type ParentAccessDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which ParentAccess to delete.
     */
    where: Prisma.ParentAccessWhereUniqueInput;
};
/**
 * ParentAccess deleteMany
 */
export type ParentAccessDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ParentAccesses to delete
     */
    where?: Prisma.ParentAccessWhereInput;
    /**
     * Limit how many ParentAccesses to delete.
     */
    limit?: number;
};
/**
 * ParentAccess without action
 */
export type ParentAccessDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=ParentAccess.d.ts.map