import { StatusBar } from "expo-status-bar";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Header, Weather } from "../widgets";
import { styles } from "../shared";
import { Provider } from "react-redux";
import { store } from "./store";
import { DailyWeatherList } from "../widgets/DailyWeatherList/DailyWeatherList";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
    const { height } = useWindowDimensions();

    return (
        <Provider store={store}>
            <SafeAreaView style={s.container}>
                <View style={[s.container, { height: height }]}>
                    <Header />
                    <View style={s.pageSpace}>
                        <Weather />
                        <DailyWeatherList />
                    </View>
                    <StatusBar style="auto" />
                </View>
            </SafeAreaView>
        </Provider>
    );
}

const s = StyleSheet.create({
    container: {
        backgroundColor: styles.colors.backgroundMain,
        color: styles.colors.textMain,
    },
    pageSpace: {
        flex: 1,
        marginTop: styles.spacing.xxs,
        marginHorizontal: styles.spacing.md,
    },
});
