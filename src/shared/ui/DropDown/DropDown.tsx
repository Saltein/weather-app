import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { styles } from "../../styles/styles";
import { DefaultText } from "../DefaultText/DefaultText";
import { useCallback, useEffect, useMemo, useState } from "react";
import { City, russianCities } from "../../consts/russianCities";
import { DefaultTextInput } from "../DefaultTextInput/DefaultTextInput";

export const DropDown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCity, setSelectedCity] = useState<City | null>(null);

    const handleCitySelect = (city: City) => {
        setSelectedCity(city);
        setSearchQuery("");
    };

    const filteredCities = useMemo(() => {
        const filtered = russianCities.filter((city: City) =>
            city.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        return filtered;
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

    useEffect(() => {
        if (selectedCity) {
            setIsOpen(false);
        } else if (searchQuery) {
            setIsOpen(true);
        }
    }, [selectedCity]);

    return (
        <View style={s.wrapper}>
            <View style={s.openButton}>
                <DefaultTextInput
                    placeholder="Город"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {searchQuery && (
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
                                item.name + item.subject + item.population
                            }
                            style={s.list}
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
        borderRadius: styles.radius.xl,
        borderWidth: 1,
        borderColor: "#444",
        margin: 4,
    },
    openButton: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
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
        borderRadius: styles.radius.xl,
        borderWidth: 1,
        borderColor: "#444",
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
        paddingHorizontal: 16,
        fontSize: 16,
    },
});
