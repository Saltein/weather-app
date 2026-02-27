import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Header } from "../widgets";
import { DefaultText, styles } from "../shared";

export default function App() {
    return (
        <View style={s.container}>
            <Header />
            <View style={s.page}>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styles.colors.backgroundMain,
        color: styles.colors.textMain,
    },
    page: {
        flex: 1,
    },
});
