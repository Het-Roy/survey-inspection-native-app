import React, { useContext, useState } from "react";
import {
    Alert,
    Button,
    FlatList,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import { SurveyContext } from "../context/SurveyContext";

const SurveyHistory = () => {
    const { surveyData, deleteSurvey } = useContext(SurveyContext);

    const [search, setSearch] = useState("");
    const [priority, setPriority] = useState("All");

    const filteredData = surveyData.filter((item) => {
        const matchSearch = item.siteName
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchPriority =
            priority === "All" || item.priority === priority;

        return matchSearch && matchPriority;
    });

    const removeSurvey = (id) => {
        Alert.alert(
            "Delete Survey",
            "Are you sure?",
            [
                {
                    text: "Cancel",
                },
                {
                    text: "Delete",
                    onPress: () => deleteSurvey(id),
                },
            ]
        );
    };

    return (
        <View>

            <TextInput
                placeholder="Search Survey"
                value={search}
                onChangeText={setSearch}
            />

            <Button
                title="All"
                onPress={() => setPriority("All")}
            />

            <Button
                title="High"
                onPress={() => setPriority("High")}
            />

            <Button
                title="Medium"
                onPress={() => setPriority("Medium")}
            />

            <Button
                title="Low"
                onPress={() => setPriority("Low")}
            />

            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>

                        <Text>{item.siteName}</Text>

                        <Text>{item.priority}</Text>

                        <Pressable
                            onPress={() =>
                                Alert.alert(
                                    "Survey Details",
                                    `Client : ${item.clientName}

                                    Contact : ${item.contact}

                                    Location : ${item.location}

                                    Notes : ${item.notes}`
                                )
                            }
                        >
                            <Text>View Details</Text>
                        </Pressable>

                        <Pressable
                            onPress={() => removeSurvey(item.id)}
                        >
                            <Text>Delete Survey</Text>
                        </Pressable>

                    </View>
                )}
            />

        </View>
    );
};

export default SurveyHistory;