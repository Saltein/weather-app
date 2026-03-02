import { View } from "react-native";
import { s } from "./DailyWeatherCardStyles";
import { DailySummary } from "../../../../shared/lib/dailyWeatherToArrayOfObjects";
import { DefaultText } from "../../../../shared";
import { formatDateTime } from "../../../../shared/lib/formatDateTime";
import { weatherIcons } from "../../../../widgets/Weather/consts/weatherCodes";

interface DailyWeatherCardProps {
    dailySummary: DailySummary;
}

export const DailyWeatherCard = ({ dailySummary }: DailyWeatherCardProps) => {
    const {
        time,
        weather_code,
        temperature_2m_min,
        temperature_2m_max,
        wind_speed_10m,
        relative_humidity_2m,
    } = dailySummary;

    const date = formatDateTime(time)[0];

    const Icon =
        weather_code !== undefined ? weatherIcons[weather_code] : undefined;

    return (
        <View style={s.container}>
            <View style={s.time}>
                <DefaultText>{date}</DefaultText>
            </View>
            <View style={s.weatherCode}>
                {Icon ? (
                    <Icon width={32} height={32} />
                ) : (
                    <DefaultText>?</DefaultText> // заменить на компонент заглушку
                )}
            </View>
            <View style={s.tempMin}>
                <DefaultText style={s.dark}>{temperature_2m_min}°</DefaultText>
            </View>
            <View style={s.tempMax}>
                <DefaultText>{temperature_2m_max}°</DefaultText>
            </View>
            <View style={s.wind}>
                <DefaultText style={s.dark}>
                    {Math.round((wind_speed_10m * 10) / 3.6) / 10} м/с
                </DefaultText>
            </View>
            <View style={s.humidity}>
                <DefaultText>{relative_humidity_2m}%</DefaultText>
            </View>
        </View>
    );
};
