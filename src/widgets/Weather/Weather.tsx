import { FlatList, View } from "react-native";
import { DefaultText, Skeleton } from "../../shared";
import { useGetWeatherQuery } from "../../features/weather/model/weatherApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { s } from "./WeatherStyles";
import { weatherCodes, weatherIcons } from "./consts/weatherCodes";
import { hourlyWeatherToArrayOfObjects } from "../../shared/lib/hourlyWeatherToArrayOfObjects";
import { HourWeatherCard } from "../../entities/hourWeather/ui/HourWeatherCard/HourWeatherCard";
import { useWeatherQueryParams } from "../../features/weather/model/consts/useWeatherQueryParams";

export const Weather = () => {
    const queryParams = useWeatherQueryParams();

    const { data, isLoading, isFetching, error, isError } = useGetWeatherQuery(
        queryParams,
        {
            refetchOnFocus: true,
            refetchOnReconnect: true,
        },
    );

    if (queryParams === skipToken) {
        // нет координат для запроса погоды
        return (
            <View style={s.container}>
                <DefaultText style={{ fontSize: 24 }}>
                    Выберите город
                </DefaultText>
            </View>
        );
    }

    if (isLoading || isFetching) {
        // при загрузке данных
        return (
            <View style={s.container}>
                <Skeleton style={s.mainInfo} />
                <Skeleton
                    style={[s.windAndHumidity, { height: 35, width: 220 }]}
                />
                <FlatList
                    data={Array.from({ length: 24 }, (_, i) => String(i + 1))}
                    renderItem={({ item }) => <HourWeatherCard isLoading />}
                    keyExtractor={(item) => item}
                    horizontal
                    contentContainerStyle={s.hourlyWeatherListContent}
                />
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
    ).slice(hours, hours + 24);

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
