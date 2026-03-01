export interface WeatherParams {
    latitude: number; // Широта (e.g., 55.7558 для Москвы)
    longitude: number; // Долгота (e.g., 37.6173 для Москвы)
    current?: string[]; // Текущая погода (true/false)
    hourly?: string[]; // Почасовые данные, e.g., ['temperature_2m', 'relative_humidity_2m']
    daily?: string[]; // Суточные данные, e.g., ['temperature_2m_max', 'temperature_2m_min']
    timezone?: string; // e.g., 'Europe/Moscow'
    forecast_days?: number; // Кол-во дней прогноза (default: 7)
}

export interface WeatherResponse {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units?: {
        time: string;
        interval: string;
        temperature_2m: string;
        relative_humidity_2m: string;
        weather_code: string;
        wind_speed_10m: string;
    };
    current?: {
        time: string;
        interval: number;
        temperature_2m: number;
        relative_humidity_2m: number;
        weather_code: number;
        wind_speed_10m: number;
    };
    hourly?: {
        time: string[];
        temperature_2m?: number[];
        // ... другие массивы
    };
    daily?: {
        time: string[];
        temperature_2m_max?: number[];
        temperature_2m_min?: number[];
        // ... другие
    };
    // Полный тип можно расширить по документации Open-Meteo
}
