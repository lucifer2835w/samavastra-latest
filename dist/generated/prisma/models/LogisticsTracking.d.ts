import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model LogisticsTracking
 *
 */
export type LogisticsTrackingModel = runtime.Types.Result.DefaultSelection<Prisma.$LogisticsTrackingPayload>;
export type AggregateLogisticsTracking = {
    _count: LogisticsTrackingCountAggregateOutputType | null;
    _avg: LogisticsTrackingAvgAggregateOutputType | null;
    _sum: LogisticsTrackingSumAggregateOutputType | null;
    _min: LogisticsTrackingMinAggregateOutputType | null;
    _max: LogisticsTrackingMaxAggregateOutputType | null;
};
export type LogisticsTrackingAvgAggregateOutputType = {
    id: number | null;
    orderId: number | null;
};
export type LogisticsTrackingSumAggregateOutputType = {
    id: number | null;
    orderId: number | null;
};
export type LogisticsTrackingMinAggregateOutputType = {
    id: number | null;
    orderId: number | null;
    trackingNumber: string | null;
    status: string | null;
    estimatedDelivery: Date | null;
    actualDelivery: Date | null;
};
export type LogisticsTrackingMaxAggregateOutputType = {
    id: number | null;
    orderId: number | null;
    trackingNumber: string | null;
    status: string | null;
    estimatedDelivery: Date | null;
    actualDelivery: Date | null;
};
export type LogisticsTrackingCountAggregateOutputType = {
    id: number;
    orderId: number;
    trackingNumber: number;
    status: number;
    estimatedDelivery: number;
    actualDelivery: number;
    _all: number;
};
export type LogisticsTrackingAvgAggregateInputType = {
    id?: true;
    orderId?: true;
};
export type LogisticsTrackingSumAggregateInputType = {
    id?: true;
    orderId?: true;
};
export type LogisticsTrackingMinAggregateInputType = {
    id?: true;
    orderId?: true;
    trackingNumber?: true;
    status?: true;
    estimatedDelivery?: true;
    actualDelivery?: true;
};
export type LogisticsTrackingMaxAggregateInputType = {
    id?: true;
    orderId?: true;
    trackingNumber?: true;
    status?: true;
    estimatedDelivery?: true;
    actualDelivery?: true;
};
export type LogisticsTrackingCountAggregateInputType = {
    id?: true;
    orderId?: true;
    trackingNumber?: true;
    status?: true;
    estimatedDelivery?: true;
    actualDelivery?: true;
    _all?: true;
};
export type LogisticsTrackingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which LogisticsTracking to aggregate.
     */
    where?: Prisma.LogisticsTrackingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of LogisticsTrackings to fetch.
     */
    orderBy?: Prisma.LogisticsTrackingOrderByWithRelationInput | Prisma.LogisticsTrackingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.LogisticsTrackingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` LogisticsTrackings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` LogisticsTrackings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned LogisticsTrackings
    **/
    _count?: true | LogisticsTrackingCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: LogisticsTrackingAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: LogisticsTrackingSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: LogisticsTrackingMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: LogisticsTrackingMaxAggregateInputType;
};
export type GetLogisticsTrackingAggregateType<T extends LogisticsTrackingAggregateArgs> = {
    [P in keyof T & keyof AggregateLogisticsTracking]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLogisticsTracking[P]> : Prisma.GetScalarType<T[P], AggregateLogisticsTracking[P]>;
};
export type LogisticsTrackingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LogisticsTrackingWhereInput;
    orderBy?: Prisma.LogisticsTrackingOrderByWithAggregationInput | Prisma.LogisticsTrackingOrderByWithAggregationInput[];
    by: Prisma.LogisticsTrackingScalarFieldEnum[] | Prisma.LogisticsTrackingScalarFieldEnum;
    having?: Prisma.LogisticsTrackingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LogisticsTrackingCountAggregateInputType | true;
    _avg?: LogisticsTrackingAvgAggregateInputType;
    _sum?: LogisticsTrackingSumAggregateInputType;
    _min?: LogisticsTrackingMinAggregateInputType;
    _max?: LogisticsTrackingMaxAggregateInputType;
};
export type LogisticsTrackingGroupByOutputType = {
    id: number;
    orderId: number;
    trackingNumber: string;
    status: string;
    estimatedDelivery: Date | null;
    actualDelivery: Date | null;
    _count: LogisticsTrackingCountAggregateOutputType | null;
    _avg: LogisticsTrackingAvgAggregateOutputType | null;
    _sum: LogisticsTrackingSumAggregateOutputType | null;
    _min: LogisticsTrackingMinAggregateOutputType | null;
    _max: LogisticsTrackingMaxAggregateOutputType | null;
};
type GetLogisticsTrackingGroupByPayload<T extends LogisticsTrackingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LogisticsTrackingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LogisticsTrackingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LogisticsTrackingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LogisticsTrackingGroupByOutputType[P]>;
}>>;
export type LogisticsTrackingWhereInput = {
    AND?: Prisma.LogisticsTrackingWhereInput | Prisma.LogisticsTrackingWhereInput[];
    OR?: Prisma.LogisticsTrackingWhereInput[];
    NOT?: Prisma.LogisticsTrackingWhereInput | Prisma.LogisticsTrackingWhereInput[];
    id?: Prisma.IntFilter<"LogisticsTracking"> | number;
    orderId?: Prisma.IntFilter<"LogisticsTracking"> | number;
    trackingNumber?: Prisma.StringFilter<"LogisticsTracking"> | string;
    status?: Prisma.StringFilter<"LogisticsTracking"> | string;
    estimatedDelivery?: Prisma.DateTimeNullableFilter<"LogisticsTracking"> | Date | string | null;
    actualDelivery?: Prisma.DateTimeNullableFilter<"LogisticsTracking"> | Date | string | null;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
};
export type LogisticsTrackingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    trackingNumber?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    estimatedDelivery?: Prisma.SortOrderInput | Prisma.SortOrder;
    actualDelivery?: Prisma.SortOrderInput | Prisma.SortOrder;
    order?: Prisma.OrderOrderByWithRelationInput;
};
export type LogisticsTrackingWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    trackingNumber?: string;
    AND?: Prisma.LogisticsTrackingWhereInput | Prisma.LogisticsTrackingWhereInput[];
    OR?: Prisma.LogisticsTrackingWhereInput[];
    NOT?: Prisma.LogisticsTrackingWhereInput | Prisma.LogisticsTrackingWhereInput[];
    orderId?: Prisma.IntFilter<"LogisticsTracking"> | number;
    status?: Prisma.StringFilter<"LogisticsTracking"> | string;
    estimatedDelivery?: Prisma.DateTimeNullableFilter<"LogisticsTracking"> | Date | string | null;
    actualDelivery?: Prisma.DateTimeNullableFilter<"LogisticsTracking"> | Date | string | null;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
}, "id" | "trackingNumber">;
export type LogisticsTrackingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    trackingNumber?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    estimatedDelivery?: Prisma.SortOrderInput | Prisma.SortOrder;
    actualDelivery?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.LogisticsTrackingCountOrderByAggregateInput;
    _avg?: Prisma.LogisticsTrackingAvgOrderByAggregateInput;
    _max?: Prisma.LogisticsTrackingMaxOrderByAggregateInput;
    _min?: Prisma.LogisticsTrackingMinOrderByAggregateInput;
    _sum?: Prisma.LogisticsTrackingSumOrderByAggregateInput;
};
export type LogisticsTrackingScalarWhereWithAggregatesInput = {
    AND?: Prisma.LogisticsTrackingScalarWhereWithAggregatesInput | Prisma.LogisticsTrackingScalarWhereWithAggregatesInput[];
    OR?: Prisma.LogisticsTrackingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LogisticsTrackingScalarWhereWithAggregatesInput | Prisma.LogisticsTrackingScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"LogisticsTracking"> | number;
    orderId?: Prisma.IntWithAggregatesFilter<"LogisticsTracking"> | number;
    trackingNumber?: Prisma.StringWithAggregatesFilter<"LogisticsTracking"> | string;
    status?: Prisma.StringWithAggregatesFilter<"LogisticsTracking"> | string;
    estimatedDelivery?: Prisma.DateTimeNullableWithAggregatesFilter<"LogisticsTracking"> | Date | string | null;
    actualDelivery?: Prisma.DateTimeNullableWithAggregatesFilter<"LogisticsTracking"> | Date | string | null;
};
export type LogisticsTrackingCreateInput = {
    trackingNumber: string;
    status: string;
    estimatedDelivery?: Date | string | null;
    actualDelivery?: Date | string | null;
    order: Prisma.OrderCreateNestedOneWithoutLogisticsInput;
};
export type LogisticsTrackingUncheckedCreateInput = {
    id?: number;
    orderId: number;
    trackingNumber: string;
    status: string;
    estimatedDelivery?: Date | string | null;
    actualDelivery?: Date | string | null;
};
export type LogisticsTrackingUpdateInput = {
    trackingNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    estimatedDelivery?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    actualDelivery?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    order?: Prisma.OrderUpdateOneRequiredWithoutLogisticsNestedInput;
};
export type LogisticsTrackingUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    orderId?: Prisma.IntFieldUpdateOperationsInput | number;
    trackingNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    estimatedDelivery?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    actualDelivery?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type LogisticsTrackingCreateManyInput = {
    id?: number;
    orderId: number;
    trackingNumber: string;
    status: string;
    estimatedDelivery?: Date | string | null;
    actualDelivery?: Date | string | null;
};
export type LogisticsTrackingUpdateManyMutationInput = {
    trackingNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    estimatedDelivery?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    actualDelivery?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type LogisticsTrackingUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    orderId?: Prisma.IntFieldUpdateOperationsInput | number;
    trackingNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    estimatedDelivery?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    actualDelivery?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type LogisticsTrackingListRelationFilter = {
    every?: Prisma.LogisticsTrackingWhereInput;
    some?: Prisma.LogisticsTrackingWhereInput;
    none?: Prisma.LogisticsTrackingWhereInput;
};
export type LogisticsTrackingOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type LogisticsTrackingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    trackingNumber?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    estimatedDelivery?: Prisma.SortOrder;
    actualDelivery?: Prisma.SortOrder;
};
export type LogisticsTrackingAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
};
export type LogisticsTrackingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    trackingNumber?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    estimatedDelivery?: Prisma.SortOrder;
    actualDelivery?: Prisma.SortOrder;
};
export type LogisticsTrackingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    trackingNumber?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    estimatedDelivery?: Prisma.SortOrder;
    actualDelivery?: Prisma.SortOrder;
};
export type LogisticsTrackingSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
};
export type LogisticsTrackingCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.LogisticsTrackingCreateWithoutOrderInput, Prisma.LogisticsTrackingUncheckedCreateWithoutOrderInput> | Prisma.LogisticsTrackingCreateWithoutOrderInput[] | Prisma.LogisticsTrackingUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.LogisticsTrackingCreateOrConnectWithoutOrderInput | Prisma.LogisticsTrackingCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.LogisticsTrackingCreateManyOrderInputEnvelope;
    connect?: Prisma.LogisticsTrackingWhereUniqueInput | Prisma.LogisticsTrackingWhereUniqueInput[];
};
export type LogisticsTrackingUncheckedCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.LogisticsTrackingCreateWithoutOrderInput, Prisma.LogisticsTrackingUncheckedCreateWithoutOrderInput> | Prisma.LogisticsTrackingCreateWithoutOrderInput[] | Prisma.LogisticsTrackingUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.LogisticsTrackingCreateOrConnectWithoutOrderInput | Prisma.LogisticsTrackingCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.LogisticsTrackingCreateManyOrderInputEnvelope;
    connect?: Prisma.LogisticsTrackingWhereUniqueInput | Prisma.LogisticsTrackingWhereUniqueInput[];
};
export type LogisticsTrackingUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.LogisticsTrackingCreateWithoutOrderInput, Prisma.LogisticsTrackingUncheckedCreateWithoutOrderInput> | Prisma.LogisticsTrackingCreateWithoutOrderInput[] | Prisma.LogisticsTrackingUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.LogisticsTrackingCreateOrConnectWithoutOrderInput | Prisma.LogisticsTrackingCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.LogisticsTrackingUpsertWithWhereUniqueWithoutOrderInput | Prisma.LogisticsTrackingUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.LogisticsTrackingCreateManyOrderInputEnvelope;
    set?: Prisma.LogisticsTrackingWhereUniqueInput | Prisma.LogisticsTrackingWhereUniqueInput[];
    disconnect?: Prisma.LogisticsTrackingWhereUniqueInput | Prisma.LogisticsTrackingWhereUniqueInput[];
    delete?: Prisma.LogisticsTrackingWhereUniqueInput | Prisma.LogisticsTrackingWhereUniqueInput[];
    connect?: Prisma.LogisticsTrackingWhereUniqueInput | Prisma.LogisticsTrackingWhereUniqueInput[];
    update?: Prisma.LogisticsTrackingUpdateWithWhereUniqueWithoutOrderInput | Prisma.LogisticsTrackingUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.LogisticsTrackingUpdateManyWithWhereWithoutOrderInput | Prisma.LogisticsTrackingUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.LogisticsTrackingScalarWhereInput | Prisma.LogisticsTrackingScalarWhereInput[];
};
export type LogisticsTrackingUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.LogisticsTrackingCreateWithoutOrderInput, Prisma.LogisticsTrackingUncheckedCreateWithoutOrderInput> | Prisma.LogisticsTrackingCreateWithoutOrderInput[] | Prisma.LogisticsTrackingUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.LogisticsTrackingCreateOrConnectWithoutOrderInput | Prisma.LogisticsTrackingCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.LogisticsTrackingUpsertWithWhereUniqueWithoutOrderInput | Prisma.LogisticsTrackingUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.LogisticsTrackingCreateManyOrderInputEnvelope;
    set?: Prisma.LogisticsTrackingWhereUniqueInput | Prisma.LogisticsTrackingWhereUniqueInput[];
    disconnect?: Prisma.LogisticsTrackingWhereUniqueInput | Prisma.LogisticsTrackingWhereUniqueInput[];
    delete?: Prisma.LogisticsTrackingWhereUniqueInput | Prisma.LogisticsTrackingWhereUniqueInput[];
    connect?: Prisma.LogisticsTrackingWhereUniqueInput | Prisma.LogisticsTrackingWhereUniqueInput[];
    update?: Prisma.LogisticsTrackingUpdateWithWhereUniqueWithoutOrderInput | Prisma.LogisticsTrackingUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.LogisticsTrackingUpdateManyWithWhereWithoutOrderInput | Prisma.LogisticsTrackingUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.LogisticsTrackingScalarWhereInput | Prisma.LogisticsTrackingScalarWhereInput[];
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type LogisticsTrackingCreateWithoutOrderInput = {
    trackingNumber: string;
    status: string;
    estimatedDelivery?: Date | string | null;
    actualDelivery?: Date | string | null;
};
export type LogisticsTrackingUncheckedCreateWithoutOrderInput = {
    id?: number;
    trackingNumber: string;
    status: string;
    estimatedDelivery?: Date | string | null;
    actualDelivery?: Date | string | null;
};
export type LogisticsTrackingCreateOrConnectWithoutOrderInput = {
    where: Prisma.LogisticsTrackingWhereUniqueInput;
    create: Prisma.XOR<Prisma.LogisticsTrackingCreateWithoutOrderInput, Prisma.LogisticsTrackingUncheckedCreateWithoutOrderInput>;
};
export type LogisticsTrackingCreateManyOrderInputEnvelope = {
    data: Prisma.LogisticsTrackingCreateManyOrderInput | Prisma.LogisticsTrackingCreateManyOrderInput[];
    skipDuplicates?: boolean;
};
export type LogisticsTrackingUpsertWithWhereUniqueWithoutOrderInput = {
    where: Prisma.LogisticsTrackingWhereUniqueInput;
    update: Prisma.XOR<Prisma.LogisticsTrackingUpdateWithoutOrderInput, Prisma.LogisticsTrackingUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.LogisticsTrackingCreateWithoutOrderInput, Prisma.LogisticsTrackingUncheckedCreateWithoutOrderInput>;
};
export type LogisticsTrackingUpdateWithWhereUniqueWithoutOrderInput = {
    where: Prisma.LogisticsTrackingWhereUniqueInput;
    data: Prisma.XOR<Prisma.LogisticsTrackingUpdateWithoutOrderInput, Prisma.LogisticsTrackingUncheckedUpdateWithoutOrderInput>;
};
export type LogisticsTrackingUpdateManyWithWhereWithoutOrderInput = {
    where: Prisma.LogisticsTrackingScalarWhereInput;
    data: Prisma.XOR<Prisma.LogisticsTrackingUpdateManyMutationInput, Prisma.LogisticsTrackingUncheckedUpdateManyWithoutOrderInput>;
};
export type LogisticsTrackingScalarWhereInput = {
    AND?: Prisma.LogisticsTrackingScalarWhereInput | Prisma.LogisticsTrackingScalarWhereInput[];
    OR?: Prisma.LogisticsTrackingScalarWhereInput[];
    NOT?: Prisma.LogisticsTrackingScalarWhereInput | Prisma.LogisticsTrackingScalarWhereInput[];
    id?: Prisma.IntFilter<"LogisticsTracking"> | number;
    orderId?: Prisma.IntFilter<"LogisticsTracking"> | number;
    trackingNumber?: Prisma.StringFilter<"LogisticsTracking"> | string;
    status?: Prisma.StringFilter<"LogisticsTracking"> | string;
    estimatedDelivery?: Prisma.DateTimeNullableFilter<"LogisticsTracking"> | Date | string | null;
    actualDelivery?: Prisma.DateTimeNullableFilter<"LogisticsTracking"> | Date | string | null;
};
export type LogisticsTrackingCreateManyOrderInput = {
    id?: number;
    trackingNumber: string;
    status: string;
    estimatedDelivery?: Date | string | null;
    actualDelivery?: Date | string | null;
};
export type LogisticsTrackingUpdateWithoutOrderInput = {
    trackingNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    estimatedDelivery?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    actualDelivery?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type LogisticsTrackingUncheckedUpdateWithoutOrderInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    trackingNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    estimatedDelivery?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    actualDelivery?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type LogisticsTrackingUncheckedUpdateManyWithoutOrderInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    trackingNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    estimatedDelivery?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    actualDelivery?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type LogisticsTrackingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    trackingNumber?: boolean;
    status?: boolean;
    estimatedDelivery?: boolean;
    actualDelivery?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["logisticsTracking"]>;
export type LogisticsTrackingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    trackingNumber?: boolean;
    status?: boolean;
    estimatedDelivery?: boolean;
    actualDelivery?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["logisticsTracking"]>;
export type LogisticsTrackingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    trackingNumber?: boolean;
    status?: boolean;
    estimatedDelivery?: boolean;
    actualDelivery?: boolean;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["logisticsTracking"]>;
export type LogisticsTrackingSelectScalar = {
    id?: boolean;
    orderId?: boolean;
    trackingNumber?: boolean;
    status?: boolean;
    estimatedDelivery?: boolean;
    actualDelivery?: boolean;
};
export type LogisticsTrackingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "orderId" | "trackingNumber" | "status" | "estimatedDelivery" | "actualDelivery", ExtArgs["result"]["logisticsTracking"]>;
export type LogisticsTrackingInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type LogisticsTrackingIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type LogisticsTrackingIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type $LogisticsTrackingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "LogisticsTracking";
    objects: {
        order: Prisma.$OrderPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        orderId: number;
        trackingNumber: string;
        status: string;
        estimatedDelivery: Date | null;
        actualDelivery: Date | null;
    }, ExtArgs["result"]["logisticsTracking"]>;
    composites: {};
};
export type LogisticsTrackingGetPayload<S extends boolean | null | undefined | LogisticsTrackingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LogisticsTrackingPayload, S>;
export type LogisticsTrackingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LogisticsTrackingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LogisticsTrackingCountAggregateInputType | true;
};
export interface LogisticsTrackingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['LogisticsTracking'];
        meta: {
            name: 'LogisticsTracking';
        };
    };
    /**
     * Find zero or one LogisticsTracking that matches the filter.
     * @param {LogisticsTrackingFindUniqueArgs} args - Arguments to find a LogisticsTracking
     * @example
     * // Get one LogisticsTracking
     * const logisticsTracking = await prisma.logisticsTracking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LogisticsTrackingFindUniqueArgs>(args: Prisma.SelectSubset<T, LogisticsTrackingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LogisticsTrackingClient<runtime.Types.Result.GetResult<Prisma.$LogisticsTrackingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one LogisticsTracking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LogisticsTrackingFindUniqueOrThrowArgs} args - Arguments to find a LogisticsTracking
     * @example
     * // Get one LogisticsTracking
     * const logisticsTracking = await prisma.logisticsTracking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LogisticsTrackingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LogisticsTrackingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LogisticsTrackingClient<runtime.Types.Result.GetResult<Prisma.$LogisticsTrackingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first LogisticsTracking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogisticsTrackingFindFirstArgs} args - Arguments to find a LogisticsTracking
     * @example
     * // Get one LogisticsTracking
     * const logisticsTracking = await prisma.logisticsTracking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LogisticsTrackingFindFirstArgs>(args?: Prisma.SelectSubset<T, LogisticsTrackingFindFirstArgs<ExtArgs>>): Prisma.Prisma__LogisticsTrackingClient<runtime.Types.Result.GetResult<Prisma.$LogisticsTrackingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first LogisticsTracking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogisticsTrackingFindFirstOrThrowArgs} args - Arguments to find a LogisticsTracking
     * @example
     * // Get one LogisticsTracking
     * const logisticsTracking = await prisma.logisticsTracking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LogisticsTrackingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LogisticsTrackingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LogisticsTrackingClient<runtime.Types.Result.GetResult<Prisma.$LogisticsTrackingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more LogisticsTrackings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogisticsTrackingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LogisticsTrackings
     * const logisticsTrackings = await prisma.logisticsTracking.findMany()
     *
     * // Get first 10 LogisticsTrackings
     * const logisticsTrackings = await prisma.logisticsTracking.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const logisticsTrackingWithIdOnly = await prisma.logisticsTracking.findMany({ select: { id: true } })
     *
     */
    findMany<T extends LogisticsTrackingFindManyArgs>(args?: Prisma.SelectSubset<T, LogisticsTrackingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LogisticsTrackingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a LogisticsTracking.
     * @param {LogisticsTrackingCreateArgs} args - Arguments to create a LogisticsTracking.
     * @example
     * // Create one LogisticsTracking
     * const LogisticsTracking = await prisma.logisticsTracking.create({
     *   data: {
     *     // ... data to create a LogisticsTracking
     *   }
     * })
     *
     */
    create<T extends LogisticsTrackingCreateArgs>(args: Prisma.SelectSubset<T, LogisticsTrackingCreateArgs<ExtArgs>>): Prisma.Prisma__LogisticsTrackingClient<runtime.Types.Result.GetResult<Prisma.$LogisticsTrackingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many LogisticsTrackings.
     * @param {LogisticsTrackingCreateManyArgs} args - Arguments to create many LogisticsTrackings.
     * @example
     * // Create many LogisticsTrackings
     * const logisticsTracking = await prisma.logisticsTracking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends LogisticsTrackingCreateManyArgs>(args?: Prisma.SelectSubset<T, LogisticsTrackingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many LogisticsTrackings and returns the data saved in the database.
     * @param {LogisticsTrackingCreateManyAndReturnArgs} args - Arguments to create many LogisticsTrackings.
     * @example
     * // Create many LogisticsTrackings
     * const logisticsTracking = await prisma.logisticsTracking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many LogisticsTrackings and only return the `id`
     * const logisticsTrackingWithIdOnly = await prisma.logisticsTracking.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends LogisticsTrackingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LogisticsTrackingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LogisticsTrackingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a LogisticsTracking.
     * @param {LogisticsTrackingDeleteArgs} args - Arguments to delete one LogisticsTracking.
     * @example
     * // Delete one LogisticsTracking
     * const LogisticsTracking = await prisma.logisticsTracking.delete({
     *   where: {
     *     // ... filter to delete one LogisticsTracking
     *   }
     * })
     *
     */
    delete<T extends LogisticsTrackingDeleteArgs>(args: Prisma.SelectSubset<T, LogisticsTrackingDeleteArgs<ExtArgs>>): Prisma.Prisma__LogisticsTrackingClient<runtime.Types.Result.GetResult<Prisma.$LogisticsTrackingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one LogisticsTracking.
     * @param {LogisticsTrackingUpdateArgs} args - Arguments to update one LogisticsTracking.
     * @example
     * // Update one LogisticsTracking
     * const logisticsTracking = await prisma.logisticsTracking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends LogisticsTrackingUpdateArgs>(args: Prisma.SelectSubset<T, LogisticsTrackingUpdateArgs<ExtArgs>>): Prisma.Prisma__LogisticsTrackingClient<runtime.Types.Result.GetResult<Prisma.$LogisticsTrackingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more LogisticsTrackings.
     * @param {LogisticsTrackingDeleteManyArgs} args - Arguments to filter LogisticsTrackings to delete.
     * @example
     * // Delete a few LogisticsTrackings
     * const { count } = await prisma.logisticsTracking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends LogisticsTrackingDeleteManyArgs>(args?: Prisma.SelectSubset<T, LogisticsTrackingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more LogisticsTrackings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogisticsTrackingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LogisticsTrackings
     * const logisticsTracking = await prisma.logisticsTracking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends LogisticsTrackingUpdateManyArgs>(args: Prisma.SelectSubset<T, LogisticsTrackingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more LogisticsTrackings and returns the data updated in the database.
     * @param {LogisticsTrackingUpdateManyAndReturnArgs} args - Arguments to update many LogisticsTrackings.
     * @example
     * // Update many LogisticsTrackings
     * const logisticsTracking = await prisma.logisticsTracking.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more LogisticsTrackings and only return the `id`
     * const logisticsTrackingWithIdOnly = await prisma.logisticsTracking.updateManyAndReturn({
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
    updateManyAndReturn<T extends LogisticsTrackingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LogisticsTrackingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LogisticsTrackingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one LogisticsTracking.
     * @param {LogisticsTrackingUpsertArgs} args - Arguments to update or create a LogisticsTracking.
     * @example
     * // Update or create a LogisticsTracking
     * const logisticsTracking = await prisma.logisticsTracking.upsert({
     *   create: {
     *     // ... data to create a LogisticsTracking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LogisticsTracking we want to update
     *   }
     * })
     */
    upsert<T extends LogisticsTrackingUpsertArgs>(args: Prisma.SelectSubset<T, LogisticsTrackingUpsertArgs<ExtArgs>>): Prisma.Prisma__LogisticsTrackingClient<runtime.Types.Result.GetResult<Prisma.$LogisticsTrackingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of LogisticsTrackings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogisticsTrackingCountArgs} args - Arguments to filter LogisticsTrackings to count.
     * @example
     * // Count the number of LogisticsTrackings
     * const count = await prisma.logisticsTracking.count({
     *   where: {
     *     // ... the filter for the LogisticsTrackings we want to count
     *   }
     * })
    **/
    count<T extends LogisticsTrackingCountArgs>(args?: Prisma.Subset<T, LogisticsTrackingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LogisticsTrackingCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a LogisticsTracking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogisticsTrackingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LogisticsTrackingAggregateArgs>(args: Prisma.Subset<T, LogisticsTrackingAggregateArgs>): Prisma.PrismaPromise<GetLogisticsTrackingAggregateType<T>>;
    /**
     * Group by LogisticsTracking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogisticsTrackingGroupByArgs} args - Group by arguments.
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
    groupBy<T extends LogisticsTrackingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LogisticsTrackingGroupByArgs['orderBy'];
    } : {
        orderBy?: LogisticsTrackingGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LogisticsTrackingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLogisticsTrackingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the LogisticsTracking model
     */
    readonly fields: LogisticsTrackingFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for LogisticsTracking.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__LogisticsTrackingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    order<T extends Prisma.OrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDefaultArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the LogisticsTracking model
 */
export interface LogisticsTrackingFieldRefs {
    readonly id: Prisma.FieldRef<"LogisticsTracking", 'Int'>;
    readonly orderId: Prisma.FieldRef<"LogisticsTracking", 'Int'>;
    readonly trackingNumber: Prisma.FieldRef<"LogisticsTracking", 'String'>;
    readonly status: Prisma.FieldRef<"LogisticsTracking", 'String'>;
    readonly estimatedDelivery: Prisma.FieldRef<"LogisticsTracking", 'DateTime'>;
    readonly actualDelivery: Prisma.FieldRef<"LogisticsTracking", 'DateTime'>;
}
/**
 * LogisticsTracking findUnique
 */
export type LogisticsTrackingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogisticsTracking
     */
    select?: Prisma.LogisticsTrackingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LogisticsTracking
     */
    omit?: Prisma.LogisticsTrackingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LogisticsTrackingInclude<ExtArgs> | null;
    /**
     * Filter, which LogisticsTracking to fetch.
     */
    where: Prisma.LogisticsTrackingWhereUniqueInput;
};
/**
 * LogisticsTracking findUniqueOrThrow
 */
export type LogisticsTrackingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogisticsTracking
     */
    select?: Prisma.LogisticsTrackingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LogisticsTracking
     */
    omit?: Prisma.LogisticsTrackingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LogisticsTrackingInclude<ExtArgs> | null;
    /**
     * Filter, which LogisticsTracking to fetch.
     */
    where: Prisma.LogisticsTrackingWhereUniqueInput;
};
/**
 * LogisticsTracking findFirst
 */
export type LogisticsTrackingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogisticsTracking
     */
    select?: Prisma.LogisticsTrackingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LogisticsTracking
     */
    omit?: Prisma.LogisticsTrackingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LogisticsTrackingInclude<ExtArgs> | null;
    /**
     * Filter, which LogisticsTracking to fetch.
     */
    where?: Prisma.LogisticsTrackingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of LogisticsTrackings to fetch.
     */
    orderBy?: Prisma.LogisticsTrackingOrderByWithRelationInput | Prisma.LogisticsTrackingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for LogisticsTrackings.
     */
    cursor?: Prisma.LogisticsTrackingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` LogisticsTrackings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` LogisticsTrackings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of LogisticsTrackings.
     */
    distinct?: Prisma.LogisticsTrackingScalarFieldEnum | Prisma.LogisticsTrackingScalarFieldEnum[];
};
/**
 * LogisticsTracking findFirstOrThrow
 */
export type LogisticsTrackingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogisticsTracking
     */
    select?: Prisma.LogisticsTrackingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LogisticsTracking
     */
    omit?: Prisma.LogisticsTrackingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LogisticsTrackingInclude<ExtArgs> | null;
    /**
     * Filter, which LogisticsTracking to fetch.
     */
    where?: Prisma.LogisticsTrackingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of LogisticsTrackings to fetch.
     */
    orderBy?: Prisma.LogisticsTrackingOrderByWithRelationInput | Prisma.LogisticsTrackingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for LogisticsTrackings.
     */
    cursor?: Prisma.LogisticsTrackingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` LogisticsTrackings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` LogisticsTrackings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of LogisticsTrackings.
     */
    distinct?: Prisma.LogisticsTrackingScalarFieldEnum | Prisma.LogisticsTrackingScalarFieldEnum[];
};
/**
 * LogisticsTracking findMany
 */
export type LogisticsTrackingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogisticsTracking
     */
    select?: Prisma.LogisticsTrackingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LogisticsTracking
     */
    omit?: Prisma.LogisticsTrackingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LogisticsTrackingInclude<ExtArgs> | null;
    /**
     * Filter, which LogisticsTrackings to fetch.
     */
    where?: Prisma.LogisticsTrackingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of LogisticsTrackings to fetch.
     */
    orderBy?: Prisma.LogisticsTrackingOrderByWithRelationInput | Prisma.LogisticsTrackingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing LogisticsTrackings.
     */
    cursor?: Prisma.LogisticsTrackingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` LogisticsTrackings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` LogisticsTrackings.
     */
    skip?: number;
    distinct?: Prisma.LogisticsTrackingScalarFieldEnum | Prisma.LogisticsTrackingScalarFieldEnum[];
};
/**
 * LogisticsTracking create
 */
export type LogisticsTrackingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogisticsTracking
     */
    select?: Prisma.LogisticsTrackingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LogisticsTracking
     */
    omit?: Prisma.LogisticsTrackingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LogisticsTrackingInclude<ExtArgs> | null;
    /**
     * The data needed to create a LogisticsTracking.
     */
    data: Prisma.XOR<Prisma.LogisticsTrackingCreateInput, Prisma.LogisticsTrackingUncheckedCreateInput>;
};
/**
 * LogisticsTracking createMany
 */
export type LogisticsTrackingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many LogisticsTrackings.
     */
    data: Prisma.LogisticsTrackingCreateManyInput | Prisma.LogisticsTrackingCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * LogisticsTracking createManyAndReturn
 */
export type LogisticsTrackingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogisticsTracking
     */
    select?: Prisma.LogisticsTrackingSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the LogisticsTracking
     */
    omit?: Prisma.LogisticsTrackingOmit<ExtArgs> | null;
    /**
     * The data used to create many LogisticsTrackings.
     */
    data: Prisma.LogisticsTrackingCreateManyInput | Prisma.LogisticsTrackingCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LogisticsTrackingIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * LogisticsTracking update
 */
export type LogisticsTrackingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogisticsTracking
     */
    select?: Prisma.LogisticsTrackingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LogisticsTracking
     */
    omit?: Prisma.LogisticsTrackingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LogisticsTrackingInclude<ExtArgs> | null;
    /**
     * The data needed to update a LogisticsTracking.
     */
    data: Prisma.XOR<Prisma.LogisticsTrackingUpdateInput, Prisma.LogisticsTrackingUncheckedUpdateInput>;
    /**
     * Choose, which LogisticsTracking to update.
     */
    where: Prisma.LogisticsTrackingWhereUniqueInput;
};
/**
 * LogisticsTracking updateMany
 */
export type LogisticsTrackingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update LogisticsTrackings.
     */
    data: Prisma.XOR<Prisma.LogisticsTrackingUpdateManyMutationInput, Prisma.LogisticsTrackingUncheckedUpdateManyInput>;
    /**
     * Filter which LogisticsTrackings to update
     */
    where?: Prisma.LogisticsTrackingWhereInput;
    /**
     * Limit how many LogisticsTrackings to update.
     */
    limit?: number;
};
/**
 * LogisticsTracking updateManyAndReturn
 */
export type LogisticsTrackingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogisticsTracking
     */
    select?: Prisma.LogisticsTrackingSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the LogisticsTracking
     */
    omit?: Prisma.LogisticsTrackingOmit<ExtArgs> | null;
    /**
     * The data used to update LogisticsTrackings.
     */
    data: Prisma.XOR<Prisma.LogisticsTrackingUpdateManyMutationInput, Prisma.LogisticsTrackingUncheckedUpdateManyInput>;
    /**
     * Filter which LogisticsTrackings to update
     */
    where?: Prisma.LogisticsTrackingWhereInput;
    /**
     * Limit how many LogisticsTrackings to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LogisticsTrackingIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * LogisticsTracking upsert
 */
export type LogisticsTrackingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogisticsTracking
     */
    select?: Prisma.LogisticsTrackingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LogisticsTracking
     */
    omit?: Prisma.LogisticsTrackingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LogisticsTrackingInclude<ExtArgs> | null;
    /**
     * The filter to search for the LogisticsTracking to update in case it exists.
     */
    where: Prisma.LogisticsTrackingWhereUniqueInput;
    /**
     * In case the LogisticsTracking found by the `where` argument doesn't exist, create a new LogisticsTracking with this data.
     */
    create: Prisma.XOR<Prisma.LogisticsTrackingCreateInput, Prisma.LogisticsTrackingUncheckedCreateInput>;
    /**
     * In case the LogisticsTracking was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.LogisticsTrackingUpdateInput, Prisma.LogisticsTrackingUncheckedUpdateInput>;
};
/**
 * LogisticsTracking delete
 */
export type LogisticsTrackingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogisticsTracking
     */
    select?: Prisma.LogisticsTrackingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LogisticsTracking
     */
    omit?: Prisma.LogisticsTrackingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LogisticsTrackingInclude<ExtArgs> | null;
    /**
     * Filter which LogisticsTracking to delete.
     */
    where: Prisma.LogisticsTrackingWhereUniqueInput;
};
/**
 * LogisticsTracking deleteMany
 */
export type LogisticsTrackingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which LogisticsTrackings to delete
     */
    where?: Prisma.LogisticsTrackingWhereInput;
    /**
     * Limit how many LogisticsTrackings to delete.
     */
    limit?: number;
};
/**
 * LogisticsTracking without action
 */
export type LogisticsTrackingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LogisticsTracking
     */
    select?: Prisma.LogisticsTrackingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LogisticsTracking
     */
    omit?: Prisma.LogisticsTrackingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LogisticsTrackingInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=LogisticsTracking.d.ts.map