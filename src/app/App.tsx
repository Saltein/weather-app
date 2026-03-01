import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Header, Weather } from "../widgets";
import { styles } from "../shared";
import { Provider } from "react-redux";
import { store } from "./store";

export default function App() {
    return (
        <Provider store={store}>
            <View style={s.container}>
                <Header />
                <View style={s.pageSpace}>
                    <Weather />
                </View>
                <StatusBar style="auto" />
            </View>
        </Provider>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styles.colors.backgroundMain,
        color: styles.colors.textMain,
    },
    pageSpace: {
        flex: 1,
        marginTop: styles.spacing.xxs,
        marginHorizontal: styles.spacing.md,
    },
});
