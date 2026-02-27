import { StyleSheet, View } from "react-native";
import { DefaultText, DropDown } from "../../shared";

export const Header = () => {
    return (
        <View style={s.header}>
            <DropDown />
        </View>
    );
};

const s = StyleSheet.create({
    header: {
        height: 48,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
});
