import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../../app/hooks";
import { categoriesApiService } from "../../services/categoriesApiService/categoriesApiService";
import { productsApiService } from "../../services/productsApiService/productsApiService";

const initialState = {
    isCategoriesFulfilled: false,
    isOffersFulfilled: false,
};

const checkFulfilleds = createSlice({
    name: "checkFulfilleds",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(categoriesApiService.endpoints.getAllCategories.matchFulfilled, (state) => {
            state.isCategoriesFulfilled = true;
        });
        builder.addMatcher(productsApiService.endpoints.getAllProductsOffers.matchFulfilled, (state) => {
            state.isOffersFulfilled = true;
        });
    },
});

// export const {} = checkFulfilleds.actions
export const useCheckFulfilledsSlice = () => useAppSelector((state) => state.checkFulfilledsSlice);

export const checkFulfilledsReducer = checkFulfilleds.reducer;
