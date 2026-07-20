import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const COPY_ITEMS = [
  { icon: 'qr-code-outline', label: 'Survey ID', color: '#6C63FF' },
  { icon: 'call-outline', label: 'Contact Number', color: '#00D4AA' },
  { icon: 'location-outline', label: 'Current Location', color: '#FFA502' },
];

const ClipboardScreen = () => {
  const surveyId = "SURVEY-101";
  const contactNumber = "9876543210";
  const currentLocation = "23.0225, 72.5714";
  const values = [surveyId, contactNumber, currentLocation];
  const messages = ["Survey ID copied!", "Contact Number copied!", "Location copied!"];

  const [notes, setNotes] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyText = async (text, message, index) => {
    await Clipboard.setStringAsync(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1800);
    Alert.alert("Copied!", message);
  };

  const pasteNotes = async () => {
    const text = await Clipboard.getStringAsync();
    setNotes(text);
  };

  const clearClipboard = async () => {
    await Clipboard.setStringAsync("");
    setNotes("");
    Alert.alert("Cleared", "Clipboard has been cleared.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIconWrap}>
            <Ionicons name="clipboard-outline" size={26} color="#6C63FF" />
          </View>
          <View>
            <Text style={styles.headerTitle}>Clipboard</Text>
            <Text style={styles.headerSub}>Copy survey data instantly</Text>
          </View>
        </View>

        {/* Copy Cards */}
        <Text style={styles.sectionLabel}>QUICK COPY</Text>
        <View style={styles.copyGrid}>
          {COPY_ITEMS.map((item, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.copyCard,
                copiedIndex === index && { borderColor: item.color },
                pressed && styles.cardPressed,
              ]}
              onPress={() => copyText(values[index], messages[index], index)}
            >
              <View style={[styles.copyIconWrap, { backgroundColor: item.color + '22' }]}>
                <Ionicons name={copiedIndex === index ? 'checkmark-circle' : item.icon} size={22} color={item.color} />
              </View>
              <Text style={styles.copyLabel}>{item.label}</Text>
              <Text style={[styles.copyValue, { color: item.color }]}>{values[index]}</Text>
              <View style={[styles.copyChip, { backgroundColor: item.color }]}>
                <Text style={styles.copyChipText}>{copiedIndex === index ? 'Copied!' : 'Tap to Copy'}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Notes Section */}
        <Text style={styles.sectionLabel}>CLIPBOARD NOTES</Text>
        <View style={styles.notesCard}>
          <TextInput
            placeholder="Paste text will appear here..."
            placeholderTextColor="#4A4A6A"
            style={styles.notesInput}
            value={notes}
            onChangeText={setNotes}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.notesBtnRow}>
          <Pressable
            style={({ pressed }) => [styles.noteBtn, styles.pasteBtn, pressed && styles.btnPressed]}
            onPress={pasteNotes}
          >
            <Ionicons name="clipboard-outline" size={16} color="#6C63FF" />
            <Text style={styles.pasteBtnText}>Paste Notes</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.noteBtn, styles.clearBtn, pressed && styles.btnPressed]}
            onPress={clearClipboard}
          >
            <Ionicons name="trash-outline" size={16} color="#FF4757" />
            <Text style={styles.clearBtnText}>Clear</Text>
          </Pressable>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClipboardScreen;

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
    alignItems: 'center',
    gap: 14,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#6C63FF22',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  headerSub: {
    color: '#A0A0C0',
    fontSize: 13,
    marginTop: 2,
  },
  sectionLabel: {
    color: '#A0A0C0',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  copyGrid: {
    gap: 12,
    marginBottom: 28,
  },
  copyCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A4A',
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  copyIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  copyLabel: {
    color: '#A0A0C0',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  copyValue: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  copyChip: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  copyChipText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  notesCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A4A',
    padding: 16,
    marginBottom: 12,
  },
  notesInput: {
    color: '#FFFFFF',
    fontSize: 15,
    minHeight: 120,
    lineHeight: 22,
  },
  notesBtnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  noteBtn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
  },
  pasteBtn: {
    backgroundColor: '#6C63FF22',
    borderColor: '#6C63FF44',
  },
  pasteBtnText: {
    color: '#6C63FF',
    fontWeight: '700',
    fontSize: 14,
  },
  clearBtn: {
    backgroundColor: '#FF475722',
    borderColor: '#FF475744',
  },
  clearBtnText: {
    color: '#FF4757',
    fontWeight: '700',
    fontSize: 14,
  },
  btnPressed: {
    opacity: 0.7,
  },
});