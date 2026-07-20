import React, { useContext, useState } from "react";
import {
    Alert,
    FlatList,
    Pressable,
    Text,
    TextInput,
    View,
    StyleSheet,
    Platform,
} from "react-native";
import { SurveyContext } from "../../contexts/SurveyProvider";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const PRIORITY_COLOR = {
    High: '#FF4757',
    Medium: '#FFA502',
    Low: '#00D4AA',
    All: '#6C63FF',
};

const FILTERS = ['All', 'High', 'Medium', 'Low'];

const SurveyHistory = () => {
    const { surveyData, deleteSurvey } = useContext(SurveyContext);
    const [search, setSearch] = useState("");
    const [priority, setPriority] = useState("All");

    const filteredData = surveyData.filter((item) => {
        const matchSearch = (item.siteName || "").toLowerCase().includes(search.toLowerCase());
        const matchPriority = priority === "All" || item.priority === priority;
        return matchSearch && matchPriority;
    });

    const priorityWeight = { High: 3, Medium: 2, Low: 1 };
    const sortedData = [...filteredData].sort((a, b) => {
        const pA = priorityWeight[a.priority] || 0;
        const pB = priorityWeight[b.priority] || 0;
        if (pA !== pB) {
            return pB - pA;
        }
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
    });

    const removeSurvey = (id) => {
        if (Platform.OS === 'web') {
            const confirmed = window.confirm("Delete Survey\n\nThis action cannot be undone. Are you sure?");
            if (confirmed) {
                deleteSurvey(id);
            }
        } else {
            Alert.alert(
                "Delete Survey",
                "This action cannot be undone. Are you sure?",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Delete", style: "destructive", onPress: () => deleteSurvey(id) },
                ]
            );
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={[styles.cardAccent, { backgroundColor: PRIORITY_COLOR[item.priority] || '#6C63FF' }]} />
            <View style={styles.cardBody}>
                <View style={styles.cardTop}>
                    <View style={styles.cardTitleRow}>
                        <Text style={styles.cardTitle} numberOfLines={1}>{item.siteName}</Text>
                        <View style={[styles.chip, { backgroundColor: (PRIORITY_COLOR[item.priority] || '#6C63FF') + '22' }]}>
                            <Text style={[styles.chipText, { color: PRIORITY_COLOR[item.priority] || '#6C63FF' }]}>
                                {item.priority}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.cardSub}>
                        {item.clientName}
                        {item.date && ` • ${new Date(item.date).toLocaleDateString()}`}
                    </Text>
                </View>

                <View style={styles.cardActions}>
                    <Pressable
                        style={({ pressed }) => [styles.detailBtn, pressed && styles.btnPressed]}
                        onPress={() =>
                            Alert.alert(
                                item.siteName,
                                `👤 Client: ${item.clientName}\n📞 Contact: ${item.contact}\n📍 Location: ${item.location}\n📝 Notes: ${item.notes}`
                            )
                        }
                    >
                        <Ionicons name="eye-outline" size={14} color="#6C63FF" />
                        <Text style={styles.detailBtnText}>Details</Text>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [styles.deleteBtn, pressed && styles.btnPressed]}
                        onPress={() => removeSurvey(item.id)}
                    >
                        <Ionicons name="trash-outline" size={14} color="#FF4757" />
                        <Text style={styles.deleteBtnText}>Delete</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Survey History</Text>
                    <Text style={styles.headerCount}>{filteredData.length} result{filteredData.length !== 1 ? 's' : ''}</Text>
                </View>

                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <Ionicons name="search-outline" size={18} color="#A0A0C0" />
                    <TextInput
                        placeholder="Search by site name..."
                        placeholderTextColor="#4A4A6A"
                        style={styles.searchInput}
                        value={search}
                        onChangeText={setSearch}
                    />
                    {search.length > 0 && (
                        <Pressable onPress={() => setSearch('')}>
                            <Ionicons name="close-circle" size={18} color="#A0A0C0" />
                        </Pressable>
                    )}
                </View>

                {/* Filter Pills */}
                <View style={styles.filterRow}>
                    {FILTERS.map((f) => (
                        <Pressable
                            key={f}
                            style={[
                                styles.filterPill,
                                priority === f && { backgroundColor: PRIORITY_COLOR[f], borderColor: PRIORITY_COLOR[f] },
                            ]}
                            onPress={() => setPriority(f)}
                        >
                            <Text style={[styles.filterPillText, priority === f && styles.filterPillTextActive]}>
                                {f}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                {sortedData.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="search-outline" size={56} color="#2A2A4A" />
                        <Text style={styles.emptyTitle}>No Surveys Found</Text>
                        <Text style={styles.emptyText}>Try adjusting your search or filters.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={sortedData}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default SurveyHistory;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0F0F1A',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 16,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '800',
    },
    headerCount: {
        color: '#A0A0C0',
        fontSize: 14,
    },
    searchBar: {
        backgroundColor: '#1A1A2E',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#2A2A4A',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        marginBottom: 12,
        height: 48,
        gap: 10,
    },
    searchInput: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 15,
    },
    filterRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 16,
    },
    filterPill: {
        paddingHorizontal: 16,
        paddingVertical: 7,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#2A2A4A',
        backgroundColor: '#1A1A2E',
    },
    filterPillText: {
        color: '#A0A0C0',
        fontSize: 13,
        fontWeight: '600',
    },
    filterPillTextActive: {
        color: '#FFFFFF',
    },
    listContent: {
        paddingBottom: 30,
    },
    card: {
        backgroundColor: '#1A1A2E',
        borderRadius: 16,
        marginBottom: 12,
        flexDirection: 'row',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#2A2A4A',
    },
    cardAccent: {
        width: 4,
    },
    cardBody: {
        flex: 1,
        padding: 14,
    },
    cardTop: {
        marginBottom: 12,
    },
    cardTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    cardTitle: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
        flex: 1,
        marginRight: 8,
    },
    cardSub: {
        color: '#A0A0C0',
        fontSize: 13,
    },
    chip: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 20,
    },
    chipText: {
        fontSize: 11,
        fontWeight: '700',
    },
    cardActions: {
        flexDirection: 'row',
        gap: 10,
    },
    detailBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#6C63FF22',
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#6C63FF44',
    },
    detailBtnText: {
        color: '#6C63FF',
        fontSize: 13,
        fontWeight: '600',
    },
    deleteBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#FF475722',
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FF475744',
    },
    deleteBtnText: {
        color: '#FF4757',
        fontSize: 13,
        fontWeight: '600',
    },
    btnPressed: {
        opacity: 0.7,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    emptyTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
    },
    emptyText: {
        color: '#A0A0C0',
        fontSize: 14,
    },
});