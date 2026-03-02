import { useMemo } from "react";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";
import { selectSelectedCity } from "../../../../entities/city/model/slice";

export const useWeatherQueryParams = () => {
    const city = useSelector(selectSelectedCity);

    return useMemo(() => {
        if (!city?.coords?.lat || !city?.coords?.lon) {
            return skipToken;
        }

        const lat = Number(city.coords.lat);
        const lon = Number(city.coords.lon);

        if (Number.isNaN(lat) || Number.isNaN(lon)) {
            return skipToken;
        }

        return {
            latitude: lat,
            longitude: lon,
            timezone: "auto",
            daily: [
                "temperature_2m_max",
                "temperature_2m_min",
                "weather_code",
                "sunrise",
                "sunset",
            ],
            hourly: [
                "temperature_2m",
                "relative_humidity_2m",
                "weather_code",
                "wind_speed_10m",
            ],
            current: [
                "temperature_2m",
                "relative_humidity_2m",
                "weather_code",
                "wind_speed_10m",
            ],
            forecast_days: 14,
        };
    }, [city]);
};
