import { View, FlatList } from "react-native";
import { s } from "./DailyWeatherListStyles";
import { useWeatherQueryParams } from "../../features/weather/model/consts/useWeatherQueryParams";
import { useGetWeatherQuery } from "../../features/weather/model/weatherApiSlice";
import { dailyWeatherToArrayOfObjects } from "../../shared/lib/dailyWeatherToArrayOfObjects";
import { DailyWeatherCard } from "../../entities/dailyWeather/ui/DailyWeatherCard/DailyWeatherCard";
import { skipToken } from "@reduxjs/toolkit/query";

export const DailyWeatherList = () => {
    const queryParams = useWeatherQueryParams();

    const { data, isLoading, isFetching, isSuccess } = useGetWeatherQuery(
        queryParams,
        {
            refetchOnFocus: true,
            refetchOnReconnect: true,
        },
    );

    const dailyWeather = dailyWeatherToArrayOfObjects(
        data ? data?.hourly : undefined,
    );

    if (isLoading || isFetching) {
        return (
            <View style={s.container}>
                <FlatList
                    data={Array.from({ length: 14 }, (_, i) => String(i + 1))}
                    renderItem={() => <DailyWeatherCard isLoading />}
                    keyExtractor={(item) => item}
                    contentContainerStyle={s.dailyWeatherListContent}
                />
            </View>
        );
    }

    if (!data || !isSuccess || queryParams === skipToken) {
        return null;
    }

    return (
        <View style={s.container}>
            <FlatList
                data={dailyWeather}
                renderItem={({ item }) => (
                    <DailyWeatherCard dailySummary={item} />
                )}
                keyExtractor={(item) => item.time + item.temperature_2m_max}
                contentContainerStyle={s.dailyWeatherListContent}
            />
        </View>
    );
};
