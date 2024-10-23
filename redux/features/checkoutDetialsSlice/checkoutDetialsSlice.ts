import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../../app/hooks";
import { IOrderRES } from "../../../@types/Orders/OrderRES";
import { IOrderDto } from "../../../@types/Orders/OrderDto";

const initialState: { data: IOrderRES | undefined; cartOrderDto: IOrderDto } = { data: undefined, cartOrderDto: {} as IOrderDto };

const checkoutDetialsSlice = createSlice({
    name: "checkoutDetialsSlice",
    initialState,
    reducers: {
        setCheckoutDetialsData: (state, { payload }) => {
            state.data = payload.data;
        },
        setOrderDtoDetails: (state, { payload }) => {
            state.cartOrderDto = payload;
        },
    },

});

export const { setCheckoutDetialsData,setOrderDtoDetails } = checkoutDetialsSlice.actions;
export const useCheckOutDetialsSlice = () => useAppSelector((state) => state.checkoutDetialsSlice);

export const checkoutDetialsReducder = checkoutDetialsSlice.reducer;
