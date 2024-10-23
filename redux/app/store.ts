import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //
import { apiService } from "../services/apiService/emptyApiSplit";
import { checkFulfilledsReducer } from "../features/checkFulfilledsSlice/checkFulfilledsSlice";
import { checkoutDetialsReducder } from "../features/checkoutDetialsSlice/checkoutDetialsSlice";
import { storeSettingsReducer } from "../features/storeSettingsSlice/storeSettingsSlice";
import { companyDataReducer } from "../features/companyDataSlice/companyDataSlice";

const rootReducer = combineReducers({
    storeSettingsSlice: storeSettingsReducer,
    checkFulfilledsSlice: checkFulfilledsReducer,
    checkoutDetialsSlice: checkoutDetialsReducder,
    companyDataSlice:companyDataReducer,
    [apiService.reducerPath]: apiService.reducer,
});

const persistConfig = {
    key: "client",
    storage,
    version: 1,
    whitelist: ["checkoutDetialsSlice"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(apiService.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
