import { StyleSheet } from "react-native";
import { styles } from "../../../../shared";

export const s = StyleSheet.create({
    container: {
        backgroundColor: styles.colors.backgroundSurface,
        paddingVertical: styles.spacing.xxs,
        paddingHorizontal: styles.spacing.md,
        borderRadius: styles.radius.md,
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
    },
    time: {
        width: "23%",
    },
    weatherCode: {
        width: "16%",
    },
    tempMin: {
        width: "15%",
    },
    tempMax: {
        width: "17%",
    },
    wind: {
        width: "19%",
    },
    humidity: {
        width: "10%",
    },

    dark: {
        color: styles.colors.textMuted,
    }
});
