import { StyleSheet, View } from "react-native";
import { DefaultText } from "../../shared";

export const Header = () => {
    return (
        <View style={s.header}>
            <DefaultText>Погода</DefaultText>
        </View>
    );
};

const s = StyleSheet.create({
    header: {
        height: 48,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
    },
});
