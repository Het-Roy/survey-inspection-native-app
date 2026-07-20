import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Pressable, Alert, TextInput, RefreshControl } from "react-native";
import * as Contacts from "expo-contacts";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const AVATAR_COLORS = ['#6C63FF', '#00D4AA', '#FF4757', '#FFA502', '#FF6B9D', '#4FC3F7'];

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Contacts permission is required to continue.");
      return;
    }
    const { data } = await Contacts.getContactsAsync({ fields: [Contacts.Fields.PhoneNumbers] });
    setContacts(data);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getContacts();
    setRefreshing(false);
  };

  const copyNumber = async (number) => {
    if (number === "No Number") {
      Alert.alert("No Number", "This contact doesn't have a phone number.");
      return;
    }
    await Clipboard.setStringAsync(number);
    Alert.alert("Copied!", "Phone number copied to clipboard.");
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  const getAvatarColor = (name) => {
    const index = name.charCodeAt(0) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
  };

  if (contacts.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyScreen}>
          <View style={styles.emptyIconWrap}>
            <Ionicons name="people-outline" size={56} color="#6C63FF" />
          </View>
          <Text style={styles.emptyTitle}>No Contacts Loaded</Text>
          <Text style={styles.emptySub}>Tap below to load your contacts and get started.</Text>
          <Pressable
            style={({ pressed }) => [styles.loadBtn, pressed && styles.btnPressed]}
            onPress={getContacts}
          >
            <Ionicons name="sync-outline" size={18} color="#FFFFFF" />
            <Text style={styles.loadBtnText}>Load Contacts</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const renderItem = ({ item }) => {
    const phone = item.phoneNumbers?.length > 0 ? item.phoneNumbers[0].number : "No Number";
    const avatarColor = getAvatarColor(item.name);
    const initials = item.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

    return (
      <View style={styles.contactCard}>
        <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.contactName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.contactPhone}>{phone}</Text>
        </View>
        <Pressable
          style={({ pressed }) => [styles.copyBtn, pressed && styles.btnPressed]}
          onPress={() => copyNumber(phone)}
        >
          <Ionicons name="copy-outline" size={16} color="#6C63FF" />
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Contacts</Text>
          <Text style={styles.headerCount}>{filteredContacts.length} contacts</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#A0A0C0" />
          <TextInput
            placeholder="Search contacts..."
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

        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6C63FF" />
          }
          ListEmptyComponent={
            <View style={styles.noResults}>
              <Ionicons name="search-outline" size={40} color="#2A2A4A" />
              <Text style={styles.noResultsText}>No contacts matching &quot;{search}&quot;</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F0F1A',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  // Empty / Permission Screen
  emptyScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    gap: 14,
  },
  emptyIconWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6C63FF22',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  emptySub: {
    color: '#A0A0C0',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },
  loadBtn: {
    backgroundColor: '#6C63FF',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  loadBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  // Header
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
  // Search
  searchBar: {
    backgroundColor: '#1A1A2E',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2A2A4A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 14,
    height: 48,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  // List
  listContent: {
    paddingBottom: 30,
  },
  contactCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 3,
  },
  contactPhone: {
    color: '#A0A0C0',
    fontSize: 13,
  },
  copyBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#6C63FF22',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6C63FF44',
  },
  btnPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  noResults: {
    alignItems: 'center',
    paddingTop: 40,
    gap: 12,
  },
  noResultsText: {
    color: '#A0A0C0',
    fontSize: 14,
  },
});