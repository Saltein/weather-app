import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { styles } from "../../styles/styles";
import { DefaultText } from "../DefaultText/DefaultText";
import { useCallback, useEffect, useMemo, useState } from "react";
import { City, russianCities } from "../../consts/russianCities";
import { DefaultTextInput } from "../DefaultTextInput/DefaultTextInput";
import { useDispatch } from "react-redux";
import {
    selectSelectedCity,
    setCity,
} from "../../../entities/city/model/slice";
import { useSelector } from "react-redux";

export const DropDown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const selectedCity = useSelector(selectSelectedCity);

    const dispatch = useDispatch();

    const handleCitySelect = (city: City) => {
        dispatch(setCity(city));
        setSearchQuery(city.name);
        setIsOpen(false);
    };

    const handleInputChange = (text: string) => {
        setSearchQuery(text);
        dispatch(setCity(null));
        setIsOpen(text.length > 0);
    };

    const filteredCities = useMemo(() => {
        if (!searchQuery) return [];

        return russianCities.filter((city: City) =>
            city.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }, [searchQuery]);

    const RenderItem = useCallback(
        ({ item }: { item: City }) => (
            <CityItem
                name={item.name}
                subject={item.subject}
                onPress={() => handleCitySelect(item)}
            />
        ),
        [],
    );

    const displayValue = selectedCity ? selectedCity.name : searchQuery;

    return (
        <View style={s.wrapper}>
            <View style={s.openButton}>
                <DefaultTextInput
                    placeholder="Город"
                    value={displayValue}
                    onChangeText={handleInputChange}
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => setIsOpen(false)}
                />
            </View>

            {isOpen && (
                <View style={s.listContainer}>
                    {filteredCities.length === 0 ? (
                        <DefaultText style={s.cityItem}>
                            Город не найден
                        </DefaultText>
                    ) : (
                        <FlatList
                            data={filteredCities}
                            renderItem={RenderItem}
                            keyExtractor={(item) =>
                                item.name +
                                item.subject +
                                (item.population ?? "")
                            }
                            style={s.list}
                            keyboardShouldPersistTaps="handled"
                        />
                    )}
                </View>
            )}
        </View>
    );
};

const CityItem = ({
    name,
    subject,
    onPress,
}: {
    name: string;
    subject: string;
    onPress: () => void;
}) => {
    return (
        <Pressable onPress={onPress}>
            <DefaultText style={s.cityItem}>
                {`${name}${subject ? "," : ""} ${subject}`}
            </DefaultText>
        </Pressable>
    );
};

const s = StyleSheet.create({
    wrapper: {
        position: "relative",
        height: 40,
        flex: 1,
        backgroundColor: styles.colors.backgroundSurface,
        borderRadius: styles.radius.md,
        borderWidth: 1,
        borderColor: styles.colors.border,
        margin: styles.spacing.sm,
    },
    openButton: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: styles.spacing.md,
    },
    title: {
        fontSize: 18,
    },
    listContainer: {
        position: "absolute",
        top: 44,
        left: 0,
        right: 0,
        backgroundColor: styles.colors.backgroundSurface,
        borderRadius: styles.radius.md,
        borderWidth: 1,
        borderColor: styles.colors.border,
        zIndex: 10,
        overflow: "hidden",
        maxHeight: 320,
        // iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        // Android
        elevation: 6,
    },
    list: {
        width: "100%",
        flex: 1,
    },
    cityItem: {
        height: 40,
        textAlignVertical: "center",
        paddingHorizontal: styles.spacing.md,
        fontSize: 16,
    },
});
