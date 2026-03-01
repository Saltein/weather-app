import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WeatherParams, WeatherResponse } from "./types";

export const weatherApi = createApi({
    reducerPath: "weatherApi", // Ключ в store
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.open-meteo.com/v1/",
    }),
    endpoints: (builder) => ({
        getWeather: builder.query<WeatherResponse, WeatherParams>({
            query: (params) => ({
                url: "forecast",
                params: {
                    latitude: params.latitude,
                    longitude: params.longitude,
                    current: params.current?.join(","),
                    hourly: params.hourly?.join(","),
                    daily: params.daily?.join(","),
                    timezone: params.timezone,
                    forecast_days: params.forecast_days,
                },
            }),
        }),
    }),
});

export const { useGetWeatherQuery } = weatherApi;

export const weatherReducer = weatherApi.reducer;
export const weatherMiddleware = weatherApi.middleware;
