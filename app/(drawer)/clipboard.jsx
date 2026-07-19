import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as Clipboard from "expo-clipboard";

const ClipboardScreen = () => {
  const surveyId = "SURVEY-101";
  const contactNumber = "9876543210";
  const currentLocation = "23.0225, 72.5714";

  const [notes, setNotes] = useState("");

  const copyText = async (text, message) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Success", message);
  };

  const pasteNotes = async () => {
    const text = await Clipboard.getStringAsync();
    setNotes(text);
  };

  const clearClipboard = async () => {
    await Clipboard.setStringAsync("");
    setNotes("");
    Alert.alert("Success", "Clipboard cleared.");
  };

  return (
    <View style={styles.container}>
      <Text>Clipboard Module</Text>

      <Pressable
        onPress={() => copyText(surveyId, "Survey ID copied")}
      >
        <Text>Copy Survey ID</Text>
      </Pressable>

      <Pressable
        onPress={() => copyText(contactNumber, "Contact Number copied")}
      >
        <Text>Copy Contact Number</Text>
      </Pressable>

      <Pressable
        onPress={() => copyText(currentLocation, "Location copied")}
      >
        <Text>Copy Current Location</Text>
      </Pressable>

      <Pressable onPress={pasteNotes}>
        <Text>Paste Notes</Text>
      </Pressable>

      <TextInput
        placeholder="Pasted text will appear here"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <Pressable onPress={clearClipboard}>
        <Text>Clear Clipboard</Text>
      </Pressable>
    </View>
  );
};

export default ClipboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});