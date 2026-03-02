import { WeatherResponse } from "../../features/weather/model/types";

export type HourlyWeather = {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
};

export function hourlyWeatherToArrayOfObjects(
    data: WeatherResponse | undefined,
): HourlyWeather[] {
    if (!data) {
        return [];
    }
    return data.hourly?.time.map((time, i) => ({
        time,
        temperature_2m: data.hourly?.temperature_2m[i],
        relative_humidity_2m: data.hourly?.relative_humidity_2m[i],
        weather_code: data.hourly?.weather_code[i],
        wind_speed_10m: data.hourly?.wind_speed_10m[i],
    }));
}
