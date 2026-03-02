interface HourlyWeather {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    weather_code: number[];
    wind_speed_10m: number[];
}

export interface DailySummary {
    time: string;
    temperature_2m_max: number;
    temperature_2m_min: number;
    weather_code: number;
    wind_speed_10m: number;
    relative_humidity_2m: number;
}

export function dailyWeatherToArrayOfObjects(
    hourly: HourlyWeather | undefined,
): DailySummary[] {
    if (!hourly) return [];

    const map = new Map<
        string,
        {
            temps: number[];
            humidities: number[];
            winds: number[];
            codes: number[];
        }
    >();

    hourly.time.forEach((t, i) => {
        const date = t.split("T")[0];
        if (!map.has(date)) {
            map.set(date, { temps: [], humidities: [], winds: [], codes: [] });
        }
        const day = map.get(date)!;
        day.temps.push(hourly.temperature_2m[i]);
        day.humidities.push(hourly.relative_humidity_2m[i]);
        day.winds.push(hourly.wind_speed_10m[i]);
        day.codes.push(hourly.weather_code[i]);
    });

    return Array.from(map.entries())
        .map(([date, data]) => {
            const avgHumidity =
                data.humidities.reduce((a, b) => a + b, 0) /
                data.humidities.length;
            const avgWind =
                data.winds.reduce((a, b) => a + b, 0) / data.winds.length;

            const codeCount = new Map<number, number>();
            data.codes.forEach((c) =>
                codeCount.set(c, (codeCount.get(c) || 0) + 1),
            );
            const mostCommonCode = [...codeCount.entries()].reduce((a, b) =>
                b[1] > a[1] ? b : a,
            )[0];

            return {
                time: date,
                temperature_2m_max: Math.max(...data.temps),
                temperature_2m_min: Math.min(...data.temps),
                weather_code: mostCommonCode,
                wind_speed_10m: Math.round(avgWind * 10) / 10,
                relative_humidity_2m: Math.round(avgHumidity),
            };
        })
        .sort((a, b) => a.time.localeCompare(b.time));
}
