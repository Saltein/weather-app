import { View, FlatList } from "react-native";
import { DefaultText } from "../../shared";
import { s } from "./DailyWeatherListStyles";
import { useWeatherQueryParams } from "../../features/weather/model/consts/useWeatherQueryParams";
import { useGetWeatherQuery } from "../../features/weather/model/weatherApiSlice";
import { dailyWeatherToArrayOfObjects } from "../../shared/lib/dailyWeatherToArrayOfObjects";
import { DailyWeatherCard } from "../../entities/dailyWeather/ui/DailyWeatherCard/DailyWeatherCard";

export const DailyWeatherList = () => {
    const queryParams = useWeatherQueryParams();

    const { data, isLoading, isFetching, error, isError } = useGetWeatherQuery(
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
        <View style={s.container}>
            <FlatList
                data={Array.from({ length: 14 }, (_, i) => String(i + 1))}
                renderItem={({ item }) => <DailyWeatherCard isLoading />}
                keyExtractor={(item) => item}
                contentContainerStyle={s.dailyWeatherListContent}
            />
        </View>;
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
