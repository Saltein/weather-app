import { SvgProps } from "react-native-svg";

import ClearDay from "../../../shared/icons/weather/clear-day.svg";
import MainlyClear from "../../../shared/icons/weather/partly-cloudy.svg";
import Cloudy from "../../../shared/icons/weather/cloudy.svg";
import Fog from "../../../shared/icons/weather/fog.svg";
import Sleet from "../../../shared/icons/weather/sleet.svg";
import LightRain from "../../../shared/icons/weather/light-rain.svg";
import ExtremeRain from "../../../shared/icons/weather/rain.svg";
import Snow from "../../../shared/icons/weather/snowing-snow.svg";
import Shower from "../../../shared/icons/weather/shower.svg";
import Thunderstorm from "../../../shared/icons/weather/thunderstorm.svg";

export const weatherCodes: Record<number, string> = {
    0: "Ясное небо",
    1: "Преимущественно ясно",
    2: "Переменная облачность",
    3: "Пасмурно",
    45: "Туман",
    48: "Туман с инеем",
    51: "Легкая морось",
    53: "Умеренная морось",
    55: "Сильная морось",
    56: "Слабая ледяная морось",
    57: "Сильная ледяная морось",
    61: "Легкий дождь",
    63: "Умеренный дождь",
    65: "Сильный дождь",

    66: "Слабый ледяной дождь",
    67: "Сильный ледяной дождь",

    71: "Легкий снег",
    73: "Умеренный снег",
    75: "Сильный снег",

    77: "Снежная крупа",

    80: "Легкий ливень",
    81: "Умеренный ливень",
    82: "Сильный ливень",

    85: "Снегопад",
    86: "Сильный снегопад",

    95: "Гроза",
    96: "Гроза с градом",
    99: "Гроза с сильным градом",
};

export const weatherIcons: Record<number, React.FC<SvgProps>> = {
    0: ClearDay,
    1: MainlyClear,
    2: MainlyClear,
    3: Cloudy,
    45: Fog,
    48: Fog,
    51: LightRain,
    53: LightRain,
    55: LightRain,
    56: Sleet,
    57: Sleet,
    61: LightRain,
    63: LightRain,
    65: ExtremeRain,
    66: Sleet,
    67: Sleet,
    71: Snow,
    73: Snow,
    75: Snow,
    77: Snow,
    80: Shower,
    81: Shower,
    82: Shower,
    85: Snow,
    86: Snow,
    95: Thunderstorm,
    96: Thunderstorm,
    99: Thunderstorm,
};
