import { createSlice } from "@reduxjs/toolkit";
import { storeSettingsApiService } from "../../services/storeSettingsApiService/storeSettingsApiService";
import { useAppSelector } from "../../app/hooks";
import { IOneStoreSettingsRES } from "../../../@types/StoreSettings/OneStoreSettingsRES";

const initialState: IOneStoreSettingsRES = {} as IOneStoreSettingsRES;

const storeSettingsSlice = createSlice({
    name: "storeSettingsSlice",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(storeSettingsApiService.endpoints.getStoreSettings.matchFulfilled, (state, { payload }) => {
            state.data = payload.data
        });
    },
});

// export const {} = storeSettingsSlice.actions
export const useStoreSettingsSlice = ()=> useAppSelector((state)=> state.storeSettingsSlice.data)

export const storeSettingsReducer = storeSettingsSlice.reducer;
