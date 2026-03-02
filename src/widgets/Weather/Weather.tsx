import { FlatList, View } from "react-native";
import { DefaultText } from "../../shared";
import { useGetWeatherQuery } from "../../features/weather/model/weatherApiSlice";
import { selectSelectedCity } from "../../entities/city/model/slice";
import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { s } from "./WeatherStyles";
import { weatherCodes, weatherIcons } from "./consts/weatherCodes";
import { hourlyWeatherToArrayOfObjects } from "../../shared/lib/hourlyWeatherToArrayOfObjects";
import { HourWeatherCard } from "../../entities/hourWeather/ui/HourWeatherCard/HourWeatherCard";

export const Weather = () => {
    const city = useSelector(selectSelectedCity);

    const queryParams = useMemo(() => {
        if (!city?.coords?.lat || !city?.coords?.lon) {
            return skipToken;
        }

        return {
            latitude: parseFloat(city.coords.lat),
            longitude: parseFloat(city.coords.lon),
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
            forecast_days: 7,
        };
    }, [city]);

    const { data, isLoading, isFetching, error, isError } = useGetWeatherQuery(
        queryParams,
        {
            refetchOnMountOrArgChange: true,
            refetchOnFocus: true,
            refetchOnReconnect: true,
        },
    );

    useEffect(() => {
        console.log("data", data);
    }, [data]);

    if (queryParams === skipToken) {
        // нет координат для запроса погоды
        return (
            <View style={s.container}>
                <DefaultText>Город не выбран</DefaultText>
            </View>
        );
    }

    if (isLoading || isFetching) {
        // при загрузке данных
        return (
            <View style={s.container}>
                <DefaultText style={{ marginTop: 12 }}>
                    Загрузка погоды...
                </DefaultText>
            </View>
        );
    }

    if (isError) {
        // при ошибке запроса
        return (
            <View style={s.container}>
                <DefaultText style={{ color: "red", textAlign: "center" }}>
                    Ошибка: {JSON.stringify(error)}
                </DefaultText>
            </View>
        );
    }

    const currentTemp = data?.current?.temperature_2m;
    const maxToday = data?.daily?.temperature_2m_max?.[0];
    const minToday = data?.daily?.temperature_2m_min?.[0];

    const weatherCode = data?.current?.weather_code;
    const weatherDescription = weatherCodes[weatherCode ? weatherCode : 0];

    const windSpeed = data?.current?.wind_speed_10m
        ? Math.round((data.current.wind_speed_10m * 10) / 3.6) / 10
        : undefined;
    const humidity = data?.current?.relative_humidity_2m;

    const Icon =
        weatherCode !== undefined ? weatherIcons[weatherCode] : undefined;

    let hours = 0;
    if (data?.current?.time) {
        const now = new Date(data.current.time);
        hours = now.getHours();
    }
    const hourlyWeather = hourlyWeatherToArrayOfObjects(
        data ? data : undefined,
    ).slice(hours);

    return (
        <View style={s.container}>
            <View style={s.mainInfo}>
                {currentTemp !== undefined && (
                    <View style={s.temperature}>
                        <DefaultText style={s.currentTemp}>
                            {`${currentTemp}°`}
                        </DefaultText>

                        <DefaultText style={s.minMaxTemp}>
                            От {maxToday ?? "—"}° до {minToday ?? "—"}°
                        </DefaultText>
                    </View>
                )}
                {Icon ? (
                    <View style={s.weatherCode}>
                        <Icon width={80} height={80} />
                        <DefaultText
                            style={s.weatherDescription}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            textBreakStrategy="simple"
                        >
                            {weatherDescription ?? "Неизвестная погода"}
                        </DefaultText>
                    </View>
                ) : (
                    <DefaultText>?</DefaultText> // заменить на компонент заглушку
                )}
            </View>

            <View style={s.windAndHumidity}>
                <DefaultText>Ветер: {windSpeed ?? "—"} м/с</DefaultText>
                <DefaultText>Влажность: {humidity ?? "—"}%</DefaultText>
            </View>
            <FlatList
                data={hourlyWeather}
                renderItem={({ item }) => (
                    <HourWeatherCard hourlyWeather={item} />
                )}
                keyExtractor={(item) => item.time + item.temperature_2m}
                horizontal
                contentContainerStyle={s.hourlyWeatherListContent}
            />
        </View>
    );
};
