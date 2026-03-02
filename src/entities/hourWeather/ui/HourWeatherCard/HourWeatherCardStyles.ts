import { StyleSheet } from "react-native";
import { styles } from "../../../../shared";

export const s = StyleSheet.create({
    container: {
        backgroundColor: styles.colors.backgroundSurface,
        marginVertical: styles.spacing.sm,
        padding: styles.spacing.xxs,
        borderRadius: styles.radius.md,
        aspectRatio: 1 / 1,
        justifyContent: "space-between",
        alignItems: "center",
    },

    mainInfo: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        gap: styles.spacing.xxs,
    },

    temp: {
        fontSize: 22,
    },

    windHumidity: {
        fontSize: 12,
    },

    dateTimeContainer: {
        alignItems: "center",
        paddingHorizontal: styles.spacing.xxs,
        paddingBottom: styles.spacing.xxs,
        gap: 0,
    },

    date: {
        fontSize: 12,
        lineHeight: 12,
        color: styles.colors.textMuted,
    },

    time: {
        fontSize: 18,
        lineHeight: 14,
    },
});
