import React, { useState } from "react";
import {StyleSheet, Text, View, FlatList, Pressable, Alert, TextInput, RefreshControl} from "react-native";
import * as Contacts from "expo-contacts";
import * as Clipboard from "expo-clipboard";

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission Denied", "Contacts permission is required.");
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });

    setContacts(data);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getContacts();
    setRefreshing(false);
  };

  const copyNumber = async (number) => {
    if (number === "No Number") {
      Alert.alert("No Number", "This contact has no phone number.");
      return;
    }

    await Clipboard.setStringAsync(number);
    Alert.alert("Success", "Phone number copied.");
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  if (contacts.length === 0) {
    return (
      <View style={styles.container}>
        <Pressable onPress={getContacts}>
          <Text>Load Contacts</Text>
        </Pressable>

        <Text>No Contacts Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Contact"
        value={search}
        onChangeText={setSearch}
      />

      <Text>Total Contacts: {filteredContacts.length}</Text>

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        renderItem={({ item }) => {
          const phone =
            item.phoneNumbers && item.phoneNumbers.length > 0
              ? item.phoneNumbers[0].number
              : "No Number";

          return (
            <View style={styles.contactCard}>
              <Text>{item.name.charAt(0).toUpperCase()}</Text>

              <Text>{item.name}</Text>

              <Text>{phone}</Text>

              <Pressable onPress={() => copyNumber(phone)}>
                <Text>Copy Number</Text>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  contactCard: {
    marginVertical: 10,
  },
});