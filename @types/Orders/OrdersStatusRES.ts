export interface IOrdersStatusRES {
    data: {
        newOrders: number;
        callingsProcess: number;
        cancledOrders: number;
        inDelivery: number;
        abandoned: number;
        completed: number;
        confirmed: number;
        delayed: number;
        notRecived: number;
        preparing: number;
        unCompletedOrders: number;
    };
}
