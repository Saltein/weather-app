import { StyleSheet } from "react-native";
import { styles } from "../../shared";

export const s = StyleSheet.create({
    container: {
        marginVertical: styles.spacing.sm,
        flex: 1,
    },
    dailyWeatherListContent: {
        gap: styles.spacing.xs,
    },
});
