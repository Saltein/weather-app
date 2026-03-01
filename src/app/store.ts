import { cityReducer } from "./../entities/city/model/slice";
import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "../features/weather/model/weatherApiSlice";

export const store = configureStore({
    reducer: {
        city: cityReducer,
        [weatherApi.reducerPath]: weatherApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(weatherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
