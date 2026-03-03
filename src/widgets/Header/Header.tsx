import { StyleSheet, View } from "react-native";
import { DropDown } from "../../shared";

export const Header = () => {
    return (
        <View style={s.header}>
            <DropDown />
        </View>
    );
};

const s = StyleSheet.create({
    header: {
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
});
