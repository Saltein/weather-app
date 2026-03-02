import { View } from "react-native";
import { s } from "./HourWeatherCardStyles";
import { weatherIcons } from "../../../../widgets/Weather/consts/weatherCodes";
import { DefaultText } from "../../../../shared";
import { HourlyWeather } from "../../../../shared/lib/hourlyWeatherToArrayOfObjects";
import { formatDateTime } from "../../../../shared/lib/formatDateTime";

interface HourWeatherCardProps {
    hourlyWeather: HourlyWeather;
}

export const HourWeatherCard = ({ hourlyWeather }: HourWeatherCardProps) => {
    const {
        time,
        weather_code,
        relative_humidity_2m,
        temperature_2m,
        wind_speed_10m,
    } = hourlyWeather;

    const Icon =
        weather_code !== undefined ? weatherIcons[weather_code] : undefined;

    const [day, timeNew] = formatDateTime(time);

    return (
        <View style={s.container}>
            <View style={s.mainInfo}>
                {Icon ? (
                    <Icon width={32} height={32} />
                ) : (
                    <DefaultText>?</DefaultText> // заменить на компонент заглушку
                )}
                <DefaultText style={s.temp}>
                    {Math.round(temperature_2m)}°
                </DefaultText>
            </View>
            <DefaultText
                style={s.windHumidity}
            >{`${Math.round((wind_speed_10m * 10) / 3.6) / 10} м/с ${relative_humidity_2m}%`}</DefaultText>
            <View style={s.dateTimeContainer}>
                <DefaultText style={s.time}>{timeNew}</DefaultText>
            </View>
        </View>
    );
};
