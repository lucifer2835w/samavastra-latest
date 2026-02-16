import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model ProductionLog
 *
 */
export type ProductionLogModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductionLogPayload>;
export type AggregateProductionLog = {
    _count: ProductionLogCountAggregateOutputType | null;
    _avg: ProductionLogAvgAggregateOutputType | null;
    _sum: ProductionLogSumAggregateOutputType | null;
    _min: ProductionLogMinAggregateOutputType | null;
    _max: ProductionLogMaxAggregateOutputType | null;
};
export type ProductionLogAvgAggregateOutputType = {
    id: number | null;
    productId: number | null;
    departmentId: number | null;
    quantityProduced: number | null;
};
export type ProductionLogSumAggregateOutputType = {
    id: number | null;
    productId: number | null;
    departmentId: number | null;
    quantityProduced: number | null;
};
export type ProductionLogMinAggregateOutputType = {
    id: number | null;
    productId: number | null;
    departmentId: number | null;
    batchNumber: string | null;
    quantityProduced: number | null;
    timestamp: Date | null;
    notes: string | null;
};
export type ProductionLogMaxAggregateOutputType = {
    id: number | null;
    productId: number | null;
    departmentId: number | null;
    batchNumber: string | null;
    quantityProduced: number | null;
    timestamp: Date | null;
    notes: string | null;
};
export type ProductionLogCountAggregateOutputType = {
    id: number;
    productId: number;
    departmentId: number;
    batchNumber: number;
    quantityProduced: number;
    timestamp: number;
    notes: number;
    _all: number;
};
export type ProductionLogAvgAggregateInputType = {
    id?: true;
    productId?: true;
    departmentId?: true;
    quantityProduced?: true;
};
export type ProductionLogSumAggregateInputType = {
    id?: true;
    productId?: true;
    departmentId?: true;
    quantityProduced?: true;
};
export type ProductionLogMinAggregateInputType = {
    id?: true;
    productId?: true;
    departmentId?: true;
    batchNumber?: true;
    quantityProduced?: true;
    timestamp?: true;
    notes?: true;
};
export type ProductionLogMaxAggregateInputType = {
    id?: true;
    productId?: true;
    departmentId?: true;
    batchNumber?: true;
    quantityProduced?: true;
    timestamp?: true;
    notes?: true;
};
export type ProductionLogCountAggregateInputType = {
    id?: true;
    productId?: true;
    departmentId?: true;
    batchNumber?: true;
    quantityProduced?: true;
    timestamp?: true;
    notes?: true;
    _all?: true;
};
export type ProductionLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ProductionLog to aggregate.
     */
    where?: Prisma.ProductionLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductionLogs to fetch.
     */
    orderBy?: Prisma.ProductionLogOrderByWithRelationInput | Prisma.ProductionLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ProductionLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductionLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductionLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ProductionLogs
    **/
    _count?: true | ProductionLogCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: ProductionLogAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: ProductionLogSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ProductionLogMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ProductionLogMaxAggregateInputType;
};
export type GetProductionLogAggregateType<T extends ProductionLogAggregateArgs> = {
    [P in keyof T & keyof AggregateProductionLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductionLog[P]> : Prisma.GetScalarType<T[P], AggregateProductionLog[P]>;
};
export type ProductionLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductionLogWhereInput;
    orderBy?: Prisma.ProductionLogOrderByWithAggregationInput | Prisma.ProductionLogOrderByWithAggregationInput[];
    by: Prisma.ProductionLogScalarFieldEnum[] | Prisma.ProductionLogScalarFieldEnum;
    having?: Prisma.ProductionLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductionLogCountAggregateInputType | true;
    _avg?: ProductionLogAvgAggregateInputType;
    _sum?: ProductionLogSumAggregateInputType;
    _min?: ProductionLogMinAggregateInputType;
    _max?: ProductionLogMaxAggregateInputType;
};
export type ProductionLogGroupByOutputType = {
    id: number;
    productId: number;
    departmentId: number | null;
    batchNumber: string;
    quantityProduced: number;
    timestamp: Date;
    notes: string | null;
    _count: ProductionLogCountAggregateOutputType | null;
    _avg: ProductionLogAvgAggregateOutputType | null;
    _sum: ProductionLogSumAggregateOutputType | null;
    _min: ProductionLogMinAggregateOutputType | null;
    _max: ProductionLogMaxAggregateOutputType | null;
};
type GetProductionLogGroupByPayload<T extends ProductionLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductionLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductionLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductionLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductionLogGroupByOutputType[P]>;
}>>;
export type ProductionLogWhereInput = {
    AND?: Prisma.ProductionLogWhereInput | Prisma.ProductionLogWhereInput[];
    OR?: Prisma.ProductionLogWhereInput[];
    NOT?: Prisma.ProductionLogWhereInput | Prisma.ProductionLogWhereInput[];
    id?: Prisma.IntFilter<"ProductionLog"> | number;
    productId?: Prisma.IntFilter<"ProductionLog"> | number;
    departmentId?: Prisma.IntNullableFilter<"ProductionLog"> | number | null;
    batchNumber?: Prisma.StringFilter<"ProductionLog"> | string;
    quantityProduced?: Prisma.IntFilter<"ProductionLog"> | number;
    timestamp?: Prisma.DateTimeFilter<"ProductionLog"> | Date | string;
    notes?: Prisma.StringNullableFilter<"ProductionLog"> | string | null;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    department?: Prisma.XOR<Prisma.DepartmentNullableScalarRelationFilter, Prisma.DepartmentWhereInput> | null;
};
export type ProductionLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    departmentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    batchNumber?: Prisma.SortOrder;
    quantityProduced?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
    department?: Prisma.DepartmentOrderByWithRelationInput;
};
export type ProductionLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.ProductionLogWhereInput | Prisma.ProductionLogWhereInput[];
    OR?: Prisma.ProductionLogWhereInput[];
    NOT?: Prisma.ProductionLogWhereInput | Prisma.ProductionLogWhereInput[];
    productId?: Prisma.IntFilter<"ProductionLog"> | number;
    departmentId?: Prisma.IntNullableFilter<"ProductionLog"> | number | null;
    batchNumber?: Prisma.StringFilter<"ProductionLog"> | string;
    quantityProduced?: Prisma.IntFilter<"ProductionLog"> | number;
    timestamp?: Prisma.DateTimeFilter<"ProductionLog"> | Date | string;
    notes?: Prisma.StringNullableFilter<"ProductionLog"> | string | null;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    department?: Prisma.XOR<Prisma.DepartmentNullableScalarRelationFilter, Prisma.DepartmentWhereInput> | null;
}, "id">;
export type ProductionLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    departmentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    batchNumber?: Prisma.SortOrder;
    quantityProduced?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ProductionLogCountOrderByAggregateInput;
    _avg?: Prisma.ProductionLogAvgOrderByAggregateInput;
    _max?: Prisma.ProductionLogMaxOrderByAggregateInput;
    _min?: Prisma.ProductionLogMinOrderByAggregateInput;
    _sum?: Prisma.ProductionLogSumOrderByAggregateInput;
};
export type ProductionLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductionLogScalarWhereWithAggregatesInput | Prisma.ProductionLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductionLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductionLogScalarWhereWithAggregatesInput | Prisma.ProductionLogScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"ProductionLog"> | number;
    productId?: Prisma.IntWithAggregatesFilter<"ProductionLog"> | number;
    departmentId?: Prisma.IntNullableWithAggregatesFilter<"ProductionLog"> | number | null;
    batchNumber?: Prisma.StringWithAggregatesFilter<"ProductionLog"> | string;
    quantityProduced?: Prisma.IntWithAggregatesFilter<"ProductionLog"> | number;
    timestamp?: Prisma.DateTimeWithAggregatesFilter<"ProductionLog"> | Date | string;
    notes?: Prisma.StringNullableWithAggregatesFilter<"ProductionLog"> | string | null;
};
export type ProductionLogCreateInput = {
    batchNumber: string;
    quantityProduced: number;
    timestamp?: Date | string;
    notes?: string | null;
    product: Prisma.ProductCreateNestedOneWithoutProductionInput;
    department?: Prisma.DepartmentCreateNestedOneWithoutProductionLogsInput;
};
export type ProductionLogUncheckedCreateInput = {
    id?: number;
    productId: number;
    departmentId?: number | null;
    batchNumber: string;
    quantityProduced: number;
    timestamp?: Date | string;
    notes?: string | null;
};
export type ProductionLogUpdateInput = {
    batchNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityProduced?: Prisma.IntFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    product?: Prisma.ProductUpdateOneRequiredWithoutProductionNestedInput;
    department?: Prisma.DepartmentUpdateOneWithoutProductionLogsNestedInput;
};
export type ProductionLogUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    productId?: Prisma.IntFieldUpdateOperationsInput | number;
    departmentId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    batchNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityProduced?: Prisma.IntFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductionLogCreateManyInput = {
    id?: number;
    productId: number;
    departmentId?: number | null;
    batchNumber: string;
    quantityProduced: number;
    timestamp?: Date | string;
    notes?: string | null;
};
export type ProductionLogUpdateManyMutationInput = {
    batchNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityProduced?: Prisma.IntFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductionLogUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    productId?: Prisma.IntFieldUpdateOperationsInput | number;
    departmentId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    batchNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityProduced?: Prisma.IntFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductionLogListRelationFilter = {
    every?: Prisma.ProductionLogWhereInput;
    some?: Prisma.ProductionLogWhereInput;
    none?: Prisma.ProductionLogWhereInput;
};
export type ProductionLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductionLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    departmentId?: Prisma.SortOrder;
    batchNumber?: Prisma.SortOrder;
    quantityProduced?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
};
export type ProductionLogAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    departmentId?: Prisma.SortOrder;
    quantityProduced?: Prisma.SortOrder;
};
export type ProductionLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    departmentId?: Prisma.SortOrder;
    batchNumber?: Prisma.SortOrder;
    quantityProduced?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
};
export type ProductionLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    departmentId?: Prisma.SortOrder;
    batchNumber?: Prisma.SortOrder;
    quantityProduced?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
};
export type ProductionLogSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    departmentId?: Prisma.SortOrder;
    quantityProduced?: Prisma.SortOrder;
};
export type ProductionLogCreateNestedManyWithoutDepartmentInput = {
    create?: Prisma.XOR<Prisma.ProductionLogCreateWithoutDepartmentInput, Prisma.ProductionLogUncheckedCreateWithoutDepartmentInput> | Prisma.ProductionLogCreateWithoutDepartmentInput[] | Prisma.ProductionLogUncheckedCreateWithoutDepartmentInput[];
    connectOrCreate?: Prisma.ProductionLogCreateOrConnectWithoutDepartmentInput | Prisma.ProductionLogCreateOrConnectWithoutDepartmentInput[];
    createMany?: Prisma.ProductionLogCreateManyDepartmentInputEnvelope;
    connect?: Prisma.ProductionLogWhereUniqueInput | Prisma.ProductionLogWhereUniqueInput[];
};
export type ProductionLogUncheckedCreateNestedManyWithoutDepartmentInput = {
    create?: Prisma.XOR<Prisma.ProductionLogCreateWithoutDepartmentInput, Prisma.ProductionLogUncheckedCreateWithoutDepartmentInput> | Prisma.ProductionLogCreateWithoutDepartmentInput[] | Prisma.ProductionLogUncheckedCreateWithoutDepartmentInput[];
    connectOrCreate?: Prisma.ProductionLogCreateOrConnectWithoutDepartmentInput | Prisma.ProductionLogCreateOrConnectWithoutDepartmentInput[];
    createMany?: Prisma.ProductionLogCreateManyDepartmentInputEnvelope;
    connect?: Prisma.ProductionLogWhereUniqueInput | Prisma.ProductionLogWhereUniqueInput[];
};
export type ProductionLogUpdateManyWithoutDepartmentNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionLogCreateWithoutDepartmentInput, Prisma.ProductionLogUncheckedCreateWithoutDepartmentInput> | Prisma.ProductionLogCreateWithoutDepartmentInput[] | Prisma.ProductionLogUncheckedCreateWithoutDepartmentInput[];
    connectOrCreate?: Prisma.ProductionLogCreateOrConnectWithoutDepartmentInput | Prisma.ProductionLogCreateOrConnectWithoutDepartmentInput[];
    upsert?: Prisma.ProductionLogUpsertWithWhereUniqueWithoutDepartmentInput | Prisma.ProductionLogUpsertWithWhereUniqueWithoutDepartmentInput[];
    createMany?: Prisma.ProductionLogCreateManyDepartmentInputEnvelope;
    set?: Prisma.ProductionLogWhereUniqueInput | Prisma.ProductionLogWhereUniqueInput[];
    disconnect?: Prisma.ProductionLogWhereUniqueInput | Prisma.ProductionLogWhereUniqueInput[];
    delete?: Prisma.ProductionLogWhereUniqueInput | Prisma.ProductionLogWhereUniqueInput[];
    connect?: Prisma.ProductionLogWhereUniqueInput | Prisma.ProductionLogWhereUniqueInput[];
    update?: Prisma.ProductionLogUpdateWithWhereUniqueWithoutDepartmentInput | Prisma.ProductionLogUpdateWithWhereUniqueWithoutDepartmentInput[];
    updateMany?: Prisma.ProductionLogUpdateManyWithWhereWithoutDepartmentInput | Prisma.ProductionLogUpdateManyWithWhereWithoutDepartmentInput[];
    deleteMany?: Prisma.ProductionLogScalarWhereInput | Prisma.ProductionLogScalarWhereInput[];
};
export type ProductionLogUncheckedUpdateManyWithoutDepartmentNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionLogCreateWithoutDepartmentInput, Prisma.ProductionLogUncheckedCreateWithoutDepartmentInput> | Prisma.ProductionLogCreateWithoutDepartmentInput[] | Prisma.ProductionLogUncheckedCreateWithoutDepartmentInput[];
    connectOrCreate?: Prisma.ProductionLogCreateOrConnectWithoutDepartmentInput | Prisma.ProductionLogCreateOrConnectWithoutDepartmentInput[];
    upsert?: Prisma.ProductionLogUpsertWithWhereUniqueWithoutDepartmentInput | Prisma.ProductionLogUpsertWithWhereUniqueWithoutDepartmentInput[];
    createMany?: Prisma.ProductionLogCreateManyDepartmentInputEnvelope;
    set?: Prisma.ProductionLogWhereUniqueInput | Prisma.ProductionLogWhereUniqueInput[];
    disconnect?: Prisma.ProductionLogWhereUniqueInput | Prisma.ProductionLogWhereUniqueInput[];
    delete?: Prisma.ProductionLogWhereUniqueInput | Prisma.ProductionLogWhereUniqueInput[];
    connect?: Prisma.ProductionLogWhereUniqueInput | Prisma.ProductionLogWhereUniqueInput[];
    update?: Prisma.ProductionLogUpdateWithWhereUniqueWithoutDepartmentInput | Prisma.ProductionLogUpdateWithWhereUniqueWithoutDepartmentInput[];
    updateMany?: Prisma.ProductionLogUpdateManyWithWhereWithoutDepartmentInput | Prisma.ProductionLogUpdateManyWithWhereWithoutDepartmentInput[];
    deleteMany?: Prisma.ProductionLogScalarWhereInput | Prisma.ProductionLogScalarWhereInput[];
};
export type ProductionLogCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductionLogCreateWithoutProductInput, Prisma.ProductionLogUncheckedCreateWithoutProductInput> | Prisma.ProductionLogCreateWithoutProductInput[] | Prisma.ProductionLogUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductionLogCreateOrConnectWithoutProductInput | Prisma.ProductionLogCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductionLogCreateManyProductInputEnvelope;
    connect?: Prisma.ProductionLogWhereUniqueInput | Prisma.ProductionLogWhereUniqueInput[];
};
export type ProductionLogUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductionLogCreateWithoutProductInput, Prisma.ProductionLogUncheckedCreateWithoutProductInput> | Prisma.ProductionLogCreateWithoutProductInput[] | Prisma.ProductionLogUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductionLogCreateOrConnectWithoutProductInput | Prisma.ProductionLogCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductionLogCreateManyProductInputEnvelope;
    connect?: Prisma.ProductionLogWhereUniqueInput | Prisma.ProductionLogWhereUniqueInput[];
};
export type ProductionLogUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionLogCreateWithoutProductInput, Prisma.ProductionLogUncheckedCreateWithoutProductInput> | Prisma.ProductionLogCreateWithoutProductInput[] | Prisma.ProductionLogUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductionLogCreateOrConnectWithoutProductInput | Prisma.ProductionLogCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductionLogUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductionLogUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductionLogCreateManyProductInputEnvelope;
    set?: Prisma.ProductionLogWhereUniqueInput | Prisma.ProductionLogWhereUniqueInput[];
    disconnect?: Prisma.ProductionLogWhereUniqueInput | Prisma.ProductionLogWhereUniqueInput[];
    delete?: Prisma.ProductionLogWhereUniqueInput | Prisma.ProductionLogWhereUniqueInput[];
    connect?: Prisma.ProductionLogWhereUniqueInput | Prisma.ProductionLogWhereUniqueInput[];
    update?: Prisma.ProductionLogUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductionLogUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductionLogUpdateManyWithWhereWithoutProductInput | Prisma.ProductionLogUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductionLogScalarWhereInput | Prisma.ProductionLogScalarWhereInput[];
};
export type ProductionLogUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductionLogCreateWithoutProductInput, Prisma.ProductionLogUncheckedCreateWithoutProductInput> | Prisma.ProductionLogCreateWithoutProductInput[] | Prisma.ProductionLogUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductionLogCreateOrConnectWithoutProductInput | Prisma.ProductionLogCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductionLogUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductionLogUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductionLogCreateManyProductInputEnvelope;
    set?: Prisma.ProductionLogWhereUniqueInput | Prisma.ProductionLogWhereUniqueInput[];
    disconnect?: Prisma.ProductionLogWhereUniqueInput | Prisma.ProductionLogWhereUniqueInput[];
    delete?: Prisma.ProductionLogWhereUniqueInput | Prisma.ProductionLogWhereUniqueInput[];
    connect?: Prisma.ProductionLogWhereUniqueInput | Prisma.ProductionLogWhereUniqueInput[];
    update?: Prisma.ProductionLogUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductionLogUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductionLogUpdateManyWithWhereWithoutProductInput | Prisma.ProductionLogUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductionLogScalarWhereInput | Prisma.ProductionLogScalarWhereInput[];
};
export type ProductionLogCreateWithoutDepartmentInput = {
    batchNumber: string;
    quantityProduced: number;
    timestamp?: Date | string;
    notes?: string | null;
    product: Prisma.ProductCreateNestedOneWithoutProductionInput;
};
export type ProductionLogUncheckedCreateWithoutDepartmentInput = {
    id?: number;
    productId: number;
    batchNumber: string;
    quantityProduced: number;
    timestamp?: Date | string;
    notes?: string | null;
};
export type ProductionLogCreateOrConnectWithoutDepartmentInput = {
    where: Prisma.ProductionLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductionLogCreateWithoutDepartmentInput, Prisma.ProductionLogUncheckedCreateWithoutDepartmentInput>;
};
export type ProductionLogCreateManyDepartmentInputEnvelope = {
    data: Prisma.ProductionLogCreateManyDepartmentInput | Prisma.ProductionLogCreateManyDepartmentInput[];
    skipDuplicates?: boolean;
};
export type ProductionLogUpsertWithWhereUniqueWithoutDepartmentInput = {
    where: Prisma.ProductionLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductionLogUpdateWithoutDepartmentInput, Prisma.ProductionLogUncheckedUpdateWithoutDepartmentInput>;
    create: Prisma.XOR<Prisma.ProductionLogCreateWithoutDepartmentInput, Prisma.ProductionLogUncheckedCreateWithoutDepartmentInput>;
};
export type ProductionLogUpdateWithWhereUniqueWithoutDepartmentInput = {
    where: Prisma.ProductionLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductionLogUpdateWithoutDepartmentInput, Prisma.ProductionLogUncheckedUpdateWithoutDepartmentInput>;
};
export type ProductionLogUpdateManyWithWhereWithoutDepartmentInput = {
    where: Prisma.ProductionLogScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductionLogUpdateManyMutationInput, Prisma.ProductionLogUncheckedUpdateManyWithoutDepartmentInput>;
};
export type ProductionLogScalarWhereInput = {
    AND?: Prisma.ProductionLogScalarWhereInput | Prisma.ProductionLogScalarWhereInput[];
    OR?: Prisma.ProductionLogScalarWhereInput[];
    NOT?: Prisma.ProductionLogScalarWhereInput | Prisma.ProductionLogScalarWhereInput[];
    id?: Prisma.IntFilter<"ProductionLog"> | number;
    productId?: Prisma.IntFilter<"ProductionLog"> | number;
    departmentId?: Prisma.IntNullableFilter<"ProductionLog"> | number | null;
    batchNumber?: Prisma.StringFilter<"ProductionLog"> | string;
    quantityProduced?: Prisma.IntFilter<"ProductionLog"> | number;
    timestamp?: Prisma.DateTimeFilter<"ProductionLog"> | Date | string;
    notes?: Prisma.StringNullableFilter<"ProductionLog"> | string | null;
};
export type ProductionLogCreateWithoutProductInput = {
    batchNumber: string;
    quantityProduced: number;
    timestamp?: Date | string;
    notes?: string | null;
    department?: Prisma.DepartmentCreateNestedOneWithoutProductionLogsInput;
};
export type ProductionLogUncheckedCreateWithoutProductInput = {
    id?: number;
    departmentId?: number | null;
    batchNumber: string;
    quantityProduced: number;
    timestamp?: Date | string;
    notes?: string | null;
};
export type ProductionLogCreateOrConnectWithoutProductInput = {
    where: Prisma.ProductionLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductionLogCreateWithoutProductInput, Prisma.ProductionLogUncheckedCreateWithoutProductInput>;
};
export type ProductionLogCreateManyProductInputEnvelope = {
    data: Prisma.ProductionLogCreateManyProductInput | Prisma.ProductionLogCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type ProductionLogUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductionLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductionLogUpdateWithoutProductInput, Prisma.ProductionLogUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ProductionLogCreateWithoutProductInput, Prisma.ProductionLogUncheckedCreateWithoutProductInput>;
};
export type ProductionLogUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductionLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductionLogUpdateWithoutProductInput, Prisma.ProductionLogUncheckedUpdateWithoutProductInput>;
};
export type ProductionLogUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.ProductionLogScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductionLogUpdateManyMutationInput, Prisma.ProductionLogUncheckedUpdateManyWithoutProductInput>;
};
export type ProductionLogCreateManyDepartmentInput = {
    id?: number;
    productId: number;
    batchNumber: string;
    quantityProduced: number;
    timestamp?: Date | string;
    notes?: string | null;
};
export type ProductionLogUpdateWithoutDepartmentInput = {
    batchNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityProduced?: Prisma.IntFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    product?: Prisma.ProductUpdateOneRequiredWithoutProductionNestedInput;
};
export type ProductionLogUncheckedUpdateWithoutDepartmentInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    productId?: Prisma.IntFieldUpdateOperationsInput | number;
    batchNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityProduced?: Prisma.IntFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductionLogUncheckedUpdateManyWithoutDepartmentInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    productId?: Prisma.IntFieldUpdateOperationsInput | number;
    batchNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityProduced?: Prisma.IntFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductionLogCreateManyProductInput = {
    id?: number;
    departmentId?: number | null;
    batchNumber: string;
    quantityProduced: number;
    timestamp?: Date | string;
    notes?: string | null;
};
export type ProductionLogUpdateWithoutProductInput = {
    batchNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityProduced?: Prisma.IntFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    department?: Prisma.DepartmentUpdateOneWithoutProductionLogsNestedInput;
};
export type ProductionLogUncheckedUpdateWithoutProductInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    departmentId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    batchNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityProduced?: Prisma.IntFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductionLogUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    departmentId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    batchNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityProduced?: Prisma.IntFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ProductionLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    departmentId?: boolean;
    batchNumber?: boolean;
    quantityProduced?: boolean;
    timestamp?: boolean;
    notes?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    department?: boolean | Prisma.ProductionLog$departmentArgs<ExtArgs>;
}, ExtArgs["result"]["productionLog"]>;
export type ProductionLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    departmentId?: boolean;
    batchNumber?: boolean;
    quantityProduced?: boolean;
    timestamp?: boolean;
    notes?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    department?: boolean | Prisma.ProductionLog$departmentArgs<ExtArgs>;
}, ExtArgs["result"]["productionLog"]>;
export type ProductionLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    departmentId?: boolean;
    batchNumber?: boolean;
    quantityProduced?: boolean;
    timestamp?: boolean;
    notes?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    department?: boolean | Prisma.ProductionLog$departmentArgs<ExtArgs>;
}, ExtArgs["result"]["productionLog"]>;
export type ProductionLogSelectScalar = {
    id?: boolean;
    productId?: boolean;
    departmentId?: boolean;
    batchNumber?: boolean;
    quantityProduced?: boolean;
    timestamp?: boolean;
    notes?: boolean;
};
export type ProductionLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "productId" | "departmentId" | "batchNumber" | "quantityProduced" | "timestamp" | "notes", ExtArgs["result"]["productionLog"]>;
export type ProductionLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    department?: boolean | Prisma.ProductionLog$departmentArgs<ExtArgs>;
};
export type ProductionLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    department?: boolean | Prisma.ProductionLog$departmentArgs<ExtArgs>;
};
export type ProductionLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    department?: boolean | Prisma.ProductionLog$departmentArgs<ExtArgs>;
};
export type $ProductionLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductionLog";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
        department: Prisma.$DepartmentPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        productId: number;
        departmentId: number | null;
        batchNumber: string;
        quantityProduced: number;
        timestamp: Date;
        notes: string | null;
    }, ExtArgs["result"]["productionLog"]>;
    composites: {};
};
export type ProductionLogGetPayload<S extends boolean | null | undefined | ProductionLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductionLogPayload, S>;
export type ProductionLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductionLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductionLogCountAggregateInputType | true;
};
export interface ProductionLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductionLog'];
        meta: {
            name: 'ProductionLog';
        };
    };
    /**
     * Find zero or one ProductionLog that matches the filter.
     * @param {ProductionLogFindUniqueArgs} args - Arguments to find a ProductionLog
     * @example
     * // Get one ProductionLog
     * const productionLog = await prisma.productionLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductionLogFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductionLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductionLogClient<runtime.Types.Result.GetResult<Prisma.$ProductionLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ProductionLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductionLogFindUniqueOrThrowArgs} args - Arguments to find a ProductionLog
     * @example
     * // Get one ProductionLog
     * const productionLog = await prisma.productionLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductionLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductionLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductionLogClient<runtime.Types.Result.GetResult<Prisma.$ProductionLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ProductionLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionLogFindFirstArgs} args - Arguments to find a ProductionLog
     * @example
     * // Get one ProductionLog
     * const productionLog = await prisma.productionLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductionLogFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductionLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductionLogClient<runtime.Types.Result.GetResult<Prisma.$ProductionLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ProductionLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionLogFindFirstOrThrowArgs} args - Arguments to find a ProductionLog
     * @example
     * // Get one ProductionLog
     * const productionLog = await prisma.productionLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductionLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductionLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductionLogClient<runtime.Types.Result.GetResult<Prisma.$ProductionLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ProductionLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductionLogs
     * const productionLogs = await prisma.productionLog.findMany()
     *
     * // Get first 10 ProductionLogs
     * const productionLogs = await prisma.productionLog.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const productionLogWithIdOnly = await prisma.productionLog.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ProductionLogFindManyArgs>(args?: Prisma.SelectSubset<T, ProductionLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductionLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ProductionLog.
     * @param {ProductionLogCreateArgs} args - Arguments to create a ProductionLog.
     * @example
     * // Create one ProductionLog
     * const ProductionLog = await prisma.productionLog.create({
     *   data: {
     *     // ... data to create a ProductionLog
     *   }
     * })
     *
     */
    create<T extends ProductionLogCreateArgs>(args: Prisma.SelectSubset<T, ProductionLogCreateArgs<ExtArgs>>): Prisma.Prisma__ProductionLogClient<runtime.Types.Result.GetResult<Prisma.$ProductionLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ProductionLogs.
     * @param {ProductionLogCreateManyArgs} args - Arguments to create many ProductionLogs.
     * @example
     * // Create many ProductionLogs
     * const productionLog = await prisma.productionLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ProductionLogCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductionLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ProductionLogs and returns the data saved in the database.
     * @param {ProductionLogCreateManyAndReturnArgs} args - Arguments to create many ProductionLogs.
     * @example
     * // Create many ProductionLogs
     * const productionLog = await prisma.productionLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ProductionLogs and only return the `id`
     * const productionLogWithIdOnly = await prisma.productionLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ProductionLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductionLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductionLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ProductionLog.
     * @param {ProductionLogDeleteArgs} args - Arguments to delete one ProductionLog.
     * @example
     * // Delete one ProductionLog
     * const ProductionLog = await prisma.productionLog.delete({
     *   where: {
     *     // ... filter to delete one ProductionLog
     *   }
     * })
     *
     */
    delete<T extends ProductionLogDeleteArgs>(args: Prisma.SelectSubset<T, ProductionLogDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductionLogClient<runtime.Types.Result.GetResult<Prisma.$ProductionLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ProductionLog.
     * @param {ProductionLogUpdateArgs} args - Arguments to update one ProductionLog.
     * @example
     * // Update one ProductionLog
     * const productionLog = await prisma.productionLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ProductionLogUpdateArgs>(args: Prisma.SelectSubset<T, ProductionLogUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductionLogClient<runtime.Types.Result.GetResult<Prisma.$ProductionLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ProductionLogs.
     * @param {ProductionLogDeleteManyArgs} args - Arguments to filter ProductionLogs to delete.
     * @example
     * // Delete a few ProductionLogs
     * const { count } = await prisma.productionLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ProductionLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductionLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ProductionLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductionLogs
     * const productionLog = await prisma.productionLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ProductionLogUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductionLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ProductionLogs and returns the data updated in the database.
     * @param {ProductionLogUpdateManyAndReturnArgs} args - Arguments to update many ProductionLogs.
     * @example
     * // Update many ProductionLogs
     * const productionLog = await prisma.productionLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ProductionLogs and only return the `id`
     * const productionLogWithIdOnly = await prisma.productionLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProductionLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductionLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductionLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ProductionLog.
     * @param {ProductionLogUpsertArgs} args - Arguments to update or create a ProductionLog.
     * @example
     * // Update or create a ProductionLog
     * const productionLog = await prisma.productionLog.upsert({
     *   create: {
     *     // ... data to create a ProductionLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductionLog we want to update
     *   }
     * })
     */
    upsert<T extends ProductionLogUpsertArgs>(args: Prisma.SelectSubset<T, ProductionLogUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductionLogClient<runtime.Types.Result.GetResult<Prisma.$ProductionLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ProductionLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionLogCountArgs} args - Arguments to filter ProductionLogs to count.
     * @example
     * // Count the number of ProductionLogs
     * const count = await prisma.productionLog.count({
     *   where: {
     *     // ... the filter for the ProductionLogs we want to count
     *   }
     * })
    **/
    count<T extends ProductionLogCountArgs>(args?: Prisma.Subset<T, ProductionLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductionLogCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ProductionLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductionLogAggregateArgs>(args: Prisma.Subset<T, ProductionLogAggregateArgs>): Prisma.PrismaPromise<GetProductionLogAggregateType<T>>;
    /**
     * Group by ProductionLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionLogGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ProductionLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductionLogGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductionLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductionLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductionLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ProductionLog model
     */
    readonly fields: ProductionLogFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ProductionLog.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ProductionLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    department<T extends Prisma.ProductionLog$departmentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductionLog$departmentArgs<ExtArgs>>): Prisma.Prisma__DepartmentClient<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the ProductionLog model
 */
export interface ProductionLogFieldRefs {
    readonly id: Prisma.FieldRef<"ProductionLog", 'Int'>;
    readonly productId: Prisma.FieldRef<"ProductionLog", 'Int'>;
    readonly departmentId: Prisma.FieldRef<"ProductionLog", 'Int'>;
    readonly batchNumber: Prisma.FieldRef<"ProductionLog", 'String'>;
    readonly quantityProduced: Prisma.FieldRef<"ProductionLog", 'Int'>;
    readonly timestamp: Prisma.FieldRef<"ProductionLog", 'DateTime'>;
    readonly notes: Prisma.FieldRef<"ProductionLog", 'String'>;
}
/**
 * ProductionLog findUnique
 */
export type ProductionLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionLog
     */
    select?: Prisma.ProductionLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductionLog
     */
    omit?: Prisma.ProductionLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductionLogInclude<ExtArgs> | null;
    /**
     * Filter, which ProductionLog to fetch.
     */
    where: Prisma.ProductionLogWhereUniqueInput;
};
/**
 * ProductionLog findUniqueOrThrow
 */
export type ProductionLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionLog
     */
    select?: Prisma.ProductionLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductionLog
     */
    omit?: Prisma.ProductionLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductionLogInclude<ExtArgs> | null;
    /**
     * Filter, which ProductionLog to fetch.
     */
    where: Prisma.ProductionLogWhereUniqueInput;
};
/**
 * ProductionLog findFirst
 */
export type ProductionLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionLog
     */
    select?: Prisma.ProductionLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductionLog
     */
    omit?: Prisma.ProductionLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductionLogInclude<ExtArgs> | null;
    /**
     * Filter, which ProductionLog to fetch.
     */
    where?: Prisma.ProductionLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductionLogs to fetch.
     */
    orderBy?: Prisma.ProductionLogOrderByWithRelationInput | Prisma.ProductionLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ProductionLogs.
     */
    cursor?: Prisma.ProductionLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductionLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductionLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductionLogs.
     */
    distinct?: Prisma.ProductionLogScalarFieldEnum | Prisma.ProductionLogScalarFieldEnum[];
};
/**
 * ProductionLog findFirstOrThrow
 */
export type ProductionLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionLog
     */
    select?: Prisma.ProductionLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductionLog
     */
    omit?: Prisma.ProductionLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductionLogInclude<ExtArgs> | null;
    /**
     * Filter, which ProductionLog to fetch.
     */
    where?: Prisma.ProductionLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductionLogs to fetch.
     */
    orderBy?: Prisma.ProductionLogOrderByWithRelationInput | Prisma.ProductionLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ProductionLogs.
     */
    cursor?: Prisma.ProductionLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductionLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductionLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductionLogs.
     */
    distinct?: Prisma.ProductionLogScalarFieldEnum | Prisma.ProductionLogScalarFieldEnum[];
};
/**
 * ProductionLog findMany
 */
export type ProductionLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionLog
     */
    select?: Prisma.ProductionLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductionLog
     */
    omit?: Prisma.ProductionLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductionLogInclude<ExtArgs> | null;
    /**
     * Filter, which ProductionLogs to fetch.
     */
    where?: Prisma.ProductionLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductionLogs to fetch.
     */
    orderBy?: Prisma.ProductionLogOrderByWithRelationInput | Prisma.ProductionLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ProductionLogs.
     */
    cursor?: Prisma.ProductionLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductionLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductionLogs.
     */
    skip?: number;
    distinct?: Prisma.ProductionLogScalarFieldEnum | Prisma.ProductionLogScalarFieldEnum[];
};
/**
 * ProductionLog create
 */
export type ProductionLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionLog
     */
    select?: Prisma.ProductionLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductionLog
     */
    omit?: Prisma.ProductionLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductionLogInclude<ExtArgs> | null;
    /**
     * The data needed to create a ProductionLog.
     */
    data: Prisma.XOR<Prisma.ProductionLogCreateInput, Prisma.ProductionLogUncheckedCreateInput>;
};
/**
 * ProductionLog createMany
 */
export type ProductionLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductionLogs.
     */
    data: Prisma.ProductionLogCreateManyInput | Prisma.ProductionLogCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ProductionLog createManyAndReturn
 */
export type ProductionLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionLog
     */
    select?: Prisma.ProductionLogSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductionLog
     */
    omit?: Prisma.ProductionLogOmit<ExtArgs> | null;
    /**
     * The data used to create many ProductionLogs.
     */
    data: Prisma.ProductionLogCreateManyInput | Prisma.ProductionLogCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductionLogIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * ProductionLog update
 */
export type ProductionLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionLog
     */
    select?: Prisma.ProductionLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductionLog
     */
    omit?: Prisma.ProductionLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductionLogInclude<ExtArgs> | null;
    /**
     * The data needed to update a ProductionLog.
     */
    data: Prisma.XOR<Prisma.ProductionLogUpdateInput, Prisma.ProductionLogUncheckedUpdateInput>;
    /**
     * Choose, which ProductionLog to update.
     */
    where: Prisma.ProductionLogWhereUniqueInput;
};
/**
 * ProductionLog updateMany
 */
export type ProductionLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductionLogs.
     */
    data: Prisma.XOR<Prisma.ProductionLogUpdateManyMutationInput, Prisma.ProductionLogUncheckedUpdateManyInput>;
    /**
     * Filter which ProductionLogs to update
     */
    where?: Prisma.ProductionLogWhereInput;
    /**
     * Limit how many ProductionLogs to update.
     */
    limit?: number;
};
/**
 * ProductionLog updateManyAndReturn
 */
export type ProductionLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionLog
     */
    select?: Prisma.ProductionLogSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductionLog
     */
    omit?: Prisma.ProductionLogOmit<ExtArgs> | null;
    /**
     * The data used to update ProductionLogs.
     */
    data: Prisma.XOR<Prisma.ProductionLogUpdateManyMutationInput, Prisma.ProductionLogUncheckedUpdateManyInput>;
    /**
     * Filter which ProductionLogs to update
     */
    where?: Prisma.ProductionLogWhereInput;
    /**
     * Limit how many ProductionLogs to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductionLogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * ProductionLog upsert
 */
export type ProductionLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionLog
     */
    select?: Prisma.ProductionLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductionLog
     */
    omit?: Prisma.ProductionLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductionLogInclude<ExtArgs> | null;
    /**
     * The filter to search for the ProductionLog to update in case it exists.
     */
    where: Prisma.ProductionLogWhereUniqueInput;
    /**
     * In case the ProductionLog found by the `where` argument doesn't exist, create a new ProductionLog with this data.
     */
    create: Prisma.XOR<Prisma.ProductionLogCreateInput, Prisma.ProductionLogUncheckedCreateInput>;
    /**
     * In case the ProductionLog was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ProductionLogUpdateInput, Prisma.ProductionLogUncheckedUpdateInput>;
};
/**
 * ProductionLog delete
 */
export type ProductionLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionLog
     */
    select?: Prisma.ProductionLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductionLog
     */
    omit?: Prisma.ProductionLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductionLogInclude<ExtArgs> | null;
    /**
     * Filter which ProductionLog to delete.
     */
    where: Prisma.ProductionLogWhereUniqueInput;
};
/**
 * ProductionLog deleteMany
 */
export type ProductionLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ProductionLogs to delete
     */
    where?: Prisma.ProductionLogWhereInput;
    /**
     * Limit how many ProductionLogs to delete.
     */
    limit?: number;
};
/**
 * ProductionLog.department
 */
export type ProductionLog$departmentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: Prisma.DepartmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Department
     */
    omit?: Prisma.DepartmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DepartmentInclude<ExtArgs> | null;
    where?: Prisma.DepartmentWhereInput;
};
/**
 * ProductionLog without action
 */
export type ProductionLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionLog
     */
    select?: Prisma.ProductionLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductionLog
     */
    omit?: Prisma.ProductionLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductionLogInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=ProductionLog.d.ts.map