import { StyleSheet } from "react-native";
import { styles } from "../../shared";

export const s = StyleSheet.create({
    container: {
        alignItems: "center",
        width: "100%",
        height: 280,
        borderBottomWidth: 1,
        borderRadius: styles.radius.sm,
        borderColor: styles.colors.border,
    },

    mainInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",

        backgroundColor: styles.colors.backgroundSurface,
        paddingHorizontal: styles.spacing.md,

        borderRadius: styles.radius.lg,
    },

    temperature: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: styles.spacing.xs,
    },

    minMaxTemp: {
        fontSize: 18,
    },

    currentTemp: {
        fontSize: 56,
        fontWeight: "bold",
        includeFontPadding: false,
    },

    weatherCode: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: styles.spacing.md,
        borderLeftWidth: 1,
        borderColor: styles.colors.border,
        paddingLeft: styles.spacing.md,
        paddingBottom: styles.spacing.xs,
        maxWidth: "50%",
    },

    weatherDescription: {
        fontSize: 14,
    },

    windAndHumidity: {
        flexDirection: "row",
        justifyContent: "center",
        fontSize: 16,
        marginTop: styles.spacing.sm,
        gap: styles.spacing.md,

        backgroundColor: styles.colors.backgroundSurface,
        paddingHorizontal: styles.spacing.md,
        paddingVertical: styles.spacing.xs,

        borderRadius: styles.radius.lg,
    },

    hourlyWeatherListContent: {
        gap: styles.spacing.xs,
    },
});
