import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../../app/hooks";
import { ICompanyRES } from "../../../@types/Company/CompanyRES";
import { companyApiService } from "../../services/companyApiService/companyApiService";

const initialState: ICompanyRES = {} as ICompanyRES;

const companyDataSlice = createSlice({
    name: "companyDataSlice",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(companyApiService.endpoints.getCompanyData.matchFulfilled, (state, { payload }) => {
            state.data = payload.data
        });
    },
});

// export const {} = companyDataSlice.actions
export const useCompanyDataSlice = ()=> useAppSelector((state)=> state.companyDataSlice.data)

export const companyDataReducer = companyDataSlice.reducer;
