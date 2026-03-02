export function formatDateTime(isoString: string): string[] {
    const date = new Date(isoString);
    const now = new Date();

    // Обнуляем время для корректного сравнения дат
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
    );
    const target = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
    );

    const timeFormatter = new Intl.DateTimeFormat("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const time = timeFormatter.format(date);

    if (target.getTime() === today.getTime()) {
        return ["Сегодня", time];
    }

    if (target.getTime() === tomorrow.getTime()) {
        return ["Завтра", time];
    }

    const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
    });

    return [dateFormatter.format(date), time];
}
