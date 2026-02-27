import { StyleSheet, Text, TextProps } from "react-native";
import { styles } from "../..";

export const DefaultText = (props: TextProps) => {
    return (
        <Text {...props} style={s.text}>
            {props.children}
        </Text>
    );
};

const s = StyleSheet.create({
    text: {
        color: styles.colors.textMain,
    },
});
